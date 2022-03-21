import { Router } from "@reach/router";
import React from "react";
import OrganizationSummary from "../components/OrganizationSummary";
import SiteScreen from "./SiteScreen";

const HomeScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Router>
        <OrganizationSummary path="/" />
        <SiteScreen path="/sites/:id/*" />
      </Router>
    </div>
  );
};

export default HomeScreen;
