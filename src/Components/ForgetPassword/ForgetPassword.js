import React, { useState } from 'react';
import "./ForgetPassword.css";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import loginImg from "../../Assets/login.png";
import userIcon from "../../Assets/user.png";
import axios from "axios";

const ForgetPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [incorrect, setIncorrect] = useState("")

      // validation error

  const [formError, setFormError] = useState("");

  const validateFunction = () => {
    let err = {};

    // email
    if (email === "") {
      err.email = "* required";
    } else {
      const regex =
        /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;

      if (!regex.test(email)) {
        err.email = "* email is not valid!";
      }
    }


    setFormError({ ...err });

    console.log(Object.keys(err));

    return Object.keys(err).length < 1;
  };

  // for security purpose
  axios.defaults.withCredentials = true;

  const handleClick = (e) => {
    e.preventDefault();

    const isValid = validateFunction();

    if (isValid) {
      axios
        .post("http://localhost:5000/auth/forget-password", {
          email
        })
        .then((response) => {
          console.log(response); // log the server response

          if (response.data.status) {
            alert("check yor email for reset password link")
            navigate("/login");
            console.log( email);
          } else {
            console.log(response.data.message);
            setIncorrect(response.data.message)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  
    return (
        <div className="forget-password">
        <Container>
          <Row>
            <Col lg={8} className="m-auto">
              <div className="login__container d-flex justify-content-between">
                <div className="login__img">
                  <img src={loginImg} alt="" />
                </div>
  
                <div className="login__form">
                  <div className="user">
                    <img src={userIcon} alt="" />
                  </div>
                  <h2>Forget Password</h2>
  
                  <Form onSubmit={handleClick}>
  
                    <Form.Group className="mb-3">
                      <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="mt-1 text-danger">
                        <span className="">
                          {formError.email && formError.email}
                          {incorrect && incorrect}
                        </span>
                      </div>
                    </Form.Group>
  
                    <Button
                      className="btn secondary__btn auth__btn"
                      type="submit"
                    >
                      Send
                    </Button>
                  </Form>
                  <p>
                    Don't have an account? <Link to={"/register"}>Create</Link>
                  </p>
  
                  <Row>
                    <Col className="text-center">
                      <Button className="bg-dark border-0 ">
                        <Link
                          to={"/"}
                          className="text-decoration-none text-light fw-semibold"
                        >
                          Home
                        </Link>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default ForgetPassword;
