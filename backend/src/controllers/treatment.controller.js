const Treatment = require('../models/treatment.model');
const Patient = require('../models/patient.model');
const User = require('../models/user.model');

const recordTreatment = async (req, res) => {
  try {
    const { patientID, doctorID, diagnosis, treatmentPlan, progressNotes } = req.body;

    // Ensure doctorID is a valid doctor (optional check)
    const doctor = await User.findById(doctorID);
    if (!doctor || doctor.role !== 'Doctor') {
      return res.status(404).json({ message: 'Doctor not found or not authorized' });
    }

    // Ensure the patient exists
    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Record the treatment
    const treatment = new Treatment({
      patientID,
      doctorID,
      diagnosis,
      treatmentPlan,
      progressNotes,
    });

    await treatment.save();
    res.status(201).json({ message: 'Treatment recorded successfully', treatment });
  } catch (error) {
    res.status(500).json({ message: 'Error recording treatment', error: error.message });
  }
};

const getTreatmentHistory = async (req, res) => {
  try {
    const { patient_id } = req.params;

    // Ensure the patient exists before querying treatment history
    const patient = await Patient.findById(patient_id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const treatments = await Treatment.find({ patientID: patient_id }).populate('doctorID', 'name');

    if (treatments.length === 0) {
      return res.status(404).json({ message: 'No treatment history found for this patient' });
    }

    res.status(200).json({ message: 'Treatment history retrieved successfully', treatments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching treatment history', error: error.message });
  }
};

module.exports = { recordTreatment, getTreatmentHistory };
