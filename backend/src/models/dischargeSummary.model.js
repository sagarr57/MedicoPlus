const mongoose = require('mongoose');

const dischargeSummarySchema = new mongoose.Schema(
  {
    patientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    treatmentGiven: {
      type: String,
      required: true,
    },
    dischargeDate: {
      type: Date,
      default: Date.now,
    },
    followUpInstructions: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DischargeSummary', dischargeSummarySchema);
