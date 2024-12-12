import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function ModalForm({ show, onHide, studentData, onSubmit, isUpdate }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    address: "",
    mobile: "",
  });

  useEffect(() => {
    if (isUpdate && studentData) {
      setStudent(studentData);
    } else {
      setStudent({
        name: "",
        email: "",
        address: "",
        mobile: "",
      });
    }
  }, [isUpdate, studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await axios.put(
          `https://teacher-dashboard-task-z9nd.vercel.app/api/students/${student._id}`,
          student
        );

        onSubmit();
        onHide();
      } else {
        const res = await axios.post(
          "https://teacher-dashboard-task-z9nd.vercel.app/api/students",
          student
        );
        if (res.data.success) {
          onSubmit();
          onHide();
        } else {
          alert("User alread exist");
        }
      }
    } catch (error) {
      console.error("Error while submitting form", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isUpdate ? "Update Student" : "Add Student"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter student name"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter student email"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter student address"
              name="address"
              value={student.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter student mobile"
              name="mobile"
              value={student.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button className="mt-3" variant="primary" type="submit">
            {isUpdate ? "Update Student" : "Create Student"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;
