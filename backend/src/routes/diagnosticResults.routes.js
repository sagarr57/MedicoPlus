const express = require('express');
const { authenticateUser, authorizeRole } = require('../middleware/auth');
const { addDiagnosticResult, getDiagnosticResults } = require('../controllers/diagnosticResults.controller');

const router = express.Router();

// Route to add diagnostic result (Accessible by Doctor and Admin)
router.post(
  '/add',
  authenticateUser,
  authorizeRole('Doctor', 'Admin'),
  addDiagnosticResult
);

// Route to get diagnostic results for a patient (Accessible by Doctor, Nurse, and Admin)
router.get(
  '/:patientID',
  authenticateUser,
  authorizeRole('Doctor', 'Nurse', 'Admin'),
  getDiagnosticResults
);

module.exports = router;
