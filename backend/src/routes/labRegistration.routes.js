const express = require('express');
const { authenticateUser, authorizeRole } = require('../middleware/auth');
const { addLabRegistration, getLabRegistrations } = require('../controllers/labRegistration.controller');

const router = express.Router();

// Route to add lab registration (Accessible by Doctor and Admin)
router.post(
  '/add',
  authenticateUser,
  authorizeRole('Doctor', 'Admin'), // Role-based authorization
  addLabRegistration
);

// Route to get lab registrations for a patient (Accessible by Doctor, Nurse, and Admin)
router.get(
  '/:patientID',
  authenticateUser,
  authorizeRole('Doctor', 'Nurse', 'Admin'), // Role-based authorization
  getLabRegistrations
);

module.exports = router;
