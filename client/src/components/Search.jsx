import React from "react";

const styles = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  height: "44px",
  width: "728px",
  border: "none",
  textAlign: "left",
  color: "#b9b9b9",
  fontSize: "16px",
  padding: "10px",
  paddingLeft: "30px",
  // marginRight: "40px",
  fontFamily: "Cairo",
};

const Search = ({ search, handleSearch }) => {
  return (
    <input
      value={search}
      onChange={handleSearch}
      placeholder="Search ( ID, Name, Email, Org )"
      type="text"
      style={styles}
    />
  );
};

export default Search;
