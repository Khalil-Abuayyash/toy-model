import React from "react";
import { IconContext } from "react-icons";
import styles from "../../styles/icon.module.css";

const IconButton = (props) => {
  const { isClicked, Icon, style, onClick } = props;
  return (
    <IconContext.Provider value={{ color: isClicked ? "#ffffff" : "#B9B9B9" }}>
      <div
        onClick={onClick}
        className={`${styles.container}`}
        style={{ backgroundColor: isClicked ? "#ea3c88" : "#f6f6f6", ...style }}
      >
        <Icon className={`${styles.icon}`} />
      </div>
    </IconContext.Provider>
  );
};

export default IconButton;
