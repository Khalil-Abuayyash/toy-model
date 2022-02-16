import React, { useState } from "react";
import { navigate, Link } from "@reach/router";
import H2 from "./headers/H2";
import H4 from "./headers/H4";
import Input from "./subComponents/Input";
import Button from "./subComponents/Button";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError] = useState([false, ""]);

  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/verification_code");
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
      <H2 style={{ marginTop: "0px", fontWeight: "600" }}>Forget Password?</H2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", margin: "0 auto" }}
      >
        <Input
          placeholder="Email"
          className={
            emailError[0] ? "error" : email.length === 0 ? "input" : "success"
          }
          id="email"
          value={email}
          onChange={handleEmail}
          isLarge={true}
        />
        <Button title="NEXT" isLarge={true} />
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
          Back to{" "}
          <Link to="/login">
            <span style={{ color: "#E84088", fontWeight: "bold" }}>
              Sign In
            </span>
          </Link>
        </H4>
      </div>
    </div>
  );
};

export default ForgetPassword;
