import React from "react";
import styling from "../styles/searchInput.module.css";

const styles = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  height: "44px",
  border: "none",
  textAlign: "left",
  color: "#b9b9b9",
  fontSize: "16px",
  padding: "10px",
  paddingLeft: "30px",
  // marginRight: "40px",
  fontFamily: "Cairo",
};

const Search = ({ search, handleSearch, placeholder }) => {
  return (
    <input
      className={styling.search}
      value={search}
      onChange={handleSearch}
      placeholder={placeholder}
      type="text"
      style={styles}
    />
  );
};

export default Search;
