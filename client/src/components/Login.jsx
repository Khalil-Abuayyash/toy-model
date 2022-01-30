import React, { useState } from "react";
import axiosInstance from "../axios";
import { navigate, Link } from "@reach/router";

const Login = () => {
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
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
      <h1>Sign in</h1>
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
      <Link to="/verification_code">Forgot Password</Link>
    </div>
  );
};

export default Login;
