import React, { useState } from "react";
import "./Register.css";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import registerImg from "../../Assets/register.png";
import userIcon from "../../Assets/user.png";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [oldUser, setOldUser] = useState("");

  // validation error

  const [formError, setFormError] = useState("");

  const validateFunction = () => {
    let err = {};
    if (username === "") {
      err.username = "* required";
    }

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
    if (password.length < 8) {
      err.password = "* required atleast 8 characteristics";
    }
    // else
    // {
    //   let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    //  if(!regex.test(credentials.password))
    //  {
    //    err.password = "Password must have atleast one lowercase, uppercase, numeric digit, special characters"
    //  }
    // }

    setFormError({ ...err });

    console.log(Object.keys(err));

    return Object.keys(err).length < 1;
  };

  const handleClick = (e) => {
    e.preventDefault();

    const isValid = validateFunction();

    if (isValid) {
      axios
        .post("http://localhost:5000/auth/signup", {
          username,
          email,
          password,
        })
        .then((response) => {
          console.log(response); // log the server response

          if (response.data.status) {
            navigate("/");
            console.log(username, email, password);
          } else {
            // console.log(response.data.message);
            setOldUser(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="register-page">
      <Container>
        <Row>
          <Col lg={8} className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <Form.Group className="mb-3">
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <div className="mt-1 text-danger">
                      <span className="">
                        {formError.username && formError.username}
                      </span>
                    </div>{" "}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <input
                      type="text"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="mt-1 text-danger">
                      <span className="">
                        {formError.email && formError.email}
                      </span>
                      <span className="">{oldUser && oldUser}</span>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="mt-1 text-danger">
                      <span className="">
                        {formError.password && formError.password}
                      </span>
                    </div>
                  </Form.Group>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to={"/login"}>Login</Link>
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

export default Register;
