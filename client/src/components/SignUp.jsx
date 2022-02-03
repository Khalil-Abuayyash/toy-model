import React, { useState } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";

const SignUp = () => {
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`user/create/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .then((res) => {
        navigate("/login");
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input
          value={formData.email}
          id="email"
          name="email"
          onChange={handleChange}
        />
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
