const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Clerk', 'Doctor', 'Nurse', 'Admin','User' ], // Allowed roles
      default: 'User', // Default role
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
