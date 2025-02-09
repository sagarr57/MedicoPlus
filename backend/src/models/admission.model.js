const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId,  // Using ObjectId for referencing Patient
    ref: 'Patient',  // Reference to the Patient model
    required: true,
    index: true,     // Index for better lookup performance
  },
  ward: {
    type: String,
    required: true,
  },
  admissionDate: {
    type: Date,
    default: Date.now,  // Automatically sets the admission date to the current time
  },
  status: {
    type: String,
    enum: ['Admitted', 'Discharged', 'Pending'],  // Status options for patient admission
    default: 'Admitted',
  },
});

module.exports = mongoose.model('Admission', admissionSchema);
