import { navigate } from "@reach/router";
import React, { useContext } from "react";
import axiosInstance from "../axios";
import styles from "../styles/profileSidebar.module.css";
import IconButton from "./Buttons/IconButton";
import { AuthContext } from "../Context/AuthenticationContext";

// Icons
import { VscSettingsGear } from "react-icons/vsc";
import { BsMegaphone } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { RiGlobalLine } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";

const SideBarButton = ({ Icon, label, isClicked, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.sideButton} ${
        isClicked ? styles.clicked : styles.unclicked
      }`}
    >
      <IconButton isClicked={isClicked} Icon={Icon} />
      <span
        className={`${isClicked ? styles.clicked : styles.unclicked}`}
        style={{ marginLeft: "8px", fontSize: "18px", fontWeight: 600 }}
      >
        {label}
      </span>
    </div>
  );
};

const ProfileSideBar = ({ currentIcon, setCurrentIcon }) => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    setIsAuthenticated(false);
    setUser({
      id: 0,
      email: "",
      nickname: "",
      role: { name: "", id: 0 },
      adminOrgs: [],
      memOrgs: [],
    });
    navigate("/auth/login");
  };

  return (
    <div className={styles.container}>
      {/* Picture & Name */}
      <div className={styles.pictureContainer}>
        <img className={styles.image} src={require("../images/clogo.png")} />
        <p
          style={{
            margin: "0px",
            fontSize: "21px",
            fontWeight: "600",
          }}
        >
          Saleem Rezq
        </p>
      </div>

      {/* Icons */}
      <div className={styles.iconsContainer}>
        <SideBarButton
          isClicked={currentIcon === "settings" ? true : false}
          onClick={() => {
            setCurrentIcon("settings");
            navigate("/profile/settings");
          }}
          label="Account Settings"
          Icon={VscSettingsGear}
        />
        <SideBarButton
          isClicked={currentIcon === "alerts" ? true : false}
          onClick={() => {
            setCurrentIcon("alerts");
            navigate("/profile/alerts");
          }}
          label="My Alerts"
          Icon={BsMegaphone}
        />
        <SideBarButton
          isClicked={currentIcon === "reports" ? true : false}
          onClick={() => {
            setCurrentIcon("reports");
            navigate("/profile/reports");
          }}
          label="My Reports"
          Icon={CgNotes}
        />
        <SideBarButton
          isClicked={currentIcon === "sessions" ? true : false}
          onClick={() => {
            setCurrentIcon("sessions");
            navigate("/profile/sessions");
          }}
          label="Profile Sessions"
          Icon={RiGlobalLine}
        />
        <SideBarButton onClick={logout} label="Log Out" Icon={CgLogOut} />
      </div>
    </div>
  );
};

export default ProfileSideBar;
