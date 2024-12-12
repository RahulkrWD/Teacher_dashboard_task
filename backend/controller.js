const StudentModel = require("./Model");

// create student
async function createStudent(req, res) {
  const { name, email, mobile, address } = req.body;
  if (!name || !email || !mobile || !address) {
    return res
      .status(400)
      .send({ message: "All fields are require", success: false });
  }

  const exisitinguser = await StudentModel.findOne({ email });
  if (exisitinguser) {
    return res.send({
      success: false,
      message: "Student already exists",
    });
  }
  try {
    const student = await StudentModel.create({
      name,
      email,
      mobile,
      address,
    });
    res
      .status(200)
      .send({ message: "student added successfully", student, success: true });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error adding student", error, success: false });
  }
}

// get all student
async function getAllStudent(req, res) {
  try {
    const student = await StudentModel.find();
    res.status(200).send({ message: "All student", student });
  } catch (error) {
    res.status(400).send({ message: "Error fetching students", error });
  }
}

// get student by id
async function getStudent(req, res) {
  const id = req.params.id;
  try {
    const student = await StudentModel.findById(id);
    res
      .status(200)
      .send({ message: "Student details", success: true, student });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching students", success: false, error });
  }
}

// delete student by id id
async function deleteStudent(req, res) {
  try {
    const id = req.params.id;
    await StudentModel.deleteOne({ _id: id });
    res
      .status(200)
      .send({ message: "Student Deleted successfully", success: true });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error Deleting Student", success: false, error });
  }
}

// update student details by id
async function updateStudent(req, res) {
  try {
    const id = req.params.id;
    const { name, email, address, mobile, status } = req.body;
    await StudentModel.findOneAndUpdate(
      { _id: id },
      { name, email, address, mobile, status },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Student updated successfully", success: true });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating Student", success: false, error });
  }
}

module.exports = {
  createStudent,
  getStudent,
  getAllStudent,
  deleteStudent,
  updateStudent,
};
