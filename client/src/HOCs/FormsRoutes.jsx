import React from "react";
import Header from "../components/Header";
import User from "../components/User";
import Organization from "../components/Organization";
import Site from "../components/Site";
import Team from "../components/Team";
import EditUser from "../Forms/EditUser";
import EditOrganization from "../Forms/EditOrganization";
import EditSite from "../Forms/EditSite";
import EditTeam from "../Forms/EditTeam";
import { Router } from "@reach/router";

const Home = () => <h1>HOME</h1>;

const FormsRoutes = () => {
  return (
    <>
      <Header category="form" />
      <Router>
        <Home default />
        {/* Forms */}
        <User path="/users/create" />
        <Organization path="/organizations/create" />
        <Site path="/sites/create" />
        <Team path="/teams/create" />

        {/* Editing Forms */}
        <EditUser path="/users/edit/:id" />
        <EditOrganization path="/organizations/edit/:id" />
        <EditSite path="/sites/edit/:id" />
        <EditTeam path="/teams/edit/:id" />
      </Router>
    </>
  );
};

export default FormsRoutes;
