const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const { authenticateUser, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route: Example with role-based access
router.get('/profile', authenticateUser, (req, res) => {
  res.json({ message: 'User Profile Data', user: req.user });
});

// Protected route: Only accessible to 'admin' users
router.get('/admin', authenticateUser, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Admin Access Granted' });
});

module.exports = router;
