import { Loading } from "@/components/feedback";
import { Input } from "@/components/forms";
import { Heading } from "@/components/shared";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getStudentById,
  studentCleanUP,
  updateStudent,
} from "@/store/students/studentsSlice";
import {
  addStudentSchema,
  TAddStudentFormInputs,
} from "@/validations/addStudentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
  const { id: studentID } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { getById, edit, student } = useAppSelector((state) => state.students);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAddStudentFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(addStudentSchema),
  });

  const onSubmitHandler: SubmitHandler<TAddStudentFormInputs> = async (
    data
  ) => {
    await dispatch(updateStudent({ id: +studentID!, ...data }))
      .unwrap()
      .then(() => navigate("/students"));
  };

  useEffect(() => {
    const promise = dispatch(getStudentById(+studentID!));
    return () => {
      dispatch(studentCleanUP());
      promise.abort();
    };
  }, [dispatch, studentID]);

  useEffect(() => {
    if (student) reset(student);
  }, [reset, student]);

  return (
    <section className="py-5">
      <Container>
        <Heading title="Edit Student" />
        <Loading status={getById.loading} error={getById.error}>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
                <Input<TAddStudentFormInputs>
                  label="First Name"
                  register={register}
                  name="firstName"
                  error={errors.firstName?.message || ""}
                />

                <Input<TAddStudentFormInputs>
                  label="Last Name"
                  register={register}
                  name="lastName"
                  error={errors.lastName?.message || ""}
                />

                <Input<TAddStudentFormInputs>
                  type="text"
                  label="Student Reference"
                  register={register}
                  name="reference"
                  error={errors.reference?.message || ""}
                />

                <Input<TAddStudentFormInputs>
                  type="email"
                  label="Email Address"
                  register={register}
                  name="email"
                  error={errors.email?.message || ""}
                />

                <Button variant="primary" type="submit">
                  {edit.loading === "pending" ? (
                    <>
                      <Spinner animation="border" size="sm" /> Loading...
                    </>
                  ) : (
                    "Edit Student"
                  )}
                </Button>

                {edit.error && (
                  <p style={{ marginTop: "10px", color: "#DC3545" }}>
                    {edit.error}
                  </p>
                )}
              </Form>
            </Col>
          </Row>
        </Loading>
      </Container>
    </section>
  );
};

export default UpdateStudent;
