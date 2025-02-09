const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const patientRoutes = require("./routes/patient.routes");
const admissionRoutes = require("./routes/admission.routes");
const referralRoutes = require("./routes/referral.routes");
const labRegistrationRoutes = require("./routes/labRegistration.routes");
const diagnosticResultsRoutes = require("./routes/diagnosticResults.routes");
const roleRoutes = require("./routes/role.routes");

dotenv.config(); // Initialize dotenv to load environment variables

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/lab", labRegistrationRoutes);
app.use("/api/diagnostic-results", diagnosticResultsRoutes);
app.use("/api/roles", roleRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.send("Welcome to MedicoPlus Backend");
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
