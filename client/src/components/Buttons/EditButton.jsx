import React from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IconContext } from "react-icons";
import styles from "../../styles/icon.module.css";

const EditButton = (props) => {
  const { onClick } = props;

  return (
    <IconContext.Provider value={{ color: "#B9B9B9" }}>
      <div className={`${styles.container} ${styles.edit}`} onClick={onClick}>
        <HiOutlinePencilAlt className={`${styles.icon}`} />
      </div>
    </IconContext.Provider>
  );
};

export default EditButton;
