import React, { useState } from "react";
import { navigate, Link } from "@reach/router";
import H2 from "./headers/H2";
import H4 from "./headers/H4";
import Input from "./subComponents/Input";
import Button from "./subComponents/Button";

const VerificationCode = () => {
  const [password, setPassowrd] = useState("");
  const [passwordError, setPasswordError] = useState([false, ""]);
  const [confirm, setConfirm] = useState("");
  const [confirmError] = useState([false, ""]);

  const handlePassword = (e) => {
    setPassowrd(e.target.value.trim());
  };

  const handleConfirm = (e) => {
    setConfirm(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate("/changing_password");
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
      <H2 style={{ marginTop: "0px", fontWeight: "600" }}>Change Password</H2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", margin: "0 auto" }}
      >
        <Input
          placeholder="New Password"
          className={
            passwordError[0]
              ? "error"
              : password.length === 0
              ? "input"
              : "success"
          }
          id="password"
          value={password}
          onChange={handlePassword}
          isLarge={true}
        />
        <Input
          placeholder="Verification Code"
          className={
            confirmError[0]
              ? "error"
              : confirm.length === 0
              ? "input"
              : "success"
          }
          id="confirm"
          value={confirm}
          onChange={handleConfirm}
          isLarge={true}
        />
        <Button title="CHANGE PASSWORD" isLarge={true} />
      </form>
      <div
        style={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      ></div>
    </div>
  );
};

export default VerificationCode;
