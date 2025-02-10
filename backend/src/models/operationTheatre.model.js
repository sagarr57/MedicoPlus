const mongoose = require('mongoose');

const operationTheatreSchema = new mongoose.Schema(
  {
    patientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    surgeryType: {
      type: String,
      required: true,
    },
    surgeryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OperationTheatre', operationTheatreSchema);
