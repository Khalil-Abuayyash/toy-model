import React, { useState, useContext } from "react";
import axiosInstance from "../axios";
import { navigate, Link } from "@reach/router";
import H2 from "./headers/H2";
import H3 from "./headers/H3";
import H4 from "./headers/H4";
import Input from "./subComponents/Input";
import Button from "./subComponents/Button";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../Context/AuthenticationContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError] = useState([false, ""]);
  const [passwordError, setPasswordError] = useState([false, ""]);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const handleEmail = (e) => {
    setEmail(e.target.value.trim());
  };
  const handlePass = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`token/`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        return res.data.access;
      })
      .then((access) => {
        var decoded = jwt_decode(access);
        axiosInstance
          .get(`/user/authenticated/${decoded.user_id}`)
          .then((res) => {
            setUser(res.data);
            setIsAuthenticated(true);
            navigate("/users");
          });
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "5% auto",
        width: "fit-content",
      }}
    >
      <H3
        style={{ color: "#464545", marginBottom: "0px", fontWeight: "normal" }}
      >
        Welcome Back!
      </H3>
      <H2 style={{ marginTop: "0px", fontWeight: "normal" }}>
        Sign in to{" "}
        <span style={{ color: "#E84088", fontWeight: "bold" }}>QMETER</span>
      </H2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", margin: "0 auto" }}
      >
        <Input
          className={
            emailError[0] ? "error" : email.length === 0 ? "input" : "success"
          }
          id="email"
          value={email}
          onChange={handleEmail}
          isLarge={true}
        />
        <Input
          className={
            emailError[0] ? "error" : email.length === 0 ? "input" : "success"
          }
          id="password"
          value={password}
          onChange={handlePass}
          isLarge={true}
        />
        <Button title="Login" isLarge={true} />
      </form>
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <H4 style={{ fontWeight: "normal", marginBottom: "0px" }}>
          Don't have Account?{" "}
          <span style={{ color: "#E84088", fontWeight: "bold" }}>Sign Up</span>
        </H4>
        <H4>
          <Link
            style={{
              color: "#464545",
              marginTop: "0px",
              textDecoration: "none",
            }}
            to="/forggeting_password"
          >
            Forgot Password?
          </Link>
        </H4>
      </div>
    </div>
  );
};

export default Login;
