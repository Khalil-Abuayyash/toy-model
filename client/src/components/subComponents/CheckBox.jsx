import React from "react";
import styles from "../../styles/checkbox.module.css";

const CheckBox = ({ label, checked }) => {
  return (
    <label className={styles.container}>
      <input type="checkbox" checked={checked} />
      <span className={styles.checkmark}></span>
      <span>{label}</span>
    </label>
  );
};

export default CheckBox;
