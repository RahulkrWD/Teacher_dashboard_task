import React from "react";
import { Table, Button, Alert } from "react-bootstrap";
import Loading from "./Loading";

function StudentTable({ students, onEdit, onDelete, onStatus, isLoading }) {
  return (
    <>
      {isLoading && <Loading />}

      {students.length === 0 ? (
        <center>
          <Alert variant="info">No data found</Alert>
        </center>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.mobile}</td>
                <td>{student.address}</td>
                <td>{student.status}</td>
                <td>
                  <Button className="m-2" onClick={() => onEdit(student)}>
                    Edit
                  </Button>
                  <Button
                    className="m-2"
                    variant="danger"
                    onClick={() => onDelete(student._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="m-2"
                    variant={
                      student.status === "Present" ? "success" : "warning"
                    }
                    onClick={() => onStatus(student._id, student.status)}
                  >
                    {student.status === "Present"
                      ? "Mark Absent"
                      : "Mark Present"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default StudentTable;
