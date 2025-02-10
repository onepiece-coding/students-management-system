import { Col, Container, Row } from "react-bootstrap";
import HeroImg from "@/assets/png/HeroImg.png";

const Home = () => {
  return (
    <section className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <h1 className="fs-2 lh-base mb-3">Students Management System</h1>
            <h2 className="fs-5 lh-base mb-3">
              This Students Management System is a simple CRUD application with
              React & Redux Toolkit!
            </h2>
            <p className="fs-6 mb-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae,
              doloribus cupiditate! Impedit ullam cum excepturi, laborum
              recusandae expedita fuga, voluptatem, ipsam eum tenetur aut at
              aperiam. Quas veritatis distinctio eos.
            </p>
          </Col>
          <Col lg={6} className="d-flex">
            <img
              src={HeroImg}
              alt="Hero Image"
              style={{ maxWidth: "80%" }}
              className="mx-auto"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
