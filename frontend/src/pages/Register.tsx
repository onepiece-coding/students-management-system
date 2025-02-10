import { Input } from "@/components/forms";
import { Heading } from "@/components/shared";
import { authRegister, cleanUI } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  registerSchema,
  TRegisterFormInputs,
} from "@/validations/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const onSubmitHandler: SubmitHandler<TRegisterFormInputs> = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(authRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => navigate("/login?message=registred"));
  };

  useEffect(() => {
    return () => {
      dispatch(cleanUI());
    };
  }, [dispatch]);

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Heading title="Register Teacher" />
            <Form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
              <Input<TRegisterFormInputs>
                label="First Name"
                register={register}
                name="firstName"
                error={errors.firstName?.message || ""}
              />

              <Input<TRegisterFormInputs>
                label="Last Name"
                register={register}
                name="lastName"
                error={errors.lastName?.message || ""}
              />

              <Input<TRegisterFormInputs>
                type="email"
                label="Email Address"
                register={register}
                name="email"
                error={errors.email?.message || ""}
              />

              <Input<TRegisterFormInputs>
                type="password"
                label="Password"
                register={register}
                name="password"
                error={errors.password?.message || ""}
              />

              <Input<TRegisterFormInputs>
                type="password"
                label="Confirm Password"
                register={register}
                name="confirmPassword"
                error={errors.confirmPassword?.message || ""}
              />

              <Button variant="primary" type="submit">
                {loading === "pending" ? (
                  <>
                    <Spinner animation="border" size="sm" /> Loading...
                  </>
                ) : (
                  "Register"
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

export default Register;
