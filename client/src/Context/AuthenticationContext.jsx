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
  const [organization, setOrganization] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        var decoded = jwt_decode(accessToken);
        const fetchedUser = await axiosInstance.get(
          `/user/authenticated/${decoded.user_id}`
        );
        let fetchedOrganization = { data: { sites: [] } };
        if (fetchedUser.data.adminOrgs.length > 0) {
          fetchedOrganization = await axiosInstance.get(
            `/user/organizations/${fetchedUser.data.adminOrgs[0].organization.id}`
          );
        } else if (fetchedUser.data.memOrgs.length > 0) {
          fetchedOrganization = await axiosInstance.get(
            `/user/organizations/${fetchedUser.data.memOrgs[0].organization.id}`
          );
        }
        console.log(fetchedOrganization.data);
        setOrganization(fetchedOrganization.data);
        console.log(fetchedUser.data);
        setUser(fetchedUser.data);
        setIsAuthenticated(true);
        setIsLoaded(true);
      } else {
        setUser({
          id: 0,
          email: "",
          nickname: "",
          role: { name: "", id: 0 },
          adminOrgs: [],
          memOrgs: [],
          organizations: [],
          team: [],
        });
        setIsAuthenticated(false);
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading</h1>
      ) : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            organization,
            setOrganization,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
