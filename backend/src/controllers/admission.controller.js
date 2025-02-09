const Admission = require('../models/admission.model');
const Patient = require('../models/patient.model');

// Admit a patient - Only accessible by clerk
const admitPatient = async (req, res) => {
  try {
    const { patientID, ward } = req.body;

    // Check if the patient exists in the database
    const patient = await Patient.findById(patientID);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found. Please register the patient first." });
    }

    // Create a new admission record
    const admission = new Admission({
      patientID,
      ward,
      status: "Admitted",
    });

    await admission.save();
    res.status(201).json({ message: "Patient admitted successfully", admission });
  } catch (error) {
    res.status(500).json({ message: "Error admitting patient", error: error.message });
  }
};

// View admission details - Accessible by nurse or admin
const getAdmissionDetails = async (req, res) => {
  try {
    const { id } = req.params; // Get admission ID from URL params

    // Fetch admission details and populate patient info
    const admission = await Admission.findById(id).populate('patientID', 'name age contact');

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json({ message: "Admission details fetched successfully", admission });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admission details", error: error.message });
  }
};

// List all admissions - Only accessible by admin
const listAllAdmissions = async (req, res) => {
  try {
    // Fetch all admissions and populate patient details
    const admissions = await Admission.find().populate('patientID', 'name age contact');

    res.json({ message: "List of all admissions", admissions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admissions", error: error.message });
  }
};

module.exports = { admitPatient, getAdmissionDetails, listAllAdmissions };
