import React from "react";
import { VscNote } from "react-icons/vsc";
import { IconContext } from "react-icons";
import styles from "../../styles/icon.module.css";

const ViewButton = () => {
  return (
    <IconContext.Provider value={{ color: "#B9B9B9" }}>
      <div className={`${styles.container} ${styles.view}`}>
        <VscNote className={`${styles.icon}`} />
      </div>
    </IconContext.Provider>
  );
};

export default ViewButton;
