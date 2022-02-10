import React from "react";
import styles from "../../styles/button.module.css";

const Button = (props) => {
  const { title, onClick, isLarge, style, disabled } = props;
  return (
    <button
      disabled={disabled}
      style={{ ...style }}
      onClick={onClick}
      className={` ${styles.default} ${
        isLarge ? styles["large"] : styles["small"]
      } ${disabled ? styles["disabled"] : null} `}
    >
      {title}
    </button>
  );
};

export default Button;
