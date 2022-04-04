import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosArrowDown } from "react-icons/io";
import IconButton from "./Buttons/IconButton";
import { AuthContext } from "../Context/AuthenticationContext";

// Icons
import { VscSettingsGear } from "react-icons/vsc";
import { BsMegaphone } from "react-icons/bs";
import { RiGlobalLine } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";

// headers
import H4 from "./headers/H4";
import { navigate } from "@reach/router";
import axiosInstance from "../axios";

// Component
export default function BasicMenu() {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    setIsAuthenticated(false);
    setUser({
      id: 0,
      email: "",
      nickname: "",
      role: { name: "", id: 0 },
      adminOrgs: [],
      memOrgs: [],
    });
    navigate("/auth/login");
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
          onClick={() => {
            handleClose();
            navigate(`/profile/settings`);
          }}
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
          onClick={() => {
            handleClose();
            navigate(`/profile/alerts`);
          }}
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
          onClick={() => {
            handleClose();
            navigate(`/profile/sessions`);
          }}
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
          onClick={() => {
            handleClose();
            logout();
          }}
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
