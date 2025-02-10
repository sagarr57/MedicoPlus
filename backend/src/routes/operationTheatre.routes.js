const express = require('express');
const { registerSurgery } = require('../controllers/operationTheatre.controller');
const { authenticateUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();


router.post('/operation-theatre',authenticateUser,authorizeRole("Doctor"), registerSurgery);

module.exports = router;
