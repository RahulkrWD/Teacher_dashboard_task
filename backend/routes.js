const express = require("express");
const {
  createStudent,
  getAllStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("./controller");
const router = express.Router();

router.post("/students", createStudent);
router.get("/students", getAllStudent);
router.get("/students/:id", getStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

module.exports = router;
