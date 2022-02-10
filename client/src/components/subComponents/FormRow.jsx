import React from "react";
import styles from "../../styles/formRow.module.css";

const FormRow = (props) => {
  const { style } = props;
  return (
    <div style={{ ...style }} className={styles.row}>
      {props.children}
    </div>
  );
};

export default FormRow;
