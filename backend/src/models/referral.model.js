const mongoose = require('mongoose');
const Patient = require('./patient.model'); // Reference to the Patient model

const referralSchema = new mongoose.Schema(
  {
    patientID: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Patient model
      ref: 'Patient',
      required: true,
      validate: {
        validator: async (value) => {
          // Check if the patient exists in the database
          const patientExists = await Patient.exists({ _id: value });
          return patientExists;
        },
        message: 'Patient not found',
      },
    },
    referralType: {
      type: String,
      enum: ['Radiology', 'Pathology', 'Other'],
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    referralDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'In Progress'],
      default: 'Pending',
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Index patientID for faster lookups
referralSchema.index({ patientID: 1 });

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
