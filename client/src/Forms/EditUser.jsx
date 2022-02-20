import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import styles from "../styles/formContainer.module.css";
import styling from "../styles/formRow.module.css";
import H2 from "../components/headers/H2";
import H4 from "../components/headers/H4";
import Input from "../components/subComponents/Input";
import Button from "../components/subComponents/Button";
import FormRow from "../components/subComponents/FormRow";
import RadioButton from "../components/subComponents/RadioButton";
import MSelect from "../components/subComponents/MSelect";
import { isAdmin } from "../HOCs/AdminComponent";
import { AuthContext } from "../Context/AuthenticationContext";

// if id(props.id) is the same as user id(user.id) then:
//// request DB, if found, populate form if not navigate to users.
//// else : if admin ,request DB, if found, populate form.
// check if id exists , if not navigate to users:

const EditUser = (props) => {
  const { id } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [roleId, setRoleId] = useState("1");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [telephone, setTelephone] = useState("");
  const [emailError, setEmailError] = useState([false, ""]);
  const [nameError, setNameError] = useState([false, ""]);
  const [telephoneError, setTelephoneError] = useState([false, ""]);
  const [companyError, setCompanyError] = useState([false, ""]);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.id == id || isAdmin(user.role.name)) {
      axiosInstance
        .get(`/user/users/${id}`)
        .then((res) => {
          console.log(res.data.organizations[0].name);
          const popultedUser = res.data;
          setName(popultedUser.nickname);
          setEmail(popultedUser.email);
          setTelephone(popultedUser.telephone);
          setSelectedTeams(popultedUser.teams);
          setSelectedOrganizations(popultedUser.organizations);
          setIsLoaded(true);
        })
        .catch((err) => {});
    } else {
      navigate("/users");
    }
  }, [props.id]);

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

  const handleCompany = (e) => {
    setCompany(e.target.value);
    if (e.target.value.length === 0) {
      setCompanyError([true, "This field is Required"]);
    } else if (e.target.value.length < 3) {
      setCompanyError([true, "Company must be of 3 charaters or more."]);
    } else {
      setCompanyError([false, ""]);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value.length === 0) {
      setEmailError([true, "Email is Required"]);
    } else if (validateEmail(e.target.value) === null) {
      setEmailError([true, "Email is not Valid"]);
    } else {
      setEmailError([false, ""]);
    }
  };

  const handleTelephone = (e) => {
    setTelephone(e.target.value);
    if (e.target.value.length === 0) {
      setTelephoneError([true, "Phone Number is Required"]);
    } else if (
      e.target.value.match(/\d/g) === null ||
      e.target.value.match(/\d/g).length !== 10
    ) {
      setTelephoneError([true, "Phone Number is not Valid"]);
    } else {
      setTelephoneError([false, ""]);
    }
  };

  const handleTeams = (selected) => {
    setTeams(selected);
  };

  const handleOrganizations = (selected) => {
    setOrganizations(selected);
  };

  const handleRole = (e) => {
    setRoleId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {isLoaded && (
        <div className={styles.container}>
          <H2 style={{ fontWeight: "normal" }}>Edit User</H2>
          <form onSubmit={handleSubmit}>
            <FormRow>
              <Input
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleName}
                isLarge={false}
                className={
                  nameError[0]
                    ? "error"
                    : name.length === 0
                    ? "input"
                    : "success"
                }
              />
              <Input
                id="company"
                name="company"
                placeholder="Company"
                value={company}
                onChange={handleCompany}
                isLarge={false}
                className={
                  companyError[0]
                    ? "error"
                    : company.length === 0
                    ? "input"
                    : "success"
                }
              />
            </FormRow>
            <FormRow>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                isLarge={false}
                className={
                  emailError[0]
                    ? "error"
                    : email.length === 0
                    ? "input"
                    : "success"
                }
              />
              <Input
                id="telephone"
                name="telephone"
                placeholder="Phone Number"
                value={telephone}
                onChange={handleTelephone}
                isLarge={false}
                className={
                  telephoneError[0]
                    ? "error"
                    : telephone.length === 0
                    ? "input"
                    : "success"
                }
              />
            </FormRow>
            <FormRow></FormRow>
            <FormRow style={{ justifyContent: "start" }}>
              <H4 style={{ flex: "1" }}>Is user Super Admin?</H4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  flex: "2",
                }}
              >
                <RadioButton
                  onChange={handleRole}
                  checked={roleId === "3"}
                  value={3}
                  label="Yes"
                  name="admin"
                />
                <RadioButton
                  onChange={handleRole}
                  checked={roleId === "1"}
                  value={1}
                  label="No"
                  name="admin"
                />
              </div>
            </FormRow>
            <FormRow>
              <MSelect
                isMulti={true}
                options={teams}
                placeholder="Teams"
                getOptionLabel={(option) => option.name}
                selected={selectedTeams}
                setSelected={handleTeams}
              />
              <MSelect
                isMulti={true}
                options={organizations}
                placeholder="organizations"
                getOptionLabel={(option) => option.name}
                selected={selectedOrganizations}
                setSelected={handleOrganizations}
              />
            </FormRow>
            <FormRow style={{ justifyContent: "space-evenly" }}>
              <Button
                isLeft={true}
                className={`${styling.leftButton}`}
                style={{
                  backgroundColor: "#f6f6f6",
                  color: "#ea3c88",
                  border: " 2px solid #EA3C88",
                }}
                title="Cancel"
                isLarge={false}
                onClick={() => navigate("/users")}
              />
              <Button
                className={`${styling.rightButton}`}
                title="Save"
                isRight={true}
                isLarge={false}
                disabled={
                  false &&
                  (nameError[0] ||
                    emailError[0] ||
                    telephoneError[0] ||
                    companyError[0] ||
                    name.length === 0 ||
                    email.length === 0 ||
                    telephone.length === 0 ||
                    company.length === 0)
                }
              />
            </FormRow>
          </form>
        </div>
      )}
    </>
  );
};

export default EditUser;
