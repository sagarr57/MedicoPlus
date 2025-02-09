const express = require("express");
const router = express.Router();
const {
  registerPatient,
  getPatientDetails,
  listAllPatients,
} = require("../controllers/patient.controller");
const { authenticateUser, authorizeRole } = require("../middleware/auth");

// Register a new patient (only for registration clerks)
router.post(
  "/",
  authenticateUser,
  authorizeRole("Clerk"), // Ensure only clerks can register patients
  registerPatient
);

// View patient details (only for doctors)
router.get(
  "/:id",
  authenticateUser,
  authorizeRole("Doctor"), // Only doctors can view patient details
  getPatientDetails
);

// List all patients (only for registration clerks or admins)
router.get(
  "/",
  authenticateUser,
  authorizeRole("Clerk", "Admin"), // Ensure only clerks or admins can list all patients
  listAllPatients
);

module.exports = router;
