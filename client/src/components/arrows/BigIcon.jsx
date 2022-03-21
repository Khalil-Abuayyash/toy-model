import React from "react";
import { IconContext } from "react-icons";
import styles from "../../styles/icon.module.css";

const BigIcon = ({ current, onClick, Icon, isClicked, style }) => {
  return (
    <IconContext.Provider value={{ color: isClicked ? "#ffffff" : "#e84088" }}>
      <div
        onClick={onClick}
        className={`${styles.container}`}
        style={{
          // marginRight: "0px",
          ...style,
          backgroundColor: isClicked ? "#e84088" : "#f6f6f6",
          width: "64px",
          height: "64px",
          borderRadius: "8px",
          border: isClicked ? "none" : "2px solid #e84088",
          boxSizing: "border-box",
        }}
      >
        {/* <Icon className={`${styles.icon}`} /> */}
        <Icon style={{ width: "30px", height: "30px" }} />
      </div>
    </IconContext.Provider>
  );
};

export default BigIcon;
