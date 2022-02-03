import React from "react";

const FormTextInput = (props) => {
  const {
    id,
    name,
    value,
    onChange,
    type = "text",
    label,
    validationValue,
    visible,
  } = props;

  const style = {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "start",
    padding: "2px",
    // width: "40%",
  };

  return (
    <div style={style}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
      <label
        style={{
          display: visible ? visible : "none",
          fontSize: "10px",
          maxWidth: "90%",
        }}
        htmlFor={id + "Error"}
      >{`${name.toUpperCase()} should be of ${validationValue} CHARACTERS or More.`}</label>
    </div>
  );
};

export default FormTextInput;
