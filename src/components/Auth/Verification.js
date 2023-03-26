import { useState, useRef, useContext } from "react";
import { Form, Container, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext";

const Verification = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const verificationHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvtlwqxzVKhuhWBcSJE6AmKab0x5J45eA",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          setEmail("");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Verification Failed !";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (data.email === enteredEmail) {
          navigate("/home");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const emailInputChangeHandler = () => {
    setEmail(emailInputRef.current.value);
  };
  return (
    <Container className="d-flex justify-content-center my-5">
      <Card>
        <Card.Title style={{ textAlign: "center", marginTop: "15px" }}>
          Verify It's You
        </Card.Title>
        <Card.Body>
          <Form onSubmit={verificationHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter your email here "
                ref={emailInputRef}
                required
                style={{ width: "100%" }}
                onChange={emailInputChangeHandler}
                value={email}
              />
            </Form.Group>
            {!isLoading ? (
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "15px" }}
              >
                Verify
              </Button>
            ) : (
              <Button variant="success" style={{ marginTop: "15px" }}>
                <Spinner animation="border" size="sm" /> Verifying...
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Verification;
