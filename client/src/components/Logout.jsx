import React, { useContext } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import { AuthContext } from "../Context/AuthenticationContext";
// logout should render nothing, just logging out using useEffect

const Logout = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

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
    navigate("/login");
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
