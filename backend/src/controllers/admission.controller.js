// controllers/admission.controller.js

// Admit a patient - Only accessible by clerk
const admitPatient = async (req, res) => {
  try {
    // You could create admission logic here, e.g., save patient data to DB
    const { patientId, ward, dateOfAdmission } = req.body;

    // Assuming you have a model to create an admission record
    const admission = new Admission({
      patientId,
      ward,
      dateOfAdmission,
      status: "Admitted",
    });

    await admission.save();
    res
      .status(201)
      .json({ message: "Patient admitted successfully", admission });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error admitting patient", error: error.message });
  }
};

// View admission details - Accessible by nurse or admin
const getAdmissionDetails = async (req, res) => {
  try {
    const { id } = req.params; // Get admission ID from URL params

    // Assuming you have a model for admissions to fetch by ID
    const admission = await Admission.findById(id);

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json({ message: "Admission details fetched successfully", admission });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching admission details",
        error: error.message,
      });
  }
};

// List all admissions - Only accessible by admin
const listAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find(); // Fetch all admissions

    res.json({ message: "List of all admissions", admissions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching admissions", error: error.message });
  }
};

module.exports = { admitPatient, getAdmissionDetails, listAllAdmissions };
