const LabRegistration = require('../models/labRegistration.model');

// Controller to add a lab registration
const addLabRegistration = async (req, res) => {
  try {
    const { patientID, testType, status } = req.body;

    const labRegistration = new LabRegistration({
      patientID,
      testType,
      status,
    });

    await labRegistration.save();
    res.status(201).json(labRegistration);
  } catch (error) {
    res.status(400).json({ message: 'Error registering lab test', error });
  }
};

// Controller to get lab registrations for a patient
const getLabRegistrations = async (req, res) => {
  try {
    const registrations = await LabRegistration.find({ patientID: req.params.patientID });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching lab registrations', error });
  }
};

module.exports = { addLabRegistration, getLabRegistrations };
