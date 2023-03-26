import { Fragment, useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
const Header = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/auth", { replace: true });
  };
  const location = useLocation();
  return (
    <Fragment>
      <Navbar bg="secondary" expand="sm" variant="secondary">
        <Container>
          <Nav className="flex-grow-3">
            <Nav.Item style={{ color: "white", fontSize: "25px" }}>
              Expense Tracker App
            </Nav.Item>
          </Nav>
        </Container>
        {authCtx.isLoggedIn && location.pathname !== "/auth" && (
          <Button
            variant="danger"
            style={{
              marginRight: "15px",
            }}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        )}
      </Navbar>
      {location.pathname !== "/profile" && (
        <div
          style={{
            padding: "5px",
            textAlign: "center",
            backgroundColor: "yellow",
          }}
        >
          You can update your
          <NavLink to="/profile"> profile here</NavLink>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
