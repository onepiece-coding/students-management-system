import { Input } from "@/components/forms";
import { Heading } from "@/components/shared";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addStudent } from "@/store/students/studentsSlice";
import {
  addStudentSchema,
  TAddStudentFormInputs,
} from "@/validations/addStudentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const dispatch = useAppDispatch();
  const {
    add: { loading, error },
  } = useAppSelector((state) => state.students);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddStudentFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(addStudentSchema),
  });

  const onSubmitHandler: SubmitHandler<TAddStudentFormInputs> = async (
    data
  ) => {
    await dispatch(addStudent(data))
      .unwrap()
      .then(() => navigate("/students"));
  };

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Heading title="Add Student" />
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
                {loading === "pending" ? (
                  <>
                    <Spinner animation="border" size="sm" /> Loading...
                  </>
                ) : (
                  "Add Student"
                )}
              </Button>

              {error && (
                <p style={{ marginTop: "10px", color: "#DC3545" }}>{error}</p>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddStudent;
