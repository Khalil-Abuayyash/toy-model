import React from "react";
import styles from "../../styles/headers.module.css";

const H3 = (props) => {
  return (
    <h3 className={`${styles.h3} ${styles.font} `} style={props.style}>
      {props.children}
    </h3>
  );
};

export default H3;
