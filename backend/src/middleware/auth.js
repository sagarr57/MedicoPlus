const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

// Middleware to verify JWT token and authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }
    return res
      .status(401)
      .json({ message: "Invalid token. Authentication failed." });
  }
};

// Middleware to restrict access based on roles
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ message: "Access Forbidden: No role assigned" });
    }

    // Ensure case-insensitive role checking
    if (
      !roles
        .map((role) => role.toLowerCase())
        .includes(req.user.role.toLowerCase())
    ) {
      return res
        .status(403)
        .json({ message: "Access Forbidden: Insufficient permissions" });
    }

    next();
  };
};

// Define specific roles for EPIC 2 (Register Patient, View Patient, List All Patients)

// 1. **Register New Patient**: Clerk and Admin should have access
const registerPatientPermissions = authorizeRole("Clerk", "Admin");

// 2. **View Patient Details**: Doctor, Clerk, and Admin should have access
const viewPatientDetailsPermissions = authorizeRole("Doctor", "Clerk", "Admin");

// 3. **List All Registered Patients**: Clerk and Admin should have access
const listAllPatientsPermissions = authorizeRole("Clerk", "Admin");

// Keep EPIC 1 permissions intact (Assumed existing permissions)
const doctorPermissions = authorizeRole("Doctor");
const nursePermissions = authorizeRole("Nurse");

module.exports = {
  authenticateUser,
  authorizeRole,
  registerPatientPermissions,
  viewPatientDetailsPermissions,
  listAllPatientsPermissions,
  doctorPermissions,
  nursePermissions,
};
