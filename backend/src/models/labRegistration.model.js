const mongoose = require('mongoose');
const Patient = require('./patient.model');
const Referral = require('./referral.model');  // Reference to Referral model

const labRegistrationSchema = new mongoose.Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  referralID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Referral',  // Linking to the referral
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
