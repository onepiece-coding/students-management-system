import { Loading } from "@/components/feedback";
import { Heading } from "@/components/shared";
import { StudentsList } from "@/components/studentsManager";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getStudents, studentsCleanUP } from "@/store/students/studentsSlice";
import { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";

const GetStudents = () => {
  const dispatch = useAppDispatch();
  const {
    get: { loading, error },
    records,
    message,
  } = useAppSelector((state) => state.students);

  const [show, setShow] = useState(true);

  useEffect(() => {
    const promise = dispatch(getStudents());
    return () => {
      dispatch(studentsCleanUP());
      promise.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    const timeId = setTimeout(() => setShow(false), 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <section className="py-4">
      <Container>
        <Heading title="Students List" />
        <Loading status={loading} error={error}>
          {message && message === "added" && (
            <Alert variant="success" show={show}>
              Student Added Successfully.
            </Alert>
          )}
          {message && message === "edited" && (
            <Alert variant="success" show={show}>
              Student Updated Successfully.
            </Alert>
          )}
          {message && message === "already_exist" && (
            <Alert variant="danger" show={show}>
              The student you are trying to add already exists!
            </Alert>
          )}
          {records.length ? (
            <StudentsList students={records} />
          ) : (
            <p>No Students To Show!</p>
          )}
        </Loading>
      </Container>
    </section>
  );
};

export default GetStudents;
