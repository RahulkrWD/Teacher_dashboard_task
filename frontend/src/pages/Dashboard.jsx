import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import ModalForm from "../components/ModelForm";
import StudentTable from "../components/StudentTable";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/students");
        setStudents(response.data.student);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsUpdate(false);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsUpdate(true);
    setShowModal(true);
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };

  const handleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Present" ? "Absent" : "Present";
      await axios.put(`http://localhost:5000/api/students/${id}`, {
        status: newStatus,
      });
      setStudents(
        students.map((student) =>
          student._id === id ? { ...student, status: newStatus } : student
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleModalSubmit = () => {
    setShowModal(false);
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => setStudents(response.data.student))
      .catch((error) => console.error("Error fetching students", error));
  };

  return (
    <div>
      <nav className="navbar m-4">
        <u>
          <h3>Teachers Dashboard</h3>
        </u>
        <Button
          variant="primary"
          className="m-2 fw-bold"
          onClick={handleAddStudent}
        >
          Add Student
        </Button>
      </nav>

      <StudentTable
        students={students}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
        onStatus={handleStatus}
      />
      <ModalForm
        show={showModal}
        onHide={() => setShowModal(false)}
        studentData={selectedStudent}
        onSubmit={handleModalSubmit}
        isUpdate={isUpdate}
      />
    </div>
  );
}

export default Dashboard;