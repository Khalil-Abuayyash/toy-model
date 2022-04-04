import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import styles from "../styles/formContainer.module.css";
import styling from "../styles/formRow.module.css";
import Input from "../components/subComponents/Input";
import Button from "../components/subComponents/Button";
import FormRow from "../components/subComponents/FormRow";
import { isAdmin } from "../HOCs/AdminComponent";
import { AuthContext } from "../Context/AuthenticationContext";
import H4 from "./headers/H4";

// if id(props.id) is the same as user id(user.id) then:
//// request DB, if found, populate form if not navigate to users.
//// else : if admin ,request DB, if found, populate form.
// check if id exists , if not navigate to users:

const AccountSettings = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [telephone, setTelephone] = useState("");
  const [emailError, setEmailError] = useState([false, ""]);
  const [nameError, setNameError] = useState([false, ""]);
  const [telephoneError, setTelephoneError] = useState([false, ""]);
  const [companyError, setCompanyError] = useState([false, ""]);
  const [organizations, setOrganizations] = useState([]);
  const [teams, setTeams] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      let popultedUser = await axiosInstance.get(`/user/users/${user.id}`);
      popultedUser = popultedUser.data;
      let fetchedTeams = await axiosInstance.get(`user/teams`);
      fetchedTeams = fetchedTeams.data.results;
      let fetchedOrganizations = await axiosInstance.get(`user/organizations`);
      fetchedOrganizations = fetchedOrganizations.data.results;
      setTeams(fetchedTeams);
      setOrganizations(fetchedOrganizations);
      setName(popultedUser.nickname);
      setEmail(popultedUser.email);
      setTelephone(popultedUser.telephone);
      setIsLoaded(true);
    };

    fetchData();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`user/users/${user.id}/`, {
        email: email,
        nickname: name,
        telephone: telephone,
        removedTeams: [],
        removedOrganizations: [],
        newTeams: [],
        newOrganizations: [],
      })
      .then((res) => {
        console.log(res);
        navigate(`/tables/users`);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      {isLoaded && (
        <div className={styles.container}>
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
            <H4
              style={{
                fontWeight: "normal",
                marginTop: "1%",
                marginBottom: "0%",
                marginRight: "3%",
              }}
            >
              Organizations :
              <span style={{ color: "#e84088", fontWeight: "bold" }}>
                {` ${organizations.map((org) => org.name.toUpperCase())}`}
              </span>
            </H4>
            <H4
              style={{
                fontWeight: "normal",
                marginTop: "1%",
                marginBottom: "0%",
                marginRight: "3%",
              }}
            >
              Teams :
              <span style={{ color: "#e84088", fontWeight: "bold" }}>
                {` ${teams.map((org) => org.name.toUpperCase())}`}
              </span>
            </H4>
            <H4
              style={{
                fontWeight: "normal",
                marginTop: "1%",
                marginBottom: "0%",
                marginRight: "3%",
              }}
            >
              <span
                style={{
                  color: "#e84088",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textDecorationColor: "#e84088",
                  textDecorationStyle: "solid",
                  textDecorationThickness: "15%",
                }}
              >{`Change Password`}</span>
            </H4>
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

export default AccountSettings;
