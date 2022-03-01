import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Button from "./subComponents/Button";
import FormRow from "./subComponents/FormRow";
import styles from "../styles/formContainer.module.css";
import H2 from "./headers/H2";
import MSelect from "./subComponents/MSelect";
// import { AuthContext } from "../Context/AuthenticationContext";

const TeamUser = ({ id }) => {
  const [team, setTeam] = useState({ name: "" });
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      let fetchedTeam = await axiosInstance.get(`user/teams/${id}`);
      fetchedTeam = fetchedTeam.data;

      let fetchedTeamUsers = await axiosInstance.get(
        `user/users?teams__id=${id}`
      );
      fetchedTeamUsers = fetchedTeamUsers.data.results.map((user) => user.id);

      let fetchedUsers = await axiosInstance.get(`user/users`);
      fetchedUsers = fetchedUsers.data.results;

      const filteredUsers = fetchedUsers.filter(
        (user) => !fetchedTeamUsers.includes(user.id)
      );
      setTeam(fetchedTeam);
      setUsers(filteredUsers);
      setIsLoaded(true);
    };
    fetchData();
  }, [id]);

  const handleUsers = (selected) => {
    setSelectedUsers(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/user/teams/${id}/`, {
        users: selectedUsers,
      })
      .then((res) => {
        navigate(`/tables/teams/${team.id}`);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    isLoaded && (
      <div className={styles.container}>
        <H2 style={{ fontWeight: "600" }}>
          Add Users to {team.name.toUpperCase()}
        </H2>
        <FormRow>
          <MSelect
            isMulti={true}
            options={users}
            placeholder="User List"
            getOptionLabel={(option) => option.nickname}
            getOptionValue={(option) => option.id}
            selected={selectedUsers}
            setSelected={handleUsers}
            isWide={true}
          />
        </FormRow>
        <FormRow style={{ justifyContent: "space-evenly" }}>
          <Button
            isLeft={true}
            style={{
              marginLeft: "8%",
              backgroundColor: "#f6f6f6",
              color: "#ea3c88",
              border: " 2px solid #EA3C88",
            }}
            title="Cancel"
            isLarge={false}
            onClick={() => navigate(`/tables/teams/${team.id}`)}
          />
          <Button
            isRight={true}
            title="Save"
            isLarge={false}
            disabled={false}
            onClick={handleSubmit}
          />
        </FormRow>
        {/* </form> */}
      </div>
    )
  );
};

export default TeamUser;
