const Referral = require("../models/referral.model");
const Patient = require("../models/patient.model"); // Assuming a Patient model exists

// 1️⃣ Create a Referral
const createReferral = async (req, res) => {
  try {
    const { patientID, referralType, service } = req.body;

    if (!patientID || !referralType || !service) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validTypes = ["Radiology", "Pathology", "Other"];
    if (!validTypes.includes(referralType)) {
      return res.status(400).json({ message: "Invalid referral type" });
    }

    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const newReferral = new Referral({ patientID, referralType, service });
    await newReferral.save();

    res.status(201).json({ message: "Referral created successfully", referral: newReferral });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// 2️⃣ View Referral Details
const viewReferralDetails = async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id).populate(
      "patientID",
      "fullName age gender contactInfo"
    );

    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    res.status(200).json({ referral });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// 3️⃣ Update Referral Status
const updateReferralStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "In Progress", "Completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const referral = await Referral.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    res.status(200).json({ message: "Referral status updated", referral });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// 4️⃣ List All Referrals for a Patient
const listPatientReferrals = async (req, res) => {
  try {
    const { patientID } = req.params;
    const referrals = await Referral.find({ patientID }).populate(
      "patientID",
      "fullName age gender contactInfo"
    );

    if (!referrals.length) {
      return res.status(404).json({ message: "No referrals found for this patient" });
    }

    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createReferral,
  viewReferralDetails,
  updateReferralStatus,
  listPatientReferrals,
};
