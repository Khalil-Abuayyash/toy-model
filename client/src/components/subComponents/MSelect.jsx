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
    getOptionValue,
    selected,
    setSelected,
    marginRight,
    isWide,
    isThird,
    overTable,
  } = props;

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      marginTop: "10px",
      marginBottom: "10px",
      // marginRight: marginRight ? marginRight : "20px",
      marginRight: "1vw",
      border: state.isFocused ? "2px solid #e84088" : " 2px solid #e84088",
      borderRadius: "8px",
      boxShadow: "none",
      width: isWide ? "53vw" : isThird ? "17vw" : overTable ? "13vw" : "26vw",
      opacity: 1,
      background: " #FFFFFF 0% 0%",
    }),
    control: (provided, state) => ({
      ...provided,
      minHeight: "64px",
      height: "64px",
      width: isWide ? "100%" : "100%",
      // borderRadius: "8px",
      // "&:hover": { border: state.isFocused ? "2px solid #ea3c88" : null },
      // border: state.isFocused ? "2px solid #ea3c88" : " 2px solid #b9b9b9",
      border: state.isFocused ? "none" : "none",
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      outlineColor: state.isFocused ? "#ea3c88" : null,
      // color: state.isFocused ? "#464545" : "#b9b9b9",
      color: "#e84088",
      boxShadow: "none",
      textTransform: "capitalize",
      //   paddingLeft: "10px",
      //   paddingRight: "10px",
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "#e84088" : "#e84088",
      padding: 20,
      backgroundColor: "#ffffff",
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
    placeholder: (provided, state) => ({
      ...provided,
      color: "#e84088",
      fontFamily: "Cairo",
    }),
  };

  const handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  return (
    <Select
      isClearable={false}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
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
