import React from "react";
import styles from "../../styles/button.module.css";
import styling from "../../styles/formRow.module.css";

const Button = (props) => {
  const { title, onClick, isLarge, style, disabled, isLeft, isRight, isWide } =
    props;
  return (
    <button
      disabled={disabled}
      style={{ ...style }}
      onClick={onClick}
      className={` ${styles.default} ${
        isWide ? styles["wide"] : isLarge ? styles["large"] : styles["small"]
      } ${disabled ? styles["disabled"] : null} ${
        isLeft ? styling["leftButton"] : isRight ? styling["rightButton"] : null
      } `}
    >
      {title}
    </button>
  );
};

export default Button;
