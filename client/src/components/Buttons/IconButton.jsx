import React from "react";
import { IconContext } from "react-icons";
import styles from "../../styles/icon.module.css";

const IconButton = (props) => {
  const { isClicked, Icon } = props;
  return (
    <IconContext.Provider value={{ color: isClicked ? "#ffffff" : "#B9B9B9" }}>
      <div
        className={`${styles.container}`}
        style={{ backgroundColor: isClicked ? "#ea3c88" : "#f6f6f6" }}
      >
        <Icon className={`${styles.icon}`} />
      </div>
    </IconContext.Provider>
  );
};

export default IconButton;
