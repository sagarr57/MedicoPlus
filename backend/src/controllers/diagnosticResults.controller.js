const DiagnosticResult = require('../models/diagnosticResults.model');
const { authenticateUser, authorizeRole } = require('../middleware/auth');

// Controller to add a diagnostic result
const addDiagnosticResult = async (req, res) => {
  try {
    const { patientID, testName, result, status } = req.body;

    const diagnosticResult = new DiagnosticResult({
      patientID,
      testName,
      result,
      status,
    });

    await diagnosticResult.save();
    res.status(201).json(diagnosticResult);
  } catch (error) {
    res.status(400).json({ message: 'Error adding diagnostic result', error });
  }
};

// Controller to get all diagnostic results for a patient
const getDiagnosticResults = async (req, res) => {
  try {
    const results = await DiagnosticResult.find({ patientID: req.params.patientID });
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching diagnostic results', error });
  }
};

module.exports = { addDiagnosticResult, getDiagnosticResults };
