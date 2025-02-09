const mongoose = require('mongoose');
const Patient = require('./patient.model');

const diagnosticResultSchema = new mongoose.Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Linking to the Patient model
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  testDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
});

// Optional: Add a method to check if the diagnostic result exists for the patient and test
diagnosticResultSchema.statics.isTestRegisteredForPatient = async function(patientID, testName) {
  const labTest = await LabRegistration.findOne({ patientID, testType: testName });
  return labTest !== null;
};

module.exports = mongoose.model('DiagnosticResult', diagnosticResultSchema);
