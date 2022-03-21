import React from "react";
import { Router, Redirect } from "@reach/router";

import LineChart from "./LineChart";

import AuthRoutes from "../HOCs/AuthRoutes";
import FormsRoutes from "../HOCs/FormsRoutes";
import TablesRoutes from "../HOCs/TablesRoutes";
import ProfileRoutes from "../HOCs/ProfileRoutes";

const Home = () => <h1>Not Found 404</h1>;

const Routes = ({ isOpen, setIsOpen }) => {
  return (
    <Router>
      {/*  */}

      <Redirect from="/" to="/auth/login" />

      {/* DashBoards */}
      <Home default />
      <LineChart path="/chart" />

      {/* Authentication */}
      <AuthRoutes path="auth/*" />

      {/* Tables */}
      <TablesRoutes isOpen={isOpen} setIsOpen={setIsOpen} path="tables/*" />

      {/* Forms */}
      <FormsRoutes path="forms/*" />

      {/* Profile */}
      <ProfileRoutes path="profile/*" />

      {/*  */}
    </Router>
  );
};

export default Routes;
