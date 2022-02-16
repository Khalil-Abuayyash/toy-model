import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import styles from "../../styles/icon.module.css";

const DeleteButton = (props) => {
  const { onClick } = props;
  return (
    <IconContext.Provider value={{ color: "white" }}>
      <div className={`${styles.container} ${styles.delete}`} onClick={onClick}>
        <RiDeleteBin6Line className={`${styles.icon} `} />
      </div>
    </IconContext.Provider>
  );
};

export default DeleteButton;
