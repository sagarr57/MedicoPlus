const express = require('express');
const { recordTreatment, getTreatmentHistory } = require('../controllers/treatment.controller');
const { authenticateUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.post('/treatment',authenticateUser,authorizeRole("Doctor"), recordTreatment);
router.get('/treatment/:patient_id', authenticateUser,authorizeRole("Nurse"), getTreatmentHistory);

module.exports = router;
