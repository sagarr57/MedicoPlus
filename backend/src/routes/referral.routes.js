const express = require('express');
const router = express.Router();
const { createReferral, viewReferralDetails } = require('../controllers/referral.controller');

// Create a Referral
router.post('/', createReferral);

// View Referral Details
router.get('/:id', viewReferralDetails);

module.exports = router;
