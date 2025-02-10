const express = require('express');
const { generateDischargeSummary } = require('../controllers/dischargeSummary.controller');
const { authenticateUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.post('/discharge-summary',authenticateUser,authorizeRole("Doctor"), generateDischargeSummary);

module.exports = router;
