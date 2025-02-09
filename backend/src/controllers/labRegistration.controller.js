const LabRegistration = require("../models/labRegistration.model");
const Patient = require("../models/patient.model");
const Referral = require("../models/referral.model"); // Import Referral model

const addLabRegistration = async (req, res) => {
  try {
    const { patientID, referralID, testType, status } = req.body;

    // Check if the patient exists
    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if the referral exists and is valid
    const referral = await Referral.findById(referralID);
    if (!referral || referral.patientID.toString() !== patientID.toString()) {
      return res
        .status(404)
        .json({ message: "Invalid or non-existent referral" });
    }

    const labRegistration = new LabRegistration({
      patientID,
      referralID,
      testType,
      status,
    });

    await labRegistration.save();
    res.status(201).json(labRegistration);
  } catch (error) {
    res.status(400).json({ message: "Error registering lab test", error });
  }
};
const getLabRegistrations = async (req, res) => {
  try {
    const { patientID } = req.params;

    // Find all lab registrations for the patient
    const labRegistrations = await LabRegistration.find({ patientID });

    if (labRegistrations.length === 0) {
      return res
        .status(404)
        .json({ message: "No lab registrations found for this patient" });
    }

    res.status(200).json(labRegistrations);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching lab registrations", error });
  }
};

module.exports = { addLabRegistration, getLabRegistrations };
