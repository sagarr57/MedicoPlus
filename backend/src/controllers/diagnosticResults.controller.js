const Patient = require('../models/patient.model');
const LabRegistration = require('../models/labRegistration.model'); // Import LabRegistration model
const DiagnosticResult = require('../models/diagnosticResults.model');

// Controller to add a diagnostic result
const addDiagnosticResult = async (req, res) => {
  try {
    const { patientID, testName, result, status } = req.body;

    // Check if the patient exists before adding diagnostic result
    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if the lab test is registered for this patient
    const labTest = await LabRegistration.findOne({ patientID, testType: testName });
    if (!labTest) {
      return res.status(400).json({ message: 'Lab test not registered for this patient' });
    }

    // Proceed to create the diagnostic result if the patient exists and lab test is registered
    const diagnosticResult = new DiagnosticResult({
      patientID,
      testName,
      result,
      status: status || 'Pending',  // Default status is 'Pending' if not provided
    });

    await diagnosticResult.save();
    res.status(201).json({ message: 'Diagnostic result added successfully', diagnosticResult });
  } catch (error) {
    res.status(500).json({ message: 'Error adding diagnostic result', error: error.message });
  }
};

// Controller to get all diagnostic results for a patient
const getDiagnosticResults = async (req, res) => {
  try {
    const results = await DiagnosticResult.find({ patientID: req.params.patientID });
    if (!results.length) {
      return res.status(404).json({ message: 'No diagnostic results found for this patient' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching diagnostic results', error: error.message });
  }
};

module.exports = { addDiagnosticResult, getDiagnosticResults };
