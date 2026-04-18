const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  apiName: {
    type: String,
    required: true,
  },
  statusCode: {
    type: Number,
    required: true,
  },
  responseTime: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Log", logSchema);
