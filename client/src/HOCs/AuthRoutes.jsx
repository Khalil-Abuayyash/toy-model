import React from "react";
import Login from "../components/Login";
import Logout from "../components/Logout";
import SignUp from "../components/SignUp";
import Google from "../components/Google";
import VerificationCode from "../components/VerificationCode";
import ChangePassword from "../components/ChangePassword";
import ForgetPassword from "../components/ForgetPassword";
import { Router } from "@reach/router";
import Header from "../components/Header";

const AuthRoutes = ({ children }) => {
  return (
    <>
      <Header />
      <Router>
        <SignUp path="/register" />
        <Login path="login" />
        <Logout path="/logout" />
        <Google path="/google" />
        <ForgetPassword path="/forggeting_password" />
        <ChangePassword path="/changing_password" />
        <VerificationCode path="/verification_code" />
      </Router>
    </>
  );
};

export default AuthRoutes;
