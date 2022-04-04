import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import H4 from "./headers/H4";
import { navigate } from "@reach/router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IconContext } from "react-icons";
import axiosInstance from "../axios";

const Dots = () => {
  return (
    <IconContext.Provider value={{ color: "#e84088" }}>
      <div>
        <BsThreeDotsVertical style={{ width: "22px", height: "22px" }} />
      </div>
    </IconContext.Provider>
  );
};

const StatisticEditingMenu = ({ onDelete, id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "14px",
        right: "-5px",
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Dots onClick={handleClick} />
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
          style={{
            height: "60px",
            width: "9vw",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => {
            handleClose();
            // navigate(`/tables/home/sites/${id}/summary`);
          }}
        >
          <H4
            style={{
              fontSize: "1.2vw",
              fontWeight: "600",
            }}
          >
            Full Screen
          </H4>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/forms/statistics/edit/${id}`);
          }}
          style={{
            height: "60px",
            width: "9vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <H4
            style={{
              fontWeight: "600",
              fontSize: "1.2vw",
            }}
          >
            Edit
          </H4>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            // navigate(`/tables/home/sites/${id}/weather`);
          }}
          style={{
            height: "60px",
            width: "9vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <H4
            style={{
              fontSize: "1.2vw",
              fontWeight: "600",
            }}
          >
            Download
          </H4>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete();
            handleClose();
            // navigate(`/tables/home/sites/${id}/meters`);
          }}
          style={{
            height: "60px",
            width: "9vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <H4
            style={{
              fontSize: "1.2vw",
              fontWeight: "600",
            }}
          >
            Delete
          </H4>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default StatisticEditingMenu;
