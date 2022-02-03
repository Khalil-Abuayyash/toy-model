import React from "react";

const DropDownMenu = (props) => {
  const { title, label } = props;
  return (
    <div>
      <label htmlFor={title}>{label}</label>
      <select id={title} name={title}>
        <option value="example"> Example</option>
        <option value="second"> 2nd Example</option>
      </select>
    </div>
  );
};

export default DropDownMenu;
