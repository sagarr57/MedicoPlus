const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema(
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
    treatmentPlan: {
      type: String,
      required: true,
    },
    progressNotes: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Treatment', treatmentSchema);
