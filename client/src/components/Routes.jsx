import React from "react";
import { Router } from "@reach/router";
import LineChart from "./LineChart";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";
import Google from "./Google";
import VerificationCode from "./VerificationCode";
import ChangePassword from "./ChangePassword";
import Dashboard from "../screens/Dashboard";
import TableScreen from "../screens/TableScreen";
import User from "./User";
import Organization from "./Organization";
import Site from "./Site";

const Home = () => <h1>HOME</h1>;

const Routes = () => {
  return (
    <Router>
      <Home path="/" />
      <SignUp path="/register" />
      <Google path="/google" />
      <Login path="/login" />
      <Logout path="/logout" />
      <LineChart path="/chart" />
      <VerificationCode path="/verification_code" />
      <ChangePassword path="/changing_password" />
      <Dashboard path="dashboard" />
      <TableScreen path="/:listOf" />
      <User path="/users/create" />
      <Organization path="/organizations/create" />
      <Site path="/sites/create" />
    </Router>
  );
};

export default Routes;
