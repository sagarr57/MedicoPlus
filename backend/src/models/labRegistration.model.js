const mongoose = require('mongoose');
const Patient = require('./patient.model');

const labRegistrationSchema = new mongoose.Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Linking to the Patient model
    required: true,
  },
  testType: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('LabRegistration', labRegistrationSchema);
