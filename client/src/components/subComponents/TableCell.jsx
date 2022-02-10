import React from "react";
import styles from "../../styles/table.module.css";

const TableCell = (props) => {
  const { text, isHead } = props;
  return (
    <div className={`${styles.cell} ${isHead ? styles.head : styles.data}`}>
      {text !== undefined ? text : props.children}
    </div>
  );
};

export default TableCell;
