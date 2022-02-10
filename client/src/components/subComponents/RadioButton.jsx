import React from "react";
import styles from "../../styles/radioButton.module.css";
import headers from "../../styles/headers.module.css";

const RadioButton = (props) => {
  const { label, name, style, checked, onChange, value } = props;
  return (
    <label style={{ ...style, marginRight: "30px" }}>
      <input
        onChange={onChange}
        checked={checked}
        className={styles.radio}
        type="radio"
        name={name}
        value={value}
      />
      <span
        className={`${headers.h4} ${headers.font}`}
        style={{ fontWeight: "bold" }}
      >
        {label}
      </span>
    </label>
  );
};

export default RadioButton;
