import React from "react";
// import styles from "../styles/header.module.css";
import IconButton from "./Buttons/IconButton";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineEngineering } from "react-icons/md";
import H4 from "./headers/H4";
import ProfileMenu from "./ProfileMenu";

const outHeader = (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
      width: "100vw",
      height: "87px",
      backgroundImage:
        "linear-gradient(90deg, #a7ba62 , #56b4da 35% , #e84088 )",
      backgroundPosition: "0% 0%",
      backgroundSize: "100%",
    }}
  >
    <img
      src={require("../images/logo.png")}
      width="114px"
      height="49px"
      alt="Logo"
      style={{ marginLeft: "15%" }}
    />
  </div>
);

const inHeader = (
  <div
    style={{
      width: "100vw",
      height: "99px",
      backgroundImage:
        "linear-gradient(90deg,#a7ba62 , #56b4da 35% , #e84088 )",
      backgroundPosition: "0% 100%",
      backgroundSize: " 100% 12%",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "88%",
      }}
    >
      <img
        src={require("../images/clogo.png")}
        width="114px"
        height="49px"
        alt="Logo"
        style={{ marginLeft: "5%" }}
      />
      <div
        style={{
          marginRight: "10%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton Icon={IoMdNotificationsOutline} />
        <IconButton Icon={MdOutlineEngineering} />
        <ProfileMenu />
      </div>
    </div>
  </div>
);

const Header = (props) => {
  return <>{props.isAuthenticated || true ? inHeader : outHeader}</>;
};

export default Header;
