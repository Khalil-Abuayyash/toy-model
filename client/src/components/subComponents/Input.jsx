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
    style,
    type = "text",
  } = props;

  // const style = {
  //   display: "flex",
  //   flexDirection: "column",
  //   // justifyContent: "center",
  //   alignItems: "start",
  //   padding: "2px",
  //   // width: "40%",
  // };

  return (
    <input
      type={type}
      className={` ${styles.default} ${styles[className]} ${
        isLarge ? styles["large"] : styles["small"]
      } `}
      placeholder={placeholder}
      onChange={onChange}
      style={style}
      id={id}
      name={name}
      value={value}
    />
    // <div style={style}>
    //   <label htmlFor={id}>{label}</label>
    //   <input
    //     id={id}
    //     name={name}
    //     value={value}
    //     onChange={onChange}
    //     type={type}
    //   />
    //   <label
    //     style={{
    //       display: visible ? visible : "none",
    //       fontSize: "10px",
    //       maxWidth: "90%",
    //     }}
    //     htmlFor={id + "Error"}
    //   >{`${name.toUpperCase()} should be of ${validationValue} CHARACTERS or More.`}</label>
    // </div>
  );
};

export default Input;
