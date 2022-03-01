import { Router } from "@reach/router";
import React, { useState } from "react";
import AccountSettings from "../components/AccountSettings";
import Header from "../components/Header";
import MyAlerts from "../components/MyAlerts";
import ProfileSideBar from "../components/ProfileSideBar";

const ProfileRoutes = () => {
  const [currentIcon, setCurrentIcon] = useState("settings");
  return (
    <>
      <Header category="form" />

      <div style={{ display: "flex" }}>
        <ProfileSideBar
          currentIcon={currentIcon}
          setCurrentIcon={setCurrentIcon}
        />
        <Router>
          <AccountSettings path="settings" />
          <MyAlerts path="alerts" />
        </Router>
      </div>
    </>
  );
};

export default ProfileRoutes;
