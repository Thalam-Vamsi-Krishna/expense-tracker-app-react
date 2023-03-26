import { useState, useRef } from "react";
import { Form, Container, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvtlwqxzVKhuhWBcSJE6AmKab0x5J45eA",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
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
          setPassword("");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Password Reset Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        navigate("/auth");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const emailInputChangeHandler = () => {
    setEmail(emailInputRef.current.value);
  };

  const passwordInputChangeHandler = () => {
    setPassword(passwordInputRef.current.value);
  };

  return (
    <Container className="d-flex justify-content-center my-5">
      <Card>
        <Card.Title style={{ textAlign: "center", marginTop: "15px" }}>
          Reset Password
        </Card.Title>
        <Card.Body>
          <Form onSubmit={resetHandler}>
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
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Enter your new password here "
                ref={passwordInputRef}
                required
                style={{ marginTop: "15px", width: "100%" }}
                onChange={passwordInputChangeHandler}
                value={password}
              />
            </Form.Group>
            {!isLoading ? (
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "15px" }}
              >
                Reset
              </Button>
            ) : (
              <Button variant="success" style={{ marginTop: "15px" }}>
                <Spinner animation="border" size="sm" /> Updating...
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Reset;
