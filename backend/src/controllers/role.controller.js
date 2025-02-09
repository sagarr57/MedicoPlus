const User = require("../models/user.model");
const asyncHandler = require("../middleware/asyncHandler");

// Define all valid roles
const validRoles = ["Admin", "Doctor", "Nurse", "Clerk", "User"];

// Assign a role to a user
const assignRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;

  console.log("Received role:", role); // Debugging: log received role

  // Check if the received role is valid
  if (!validRoles.includes(role.trim())) {
    console.log("Invalid role:", role); // Log invalid role for debugging
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Assign the role to the user
  user.role = role;
  await user.save();

  res.json({ message: `Role '${role}' assigned to user`, user });
});

// Remove a role from a user (reset to 'User' by default)
const removeRole = asyncHandler(async (req, res) => {
    const { userId } = req.body;
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // Ensure 'User' role is a valid role (check if it's part of the enum)
    if (!['Admin', 'Doctor', 'Nurse', 'Clerk', 'User'].includes('User')) {
      return res.status(400).json({ message: "'User' is not a valid role" });
    }
  
    user.role = 'User'; // Default role
    await user.save();
  
    res.json({ message: "Role removed, reset to 'User'", user });
  });

// Get all users and their roles
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password"); // Exclude password field for security
  res.json(users);
});

// Get all available roles
const getAllRoles = asyncHandler(async (req, res) => {
  // Instead of fetching from Role collection, return the predefined validRoles array
  const roles = validRoles;
  res.json(roles);
});

module.exports = { assignRole, removeRole, getAllUsers, getAllRoles };
