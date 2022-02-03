import React, { useEffect } from "react";
import TableHead from "./subComponents/TableHead";
import TableBody from "./subComponents/TableBody";
import TableRow from "./subComponents/TableRow";
import TableCell from "./subComponents/TableCell";
import Button from "./subComponents/Button";

const getProperty = (obj, property) => {
  let parts = property.split(".");
  if (Array.isArray(parts)) {
    while (parts.length > 0 && obj !== undefined) {
      obj = obj[parts.shift()];
    }
    return obj;
  } else {
    throw "parts is not valid array";
  }
};

const Actions = (props) => {
  return (
    <TableCell>
      <Button title="Delete" />
      <Button title="Edit" />
    </TableCell>
  );
};

const Table = ({ data, tableHeaders, tableBodies }) => {
  useEffect(() => {}, [data, tableHeaders, tableBodies]);

  return (
    <table>
      {/* Table Headers */}
      <TableHead>
        <TableRow>
          {tableHeaders.map((header, idx) => (
            <TableCell key={idx} text={header} />
          ))}
        </TableRow>
      </TableHead>

      {/* Table Body */}
      <TableBody>
        {data.map((item, idx) => (
          <TableRow key={idx}>
            <Actions />
            {tableBodies.map((cell, idx) =>
              typeof cell === "string" ? (
                <TableCell key={cell} text={getProperty(item, cell)} />
              ) : null
            )}
          </TableRow>
        ))}
      </TableBody>
    </table>
  );
};

export default Table;
