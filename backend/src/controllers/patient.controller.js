const Patient = require('../models/patient.model');
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Register a new patient (Only accessible by 'clerk' role)
const registerPatient = asyncHandler(async (req, res) => {
  // Ensure the user has the 'clerk' role
  if (req.user.role !== 'Clerk') {
    return res.status(403).json({ message: 'Access Forbidden: Only clerks can register patients' });
  }

  const { name, age, contact, healthComplaints } = req.body;

  // Validate patient data
  const validationError = validatePatientData(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const newPatient = new Patient({
    patientID: generatePatientID(),
    name,
    age,
    contact,
    healthComplaints,
  });

  await newPatient.save();
  res.status(201).json(newPatient);
});

// Helper function to validate patient data
const validatePatientData = (data) => {
  const { name, age, contact, healthComplaints } = data;
  if (!name || !age || !contact || !healthComplaints) {
    return 'Missing required fields';
  }

  // Simple contact validation (you can extend this)
  if (!/^\d{10}$/.test(contact)) {
    return 'Contact number must be a 10-digit number';
  }
  return null;
};

// Generate a unique patient ID
const generatePatientID = () => {
  return `P${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Fetch patient details by ID (Only accessible by 'doctor' role)
const getPatientDetails = asyncHandler(async (req, res) => {
  if (req.user.role !== 'Doctor') {
    return res.status(403).json({ message: 'Access Forbidden: Only doctors can view patient details' });
  }

  const patient = await Patient.findOne({ patientID: req.params.id });
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }
  res.json(patient);
});

// List all patients (Only accessible by 'clerk' or 'admin' roles)
const listAllPatients = asyncHandler(async (req, res) => {
  if (![ 'Clerk', 'Admin' ].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access Forbidden: Only clerks or admins can list patients' });
  }

  let filter = {};

  if (req.query.date) {
    const date = new Date(req.query.date);
    const startOfDay = new Date(date.setHours(0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59));
    filter.registrationDate = { $gte: startOfDay, $lt: endOfDay };
  }

  const patients = await Patient.find(filter);
  res.json(patients);
});

module.exports = { registerPatient, getPatientDetails, listAllPatients };
