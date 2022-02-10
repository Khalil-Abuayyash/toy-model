import React from "react";
import styles from "../../styles/table.module.css";

const TableRow = (props) => {
  return <div className={styles.row}>{props.children}</div>;
};

export default TableRow;
