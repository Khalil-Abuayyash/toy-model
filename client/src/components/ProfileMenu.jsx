import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosArrowDown } from "react-icons/io";
import IconButton from "./Buttons/IconButton";

// Icons
import { VscSettingsGear } from "react-icons/vsc";
import { BsMegaphone } from "react-icons/bs";
import { RiGlobalLine } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";

// headers
import H4 from "./headers/H4";

// Component
export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <IoIosArrowDown />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          style={{ height: "60px", width: "19.5vw" }}
          onClick={handleClose}
        >
          <IconButton Icon={VscSettingsGear} />
          <H4
            style={{
              fontSize: "1.31vw",
              fontWeight: "600",
            }}
          >
            Account Settings
          </H4>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{ height: "60px", width: "19.5vw" }}
        >
          <IconButton Icon={BsMegaphone} />
          <H4
            style={{
              fontWeight: "600",
              fontSize: "1.31vw",
            }}
          >
            My Alerts
          </H4>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{ height: "60px", width: "19.5vw" }}
        >
          <IconButton Icon={RiGlobalLine} />
          <H4
            style={{
              fontSize: "1.31vw",
              fontWeight: "600",
            }}
          >
            Profile Sessions
          </H4>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{ height: "60px", width: "19.5vw" }}
        >
          <IconButton Icon={CgLogOut} />
          <H4
            style={{
              fontSize: "1.31vw",
              fontWeight: "600",
            }}
          >
            Log Out
          </H4>
        </MenuItem>
      </Menu>
    </div>
  );
}
