import React from "react";
import styles from "../../styles/headers.module.css";

const H4 = (props) => {
  return (
    <h4
      onClick={props.onClick}
      className={`${styles.h4} ${styles.font} `}
      style={props.style}
    >
      {props.children}
    </h4>
  );
};

export default H4;
