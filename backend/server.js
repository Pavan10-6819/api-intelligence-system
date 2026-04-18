const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

// test route
app.get("/", (req, res) => {
  res.send("API Intelligence System Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const logRoutes = require("./routes/logRoutes");
app.use("/api/logs", logRoutes);
