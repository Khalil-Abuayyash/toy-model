import React from "react";
import styles from "../../styles/headers.module.css";

const H2 = (props) => {
  return (
    <h2 className={`${styles.h2} ${styles.font} `} style={props.style}>
      {props.children}
    </h2>
  );
};

export default H2;
