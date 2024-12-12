const mongoose = require("mongoose");

async function db() {
  try {
    const database = await mongoose.connect(
      "mongodb+srv://rahulkr:rahulkr@cluster0.uu1odbb.mongodb.net/teacherdashboard"
    );
    console.log("connected to mongoDB successfully");
  } catch (err) {
    console.error("Connection to MongoDB failed:", err);
  }
}

module.exports = db;
