const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  mobile: { type: Number, required: true },
  status: { type: String, default: "Absent" },
});
module.exports = mongoose.model("Student", studentSchema);
