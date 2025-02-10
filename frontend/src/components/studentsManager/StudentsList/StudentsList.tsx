import { TStudent } from "@/types";
import { Table } from "react-bootstrap";
import Student from "../Student/Student";

const StudentsList = ({ students }: { students: TStudent[] }) => {
  const studentsList = students.map((student) => {
    return <Student key={student.id} {...student} />;
  });

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Reference</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{studentsList}</tbody>
    </Table>
  );
};

export default StudentsList;
