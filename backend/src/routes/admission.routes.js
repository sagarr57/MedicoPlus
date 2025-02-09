const express = require('express');
const router = express.Router();
const { admitPatient, getAdmissionDetails, listAllAdmissions } = require('../controllers/admission.controller');
const { authenticateUser, authorizeRole } = require('../middleware/auth');

// Admit a patient (Only accessible by clerk)
router.post('/', authenticateUser, authorizeRole('Clerk'), admitPatient);

// View admission details by ID (Accessible by nurse or admin)
router.get('/:id', authenticateUser, authorizeRole('Nurse', 'Admin'), getAdmissionDetails);

// List all admissions (Only accessible by admin)
router.get('/', authenticateUser, authorizeRole('Admin'), listAllAdmissions);

module.exports = router;
