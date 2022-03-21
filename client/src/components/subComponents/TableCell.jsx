import React from "react";
import styles from "../../styles/table.module.css";

const TableCell = (props) => {
  const { text, isHead, onClick } = props;
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={onClick}
      className={`${styles.cell} ${isHead ? styles.head : styles.data}`}
    >
      {text !== undefined ? (
        <p
          style={{
            width: "100%",
            display: "inline-block",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {text}
        </p>
      ) : (
        props.children
      )}
    </div>
  );
};

export default TableCell;
