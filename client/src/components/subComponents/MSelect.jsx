import React, { useState } from "react";
// import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import styles from "../../styles/multiSelect.module.css";

const MSelect = (props) => {
  const {
    isMulti,
    options,
    placeholder,
    getOptionLabel,
    selected,
    setSelected,
  } = props;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      marginTop: "10px",
      marginBottom: "10px",
      marginRight: "20px",
      minHeight: "64px",
      height: "64px",
      width: "372px;",
      "&:hover": { border: state.isFocused ? "2px solid #ea3c88" : null },
      border: state.isFocused ? "2px solid #ea3c88" : " 2px solid #b9b9b9",
      backgroundColor: state.isFocused ? "#ffffff" : "#ffffff",
      outlineColor: state.isFocused ? "#ea3c88" : null,
      color: state.isFocused ? "#464545" : "#b9b9b9",
      boxShadow: "none",
      textTransform: "capitalize",
      paddingLeft: "10px",
      paddingRight: "10px",
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "64px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "64px",
    }),
  };

  const handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  return (
    <Select
      getOptionLabel={getOptionLabel}
      placeholder={placeholder}
      defaultValue={selected}
      onChange={setSelected}
      options={options}
      isMulti={isMulti}
      styles={customStyles}
    />
  );
};

export default MSelect;
