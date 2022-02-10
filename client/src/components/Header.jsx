import React from "react";
// import styles from "../styles/header.module.css";
import rectangle from "../images/rectangle@2x.png";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundImage: `url(${rectangle})`,
        height: "87px",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        backgroundRepeat: "round",
      }}
    >
      <img
        src={require("../images/logo.png")}
        width="114px"
        height="49px"
        alt="Logo"
        style={{ marginLeft: "5%" }}
      />
    </div>
  );
};

export default Header;
