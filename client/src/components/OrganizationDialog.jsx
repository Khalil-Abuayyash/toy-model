import * as React from "react";
import TableRow from "./subComponents/TableRow";
import TableCell from "./subComponents/TableCell";
import styles from "../styles/table.module.css";
import { AuthContext } from "../Context/AuthenticationContext";
import Button from "./subComponents/Button";

// Material UI
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

// Icons
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import IconButton from "./Buttons/IconButton";

export default function OrganizationDialog() {
  const [open, setOpen] = React.useState(false);
  const { user } = React.useContext(AuthContext);

  const tableHeaders = ["Organization", "Role", ""];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton Icon={HiOutlineSwitchHorizontal} onClick={handleClickOpen} />
      <Dialog
        maxWidth={false}
        onClose={handleClose}
        // aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div>
          <div className={styles.table}>
            {/* Table Headers */}
            {/* Start <TableHead> */}
            <TableRow>
              {tableHeaders.map((header, idx) => (
                <TableCell key={idx} text={header} isHead={true} />
              ))}
            </TableRow>
            {/* End </TableHead> */}

            {/* <TableBody> */}
            {user.adminOrgs.map((org, idx) => {
              return (
                <TableRow key={org.id}>
                  <TableCell
                    key={`organization`}
                    text={
                      user.organizations.filter(
                        (o) => (o.id = org.organization_id)
                      )[0].name
                    }
                  />
                  <TableCell key={`role`} text={`admin`} />
                  <TableCell key={`switch`}>
                    <Button title={`Siwtch to`} />
                  </TableCell>
                </TableRow>
              );
            })}
            {user.memOrgs.map((org, idx) => {
              return (
                <TableRow key={org.id}>
                  <TableCell key={`organization`} text={user.name} />
                  <TableCell key={`role`} text={`veiwer`} />
                  <TableCell key={`switch`}>
                    <Button />
                  </TableCell>
                </TableRow>
              );
            })}
            {/* </TableBody> */}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
