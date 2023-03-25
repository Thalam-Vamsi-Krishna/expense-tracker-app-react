import { Fragment, useContext, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import AuthContext from "../Store/AuthContext";
const Profile = () => {
  const authCtx = useContext(AuthContext);
  const fullNameInputRef = useRef();
  const profileUrlRef = useRef();

  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("/home");
  };
  const updateHandler = (event) => {
    event.preventDefault();
    const enteredFullName = fullNameInputRef.current.value;
    const enteredProfileUrl = profileUrlRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDvtlwqxzVKhuhWBcSJE6AmKab0x5J45eA",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredFullName,
          photoUrl: enteredProfileUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Update Failed !";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Fragment>
      <Header />
      <Container className="my-5 d-flex justify-content-center">
        <Form onSubmit={updateHandler}>
          <header style={{ marginBottom: "15px" }}>
            Update Details{" "}
            <Button
              variant="outline-danger"
              style={{ marginLeft: "12%" }}
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </header>
          <Form.Group controlId="formBasicFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter full name here"
              ref={fullNameInputRef}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicProfileURL">
            <Form.Label>Profile Photo URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="paste profile photo url here"
              ref={profileUrlRef}
              required
            />
          </Form.Group>
          <Button
            variant="secondary"
            type="submit"
            style={{ marginTop: "15px" }}
          >
            Update
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};
export default Profile;
