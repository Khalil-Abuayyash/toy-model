import React from "react";
import TableRow from "./subComponents/TableRow";
import TableCell from "./subComponents/TableCell";
import DeleteButton from "./Buttons/DeleteButton";
import styles from "../styles/table.module.css";
import ViewButton from "./Buttons/ViewButton";
import EditButton from "./Buttons/EditButton";
// import AuthorizedComponent from "../HOCs/AuthorizedComponent";
import AdminComponent from "../HOCs/AdminComponent";

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
        <EditButton onClick={props.onEdit} />
        <DeleteButton onClick={props.onDelete} />
      </div>
    </TableCell>
  );
};

const Table = ({
  data,
  tableHeaders,
  tableBodies,
  onDelete,
  onEdit,
  category,
}) => {
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

      {/* <TableBody> */}
      {data.map((item, idx) => (
        <TableRow key={idx}>
          {tableBodies.map((cell, idx) =>
            typeof cell === "string" ? (
              <TableCell key={cell} text={getProperty(item, cell)} />
            ) : null
          )}
          <AdminComponent
            Component={
              <Actions
                onDelete={() => onDelete(item.id, category)}
                onEdit={() => onEdit(item.id)}
              />
            }
          />
        </TableRow>
      ))}
      {/* </TableBody> */}
    </div>
  );
};

export default Table;
