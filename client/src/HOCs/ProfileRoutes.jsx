import { Router } from "@reach/router";
import React, { useState } from "react";
import AccountSettings from "../components/AccountSettings";
import Header from "../components/Header";
import MyAlerts from "../components/MyAlerts";
import MyReports from "../components/MyReports";
import ProfileSessions from "../components/ProfileSessions";
import ProfileSideBar from "../components/ProfileSideBar";
import styles from "../styles/profile.module.css";

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
        <div className={styles.container}>
          <Router>
            <AccountSettings path="settings" setCurrentIcon={setCurrentIcon} />
            <MyAlerts path="alerts" setCurrentIcon={setCurrentIcon} />
            <MyReports path="reports" setCurrentIcon={setCurrentIcon} />
            <ProfileSessions path="sessions" setCurrentIcon={setCurrentIcon} />
          </Router>
        </div>
      </div>
    </>
  );
};

export default ProfileRoutes;
