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
import Team from "./Team";
import ForgetPassword from "./ForgetPassword";

const Home = () => <h1>HOME</h1>;

const Routes = () => {
  return (
    <Router>
      {/*  */}

      {/* DashBoards */}
      <Home path="/" />
      <LineChart path="/chart" />
      <Dashboard path="dashboard" />

      {/* Authentication */}
      <SignUp path="/register" />
      <Login path="/login" />
      <Logout path="/logout" />
      <Google path="/google" />
      <ForgetPassword path="/forggeting_password" />
      <ChangePassword path="/changing_password" />
      <VerificationCode path="/verification_code" />

      {/* Tables */}
      <TableScreen path="/:listOf" />

      {/* Forms */}
      <User path="/users/create" />
      <Organization path="/organizations/create" />
      <Site path="/sites/create" />
      <Team path="/teams/create" />

      {/*  */}
    </Router>
  );
};

export default Routes;
