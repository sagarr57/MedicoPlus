const express = require("express");
const router = express.Router();
const {
  createReferral,
  viewReferralDetails,
  updateReferralStatus,
  listPatientReferrals,
} = require("../controllers/referral.controller");
const { authenticateUser, authorizeRole } = require("../middleware/auth");

// Create a Referral (Doctors only)
router.post("/", authenticateUser, authorizeRole("Doctor"), createReferral);

// View Referral Details (Doctors & Nurses)
router.get("/:id", authenticateUser, authorizeRole("Nurse", "Doctor"), viewReferralDetails);

// Update Referral Status (Doctors & Nurses)
router.put("/:id/status", authenticateUser, authorizeRole("Nurse", "Doctor"), updateReferralStatus);

// List All Referrals for a Patient (Doctors & Nurses)
router.get("/patient/:patientID", authenticateUser, authorizeRole("Doctor", "Nurse"), listPatientReferrals);

module.exports = router;
