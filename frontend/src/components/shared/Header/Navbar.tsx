import { authLogout } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  return (
    <Nav style={{ marginLeft: "auto" }}>
      <Nav.Link as={NavLink} to={"/"}>
        Home
      </Nav.Link>
      {!accessToken ? (
        <>
          <Nav.Link as={NavLink} to={"/login"}>
            Login
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/register"}>
            Register
          </Nav.Link>
        </>
      ) : (
        <NavDropdown
          title={`Welcome ${user?.firstName} ${user?.lastName}`}
          id="nav-dropdown"
        >
          <NavDropdown.Item eventKey={1} as={Link} to={"/students"}>
            Get Students
          </NavDropdown.Item>
          <NavDropdown.Item eventKey={2} as={Link} to={"/students/add"}>
            Add Student
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            eventKey={3}
            as={Link}
            to={"/"}
            onClick={() => {
              dispatch(authLogout());
            }}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </Nav>
  );
};

export default Navbar;
