import React from "react";
import TableRow from "./subComponents/TableRow";
import TableCell from "./subComponents/TableCell";
import DeleteButton from "./Buttons/DeleteButton";
import styles from "../styles/table.module.css";
import ViewButton from "./Buttons/ViewButton";
import EditButton from "./Buttons/EditButton";
import { MdLogout } from "react-icons/md";
// import AuthorizedComponent from "../HOCs/AuthorizedComponent";
import AdminComponent from "../HOCs/AdminComponent";
import IconButton from "../components/Buttons/IconButton";
import { AiOutlineEye } from "react-icons/ai";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { navigate } from "@reach/router";

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

const TicketActions = ({ isOld, toggleDone, toggleNotDone, id }) => {
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
        <IconButton
          onClick={() => navigate(`/forms/tickets/${id}`)}
          Icon={AiOutlineEye}
        />
        {isOld ? (
          <IconButton onClick={() => toggleNotDone(id)} Icon={IoCloseOutline} />
        ) : (
          <IconButton
            onClick={() => toggleDone(id)}
            Icon={IoCheckmarkOutline}
          />
        )}
      </div>
    </TableCell>
  );
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
        <ViewButton onClick={props.onView} />
        <EditButton onClick={props.onEdit} />
        <DeleteButton onClick={props.onDelete} />
      </div>
    </TableCell>
  );
};

const TeamUsersAction = (props) => {
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
        <DeleteButton onClick={props.onDelete} />
      </div>
    </TableCell>
  );
};

const SessionsActions = (props) => {
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
        <IconButton Icon={MdLogout} style={{ cursor: "auto" }} />
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
  onView,
  category,
  isOld,
  toggleDone,
  toggleNotDone,
  teamId,
  actions = true,
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
              category === "tickets" ? (
                <TicketActions
                  isOld={isOld}
                  toggleDone={toggleDone}
                  toggleNotDone={toggleNotDone}
                  id={item.id}
                />
              ) : category === "teamUsers" ? (
                <TeamUsersAction onDelete={() => onDelete(teamId, item.id)} />
              ) : category === "sessions" ? (
                <SessionsActions />
              ) : (
                <Actions
                  onDelete={() => onDelete(item.id, category)}
                  onEdit={() => onEdit(item.id)}
                  onView={() => onView(item.id)}
                />
              )
            }
          />
        </TableRow>
      ))}
      {/* </TableBody> */}
    </div>
  );
};

export default Table;
