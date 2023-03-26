import { useState, useRef, useContext } from "react";
import { Card, Form, Button, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const checkPasswordInputRef = useRef();

  const sign_up_text = "Don't have an account ?";
  const login_text = "Already have an account ?";

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const checkPassword = checkPasswordInputRef.current?.value;
    setIsLoading(true);
    let url;
    if (!isLogin && enteredPassword !== checkPassword) {
      alert("Passwords did not match");
      setIsLoading(false);
      return;
    }
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvtlwqxzVKhuhWBcSJE6AmKab0x5J45eA";
    }
    if (!isLogin && enteredPassword === checkPassword) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvtlwqxzVKhuhWBcSJE6AmKab0x5J45eA";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed !";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        navigate("/verification");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container className="d-flex justify-content-center my-5">
      <Card>
        <Card.Title style={{ textAlign: "center", marginTop: "15px" }}>
          {isLogin ? "Login" : "Sign Up"}
        </Card.Title>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                ref={emailInputRef}
                required
                style={{ width: "100%" }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                ref={passwordInputRef}
                required
                style={{ width: "100%", marginTop: "15px" }}
              />
            </Form.Group>
            {!isLogin && (
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  ref={checkPasswordInputRef}
                  required
                  style={{ width: "100%", marginTop: "15px" }}
                />
              </Form.Group>
            )}
            {!isLoading ? (
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "15px" }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            ) : (
              <Button variant="success" style={{ marginTop: "15px" }}>
                <Spinner animation="border" size="sm" /> Sending Request...
              </Button>
            )}
          </Form>
        </Card.Body>
        <Card.Footer>
          {isLogin ? (
            <>
              {sign_up_text}{" "}
              <Button
                variant="link"
                style={{ padding: "0", marginBottom: "5px" }}
                onClick={switchAuthModeHandler}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {login_text}{" "}
              <Button
                variant="link"
                style={{ padding: "0", marginBottom: "5px" }}
                onClick={switchAuthModeHandler}
              >
                Login
              </Button>
            </>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default AuthForm;
