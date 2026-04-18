const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

function getSuggestion(log) {
  if (log.statusCode === 500) {
    return "Server error: Check backend logic or null values";
  }
  if (log.statusCode === 401) {
    return "Authentication issue: Verify token or credentials";
  }
  if (log.statusCode === 404) {
    return "Endpoint not found: Check API URL";
  }
  if (log.responseTime > 1000) {
    return "Slow API: Optimize DB query or backend logic";
  }
  return "No major issues detected";
}
// ✅ Add log
router.post("/add", async (req, res) => {
  try {
    const { apiName, statusCode, responseTime, message } = req.body;

    const log = new Log({
      apiName,
      statusCode,
      responseTime,
      message,
    });

    await log.save();

    res.status(201).json({
      success: true,
      message: "Log saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving log",
      error: error.message,
    });
  }
});

// ✅ Get all logs
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });

    const logsWithSuggestions = logs.map((log) => ({
      ...log._doc,
      suggestion: getSuggestion(log),
    }));

    res.json(logsWithSuggestions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});

module.exports = router;
// ✅ Failure analysis
router.get("/analysis", async (req, res) => {
  try {
    const logs = await Log.find();

    const totalRequests = logs.length;

    const failures = logs.filter((log) => log.statusCode >= 400);
    const totalFailures = failures.length;

    const failureRate =
      totalRequests === 0
        ? 0
        : ((totalFailures / totalRequests) * 100).toFixed(2);

    res.json({
      totalRequests,
      totalFailures,
      failureRate: failureRate + "%",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error analyzing logs",
    });
  }
});

// ✅ Most failing API
router.get("/top-failures", async (req, res) => {
  try {
    const logs = await Log.find();

    const failureCounts = {};

    logs.forEach((log) => {
      if (log.statusCode >= 400) {
        failureCounts[log.apiName] = (failureCounts[log.apiName] || 0) + 1;
      }
    });

    const sortedFailures = Object.entries(failureCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([apiName, count]) => ({ apiName, count }));

    res.json(sortedFailures);
  } catch (error) {
    res.status(500).json({
      message: "Error finding top failures",
    });
  }
});

// ✅ Slow APIs (response time > 1000ms)
router.get("/slow-apis", async (req, res) => {
  try {
    const logs = await Log.find();

    const slowApis = logs
      .filter((log) => log.responseTime > 1000)
      .map((log) => ({
        apiName: log.apiName,
        responseTime: log.responseTime,
      }));

    res.json(slowApis);
  } catch (error) {
    res.status(500).json({
      message: "Error finding slow APIs",
    });
  }
});
