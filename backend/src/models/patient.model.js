const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientID: {
    type: String,
    required: true,
    unique: true,  // Ensures patientID is unique for each patient
    index: true,   // Adds an index for faster lookups (useful for large data)
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  healthComplaints: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,  // Automatically sets the registration date to the current time
  },
});

// Add a virtual field for admissions to easily fetch admission records linked to a patient
patientSchema.virtual('admissions', {
  ref: 'Admission',  // Reference to the Admission model
  localField: 'patientID',  // The field in the Patient model
  foreignField: 'patientID',  // The field in the Admission model that references the Patient model
});

// Add virtuals for diagnostic results and lab registrations
patientSchema.virtual('diagnosticResults', {
  ref: 'DiagnosticResult',  // Reference to the DiagnosticResult model
  localField: 'patientID',  // The field in the Patient model
  foreignField: 'patientID',  // The field in the DiagnosticResult model
});

patientSchema.virtual('labRegistrations', {
  ref: 'LabRegistration',  // Reference to the LabRegistration model
  localField: 'patientID',  // The field in the Patient model
  foreignField: 'patientID',  // The field in the LabRegistration model
});

module.exports = mongoose.model('Patient', patientSchema);
