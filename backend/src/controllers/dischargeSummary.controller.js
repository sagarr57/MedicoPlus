const DischargeSummary = require("../models/dischargeSummary.model");
const Patient = require("../models/patient.model");
const User = require("../models/user.model");

const generateDischargeSummary = async (req, res) => {
  try {
    const {
      patientID,
      doctorID,
      diagnosis,
      treatmentGiven,
      followUpInstructions,
    } = req.body;

    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    // Ensure the doctor exists and has the 'Doctor' role
    const doctor = await User.findById(doctorID);
    if (!doctor || doctor.role !== "Doctor") {
      return res
        .status(404)
        .json({ message: "Doctor not found or not authorized" });
    }

    const dischargeSummary = new DischargeSummary({
      patientID,
      doctorID,
      diagnosis,
      treatmentGiven,
      followUpInstructions,
    });

    await dischargeSummary.save();
    res
      .status(201)
      .json({
        message: "Discharge summary generated successfully",
        dischargeSummary,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error generating discharge summary",
        error: error.message,
      });
  }
};

module.exports = { generateDischargeSummary };
