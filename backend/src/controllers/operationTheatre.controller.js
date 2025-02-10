const OperationTheatre = require('../models/operationTheatre.model');
const Patient = require('../models/patient.model');
const User = require('../models/user.model'); // User model for role check

const registerSurgery = async (req, res) => {
  try {
    const { patientID, doctorID, surgeryType, surgeryDate } = req.body;

    // Ensure the patient exists
    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Ensure the doctor exists and is of the 'Doctor' role
    const doctor = await User.findById(doctorID);
    if (!doctor || doctor.role !== 'Doctor') {
      return res.status(404).json({ message: 'Doctor not found or not authorized' });
    }

    // Create new surgery record
    const newSurgery = new OperationTheatre({
      patientID,
      doctorID,
      surgeryType,
      surgeryDate,
    });

    await newSurgery.save();
    res.status(201).json({ message: 'Surgery registered successfully', newSurgery });
  } catch (error) {
    res.status(500).json({ message: 'Error registering surgery', error: error.message });
  }
};

module.exports = { registerSurgery };
