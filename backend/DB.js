const mongoose = require("mongoose");

async function db() {
  try {
    const database = await mongoose.connect(`${process.env.MONGODB}`);
    console.log("connected to mongoDB successfully");
  } catch (err) {
    console.error("Connection to MongoDB failed:", err);
  }
}

module.exports = db;
