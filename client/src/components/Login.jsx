import React from "react";
import axiosInstance from "../axios";
import { navigate, Link } from "@reach/router";
import Form from "./Form";

const Login = () => {
  const handleSubmit = (formData) => {
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        email: formData.email.value,
        password: formData.password.value,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        navigate("/");
        //console.log(res);
        //console.log(res.data);
      });
  };

  return (
    <div>
      {/* <h1>Sign in</h1>
      <form>
        <input
          value={formData.email}
          id="email"
          name="email"
          onChange={handleChange}
        />
        <input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Sign In
        </button>
      </form>
      <Link to="/verification_code">Forgot Password</Link> */}
      <h1>Login</h1>
      <Form
        inputs={{
          email: { validation: "length", validationValue: "3" },
          password: { value: "", type: "password" },
        }}
        handleSubmit={handleSubmit}
      />
      <Link to="/verification_code">Forgot Password</Link>
    </div>
  );
};

export default Login;
