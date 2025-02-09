const mongoose = require('mongoose');
const Patient = require('./patient.model'); // Reference to the Patient model

const referralSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId, // Change to ObjectId
        ref: 'Patient',  // Reference to the Patient model
        required: true
    },
    referralType: {
        type: String,
        enum: ['Radiology', 'Pathology', 'Other'],
        required: true
    },
    service: {
        type: String,
        required: true
    },
    referralDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'In Progress'],
        default: 'Pending'
    }
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
