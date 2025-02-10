import { Input } from "@/components/forms";
import { Heading } from "@/components/shared";
import { authLogin, cleanUI } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSchema, TLoginFormInputs } from "@/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler: SubmitHandler<TLoginFormInputs> = (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    dispatch(authLogin(data))
      .unwrap()
      .then(() => navigate("/"));
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
            <Heading title="Login Teacher" />
            {searchParams.get("message") === "registred" && (
              <Alert variant="success">
                Your account successfully created, please login
              </Alert>
            )}
            {searchParams.get("message") === "login_required" && (
              <Alert variant="info">
                Your need to login to view our content!
              </Alert>
            )}
            <Form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
              <Input<TLoginFormInputs>
                type="email"
                label="Email Address"
                register={register}
                name="email"
                error={errors.email?.message || ""}
              />

              <Input<TLoginFormInputs>
                type="password"
                label="Password"
                register={register}
                name="password"
                error={errors.password?.message || ""}
              />

              <Button variant="primary" type="submit">
                {loading === "pending" ? (
                  <>
                    <Spinner animation="border" size="sm" /> Loading...
                  </>
                ) : (
                  "Login"
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

export default Login;
