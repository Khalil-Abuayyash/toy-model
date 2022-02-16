import React from "react";
import styles from "../../styles/input.module.css";

const Select = (props) => {
  const {
    options,
    id,
    name,
    value,
    onChange,
    placeholder,
    className,
    isLarge,
    isWide,
    style,
  } = props;
  return (
    <select
      name={name}
      style={style}
      className={` ${styles.default} ${styles.select} ${styles[className]} `}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      value={value}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
