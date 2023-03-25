import { Fragment, useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
const Home = () => {
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
            variant="outline-primary"
            style={{
              marginRight: "15px",
              backgroundColor: "transparent",
              borderColor: "#007bff",
              color: "white",
            }}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        )}
      </Navbar>
    </Fragment>
  );
};

export default Home;
