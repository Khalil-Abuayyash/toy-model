import React from "react";

const TableCell = (props) => {
  const { text } = props;
  return (
    <td>
      {text} {props.children}
    </td>
  );
};

export default TableCell;
