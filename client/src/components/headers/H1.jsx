import React from "react";
import styles from "../../styles/headers.module.css";

const H1 = (props) => {
  return (
    <h1 className={`${styles.h1} ${styles.font} `} style={props.style}>
      {props.children}
    </h1>
  );
};

export default H1;
