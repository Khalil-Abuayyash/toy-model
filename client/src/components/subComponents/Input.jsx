import React from "react";
import styles from "../../styles/input.module.css";

const Input = (props) => {
  const {
    id,
    name,
    value,
    onChange,
    placeholder,
    className,
    isLarge,
    isWide,
    style,
    type = "text",
    idx,
  } = props;

  return (
    <input
      idx={idx}
      type={type}
      className={` ${styles.default} ${styles[className]} ${
        isWide ? styles["wide"] : isLarge ? styles["large"] : styles["small"]
      } `}
      placeholder={placeholder}
      onChange={onChange}
      style={style}
      id={id}
      name={name}
      value={value}
    />
  );
};

export default Input;
