const Referral = require('../models/referral.model');
const Patient = require('../models/patient.model');  // Import Patient model

// Create a Referral (POST /api/referrals)
const createReferral = async (req, res) => {
    try {
        const { patientID, referralType, service } = req.body;
        
        // Check if the patientID exists in the Patient collection
        const patient = await Patient.findOne({ patientID });
        if (!patient) {
            return res.status(404).json({
                message: 'Patient not found'
            });
        }

        // Create a new referral with the patient's ObjectId
        const newReferral = new Referral({
            patientID: patient._id,  // Store the ObjectId, not the string patientID
            referralType,
            service
        });
        
        await newReferral.save();
        res.status(201).json({
            message: 'Referral created successfully',
            referral: newReferral
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating referral',
            error: error.message
        });
    }
};

// View Referral Details (GET /api/referrals/{id})
const viewReferralDetails = async (req, res) => {
    try {
        const referral = await Referral.findById(req.params.id).populate('patientID');
        
        if (!referral) {
            return res.status(404).json({
                message: 'Referral not found'
            });
        }
        
        res.status(200).json({
            referral
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error retrieving referral details',
            error: error.message
        });
    }
};

module.exports = { createReferral, viewReferralDetails };