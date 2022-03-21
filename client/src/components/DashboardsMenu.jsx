import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import H4 from "./headers/H4";
import H2 from "../components/headers/H2";
import { navigate } from "@reach/router";

const DashboardsMenu = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(anchorEl);
  }, []);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <H4 style={{ paddingRight: "6px" }}>Dashboards</H4>
          <svg
            style={{ marginTop: "5px" }}
            width="12"
            height="8"
            viewBox="0 0 7.951 4.386"
          >
            <defs>
              <clipPath id="clipPath">
                <rect
                  id="Rectangle_5465"
                  dataname="Rectangle 5465"
                  width="12"
                  height="8"
                  fill="none"
                  stroke="#ea3c88"
                  strokeWidth="0.9"
                />
              </clipPath>
            </defs>
            <g
              id="Group_36327"
              dataname="Group 36327"
              transform="translate(0 0)"
            >
              <g
                id="Group_36172"
                dataname="Group 36172"
                transform="translate(0 0)"
                clipPath="url(#clip-path)"
              >
                <path
                  id="Path_1757"
                  dataname="Path 1757"
                  d="M2,2,5.568,5.571,9.136,2"
                  transform="translate(-1.592 -1.592)"
                  fill="none"
                  stroke="#464545"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0.9"
                />
              </g>
            </g>
          </svg>
        </div>
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
          style={{ height: "60px", width: "11vw" }}
          onClick={() => {
            handleClose();
            navigate(`/tables/home/sites/${id}/summary`);
          }}
        >
          <H4
            style={{
              fontSize: "1.31vw",
              fontWeight: "600",
            }}
          >
            Summary
          </H4>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/tables/home/sites/${id}/pv`);
          }}
          style={{ height: "60px", width: "11vw" }}
        >
          <H4
            style={{
              fontWeight: "600",
              fontSize: "1.31vw",
            }}
          >
            Pv System
          </H4>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/tables/home/sites/${id}/weather`);
          }}
          style={{ height: "60px", width: "11vw" }}
        >
          <H4
            style={{
              fontSize: "1.31vw",
              fontWeight: "600",
            }}
          >
            Weather Station
          </H4>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/tables/home/sites/${id}/meters`);
          }}
          style={{ height: "60px", width: "11vw" }}
        >
          <H4
            style={{
              fontSize: "1.31vw",
              fontWeight: "600",
            }}
          >
            Energy Meters
          </H4>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DashboardsMenu;
