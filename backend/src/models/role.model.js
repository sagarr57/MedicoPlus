const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ["Admin", "Doctor", "Nurse", "Clerk"], // Allowed roles
    },
    permissions: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
