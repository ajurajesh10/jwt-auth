import React from "react";
import "./Home.css";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="home-page">
      <div className="home-page-div">
        <div className="register-div">
          <Button className="bg-dark text-light border-0">
            <Link
              to={"/register"}
              className="text-decoration-none text-light fw-semibold"
            >
              Register
            </Link>
          </Button>
        </div>

        <div className="login-div">
          <Button className="bg-dark text-light border-0">
            <Link
              to={"/login"}
              className="text-decoration-none text-light fw-semibold"
            >
              Login
            </Link>
          </Button>
        </div>

        <div className="dashboard text-center">
          <Button className="bg-secondary border-0">
            <Link to={"/dashboard"} className="text-decoration-none text-light">
              Dashboard
            </Link>
          </Button>
          <br />
          <Button className="mt-5" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
