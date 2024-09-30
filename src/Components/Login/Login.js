import React, { useState } from "react";
import "./Login.css";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import loginImg from "../../Assets/login.png";
import userIcon from "../../Assets/user.png";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [incorrect, setIncorrect] = useState("");

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

    // password
    if (password === "") {
      err.password = "* required";
    }
    // if(password.length < 8)
    // {
    //   err.password = "* required atleast 8 characteristics"
    // }
    // else
    // {
    //   let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    //  if(!regex.test(password))
    //  {
    //    err.password = "Password must have atleast one lowercase, uppercase, numeric digit, special characters"
    //  }
    // }

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
        .post("http://localhost:5000/auth/login", {
          email,
          password,
        })
        .then((response) => {
          console.log(response); // log the server response

          if (response.data.status) {
            navigate("/");
            console.log( email, password);
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
    <div className="login-page">
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
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <div className="not-matched text-center my-3">
                    <span>{incorrect && incorrect}</span>
                  </div>

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
                      </span>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="mt-1 text-danger">
                      <span className="">
                        {formError.password && formError.password}
                      </span>{" "}
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      <span>
                        <Link
                          to={"/forgetpassword"}
                          className="forget-password text-decoration-none fw-semibold"
                        >
                          {" "}
                          Forger password?
                        </Link>
                      </span>
                    </div>
                  </Form.Group>

                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
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
};

export default Login;
