import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Input from "./subComponents/Input";
import Button from "./subComponents/Button";
import FormRow from "./subComponents/FormRow";
import styles from "../styles/formContainer.module.css";
import H2 from "./headers/H2";
import MSelect from "./subComponents/MSelect";
import { isAdmin } from "../HOCs/AdminComponent";
import { AuthContext } from "../Context/AuthenticationContext";

const Team = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState([false, ""]);
  const [organization, setOrganization] = useState([]);
  const [sites, setSites] = useState([]);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState([false, ""]);
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!isAdmin(user.role.name)) {
      navigate("/users");
    }
  }, [user]);

  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value.length === 0) {
      setNameError([true, "Name is Required"]);
    } else if (e.target.value.length < 3) {
      setNameError([true, "Name must be of 3 charaters or more."]);
    } else {
      setNameError([false, ""]);
    }
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    if (e.target.value.length === 0) {
      setDescriptionError([true, "Description is Required"]);
    } else if (e.target.value.length < 3) {
      setDescriptionError([
        true,
        "Description must be of 3 charaters or more.",
      ]);
    } else {
      setDescriptionError([false, ""]);
    }
  };

  const handleOrganization = (selected) => {
    setOrganization(selected);
  };

  const handleSites = (selected) => {
    setSites(selected);
  };

  const handleUsers = (selected) => {
    setUsers(selected);
  };

  const handleSubmit = () => {
    axiosInstance
      .post(`/user/teams/`, {
        name: name,
        organization_id: organization.id,
        description: description,
        sites: sites.map((item) => ({ id: item.id })),
        users: users.map((item) => ({ id: item.id })),
      })
      .then((res) => {
        navigate("/tables/teams");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className={styles.container}>
      <H2 style={{ fontWeight: "normal" }}>Add New Team</H2>
      <FormRow>
        <Input
          isWide={true}
          id="name"
          name="name"
          placeholder="Team Name"
          value={name}
          onChange={handleName}
          className={
            nameError[0] ? "error" : name.length === 0 ? "input" : "success"
          }
        />
      </FormRow>
      <FormRow>
        <MSelect
          isWide={true}
          isMulti={false}
          options={[{ name: "qudra", id: 1 }]}
          placeholder="Organization"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={organization}
          setSelected={handleOrganization}
        />
      </FormRow>
      <FormRow>
        <MSelect
          isWide={true}
          isMulti={true}
          options={[{ name: "shufat", id: 1 }]}
          placeholder="Sites"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          selected={sites}
          setSelected={handleSites}
        />
      </FormRow>
      <FormRow>
        <Input
          isWide={true}
          id="description"
          name="description"
          placeholder="Team Description"
          value={description}
          onChange={handleDescription}
          className={
            descriptionError[0]
              ? "error"
              : description.length === 0
              ? "input"
              : "success"
          }
        />
      </FormRow>
      <FormRow>
        <MSelect
          isWide={true}
          isMulti={true}
          options={[{ name: "khalil abuayyash", id: 1 }]}
          placeholder="Users List"
          getOptionLabel={(option) => option.name}
          selected={users}
          setSelected={handleUsers}
        />
      </FormRow>

      {/* Buttons START */}
      <FormRow style={{ justifyContent: "space-evenly" }}>
        <Button
          isLeft={true}
          style={{
            backgroundColor: "#f6f6f6",
            color: "#ea3c88",
            border: " 2px solid #EA3C88",
          }}
          title="Cancel"
          isLarge={false}
          onClick={() => navigate("/tables/teams")}
        />
        <Button
          isRight={true}
          title="Save"
          isLarge={false}
          disabled={false && (nameError[0] || name.length === 0)}
          onClick={handleSubmit}
        />
      </FormRow>
      {/* Buttons End */}
    </div>
  );
};

export default Team;
