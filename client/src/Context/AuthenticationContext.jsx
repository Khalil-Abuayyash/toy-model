import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axiosInstance from "../axios";

export const AuthContext = createContext();

export default ({ children }) => {
  //   const [user, setUser] = useState({
  //     id: 0,
  //     email: "",
  //     nickname: "",
  //     role: { name: "", id: 0 },
  //     adminOrgs: [],
  //     memOrgs: [],
  //   });
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      var decoded = jwt_decode(accessToken);
      axiosInstance
        .get(`/user/authenticated/${decoded.user_id}`)
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
          setIsLoaded(true);
        });
    } else {
      setUser({
        id: 0,
        email: "",
        nickname: "",
        role: { name: "", id: 0 },
        adminOrgs: [],
        memOrgs: [],
      });
      setIsAuthenticated(false);
      setIsLoaded(true);
    }
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading</h1>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
