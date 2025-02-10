import { Container } from "react-bootstrap";
import styles from "./styles.module.css";

const { footer, copyrightText } = styles;

const Footer = () => {
  return (
    <footer className={footer}>
      <Container>
        <p className={copyrightText}>
          &copy; Students Management System, Inc. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
