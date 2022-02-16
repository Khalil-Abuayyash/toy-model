import React, { useEffect } from "react";
import TableRow from "./subComponents/TableRow";
import TableCell from "./subComponents/TableCell";
import DeleteButton from "./Buttons/DeleteButton";
import styles from "../styles/table.module.css";
import ViewButton from "./Buttons/ViewButton";
import EditButton from "./Buttons/EditButton";

const getProperty = (obj, property) => {
  let parts = property.split(".");
  if (Array.isArray(parts)) {
    while (parts.length > 0 && obj !== undefined) {
      obj = obj[parts.shift()];
    }
    return obj;
  } else {
    throw "parts is not a valid array";
  }
};

const Actions = (props) => {
  return (
    <TableCell>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ViewButton />
        <EditButton />
        <DeleteButton onClick={props.onDelete} />
      </div>
    </TableCell>
  );
};

const Table = ({ data, tableHeaders, tableBodies, onDelete, category }) => {
  // useEffect(() => {}, [data, tableHeaders, tableBodies]);

  return (
    <div className={styles.table}>
      {/* Table Headers */}
      {/* <TableHead> */}
      <TableRow>
        {tableHeaders.map((header, idx) => (
          <TableCell key={idx} text={header} isHead={true} />
        ))}
      </TableRow>
      {/* </TableHead> */}

      {/* Table Body */}
      {/* <TableBody> */}
      {data.map((item, idx) => (
        <TableRow key={idx}>
          {tableBodies.map((cell, idx) =>
            typeof cell === "string" ? (
              <TableCell key={cell} text={getProperty(item, cell)} />
            ) : null
          )}
          <Actions onDelete={() => onDelete(item.id, category)} />
        </TableRow>
      ))}
      {/* </TableBody> */}
    </div>
  );
};

export default Table;
