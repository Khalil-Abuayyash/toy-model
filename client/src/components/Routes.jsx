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
import EditUser from "../Forms/EditUser";
import EditOrganization from "../Forms/EditOrganization";
import EditSite from "../Forms/EditSite";
import EditTeam from "../Forms/EditTeam";
import AuthRoutes from "../HOCs/AuthRoutes";
import FormsRoutes from "../HOCs/FormsRoutes";
import TablesRoutes from "../HOCs/TablesRoutes";

const Home = () => <h1>HOME</h1>;

const Routes = ({ isOpen, setIsOpen }) => {
  return (
    <Router>
      {/*  */}

      {/* DashBoards */}
      <Home default />
      <LineChart path="/chart" />
      <Dashboard path="dashboard" />

      {/* Authentication */}
      <AuthRoutes path="auth/*" />

      {/* Tables */}
      <TablesRoutes isOpen={isOpen} setIsOpen={setIsOpen} path="tables/*" />

      {/* Forms */}
      <FormsRoutes path="forms/*" />

      {/*  */}
    </Router>
  );
};

export default Routes;
