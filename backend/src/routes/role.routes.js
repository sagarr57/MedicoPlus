const express = require("express");
const router = express.Router();
const { assignRole, removeRole, getAllUsers, getAllRoles } = require("../controllers/role.controller");
const { authenticateUser, authorizeRole } = require("../middleware/auth");

// Assign role to user (Only Admin)
router.put("/assign-role", authenticateUser, authorizeRole("Admin"), assignRole);

// Remove role from user (Only Admin)
router.put("/remove-role", authenticateUser, authorizeRole("Admin"), removeRole);

// Get all users and their roles (Only Admin)
router.get("/users", authenticateUser, authorizeRole("Admin"), getAllUsers);

// Get all available roles (Only Admin)
router.get("/roles", authenticateUser, authorizeRole("Admin"), getAllRoles);

module.exports = router;
