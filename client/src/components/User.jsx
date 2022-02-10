import React, { useState } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import styles from "../styles/formContainer.module.css";
import H2 from "./headers/H2";
import H4 from "./headers/H4";
import Input from "./subComponents/Input";
import Button from "./subComponents/Button";
import FormRow from "./subComponents/FormRow";
import RadioButton from "./subComponents/RadioButton";
import MSelect from "./subComponents/MSelect";

const User = () => {
  const [roleId, setRoleId] = useState("1");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [emailError, setEmailError] = useState([false, ""]);
  const [nameError, setNameError] = useState([false, ""]);
  const [passwordError, setPasswordError] = useState([false, ""]);
  const [confirmPassError, setConfirmPassError] = useState([false, ""]);
  const [telephoneError, setTelephoneError] = useState([false, ""]);
  const [companyError, setCompanyError] = useState([false, ""]);
  const [organizations, setOrganizations] = useState([{ name: "Qudra" }]);
  const [teams, setTeams] = useState([{ name: "IT" }]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`/user/users/`, {
        email: email,
        password: password,
        nickname: name,
        telephone: telephone,
        organizations: organizations.map((item) => {
          return { name: item.name };
        }),
        teams: teams.map((item) => {
          return { name: item.name };
        }),
        role_id: parseInt(roleId),
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.includes("email")) {
          setEmailError([true, "Email already exists."]);
        } else if (err.response.data.includes("name")) {
          setNameError([true, "Name already exsits."]);
        }
      });
  };

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
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (
      e.target.value.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      setPasswordError([false, ""]);
    } else {
      setPasswordError([
        true,
        "Passowrd must be of 6 to 16 chars, must conatin at least one capital letter, one digit and one symbol",
      ]);
    }
  };
  const handleCofirm = (e) => {
    setConfirmPass(e.target.value);
    if (e.target.value === password) {
      setConfirmPassError([false, ""]);
    } else {
      setConfirmPassError([true, "Confirm Password and Password must match"]);
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

  return (
    <div className={styles.container}>
      <H2 style={{ fontWeight: "normal" }}>Add New User</H2>
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
              nameError[0] ? "error" : name.length === 0 ? "input" : "success"
            }
          />
          <label>{nameError[1]}</label>
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
              emailError[0] ? "error" : email.length === 0 ? "input" : "success"
            }
          />
          <label>{emailError[1]}</label>
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
        <FormRow>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            isLarge={false}
            className={
              passwordError[0]
                ? "error"
                : password.length === 0
                ? "input"
                : "success"
            }
          />
          <Input
            type="password"
            id="confirm"
            name="confirm"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={handleCofirm}
            isLarge={false}
            className={
              confirmPassError[0]
                ? "error"
                : confirmPass.length === 0
                ? "input"
                : "success"
            }
          />
        </FormRow>
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
            selected={teams}
            setSelected={handleTeams}
          />
          <MSelect
            isMulti={true}
            options={organizations}
            placeholder="organizations"
            getOptionLabel={(option) => option.name}
            selected={organizations}
            setSelected={handleOrganizations}
          />
        </FormRow>
        <FormRow>
          <Button
            style={{
              marginLeft: "8%",
              backgroundColor: "#f6f6f6",
              color: "#ea3c88",
              border: " 2px solid #EA3C88",
            }}
            title="Cancel"
            isLarge={false}
            onClick={() => navigate("/users")}
          />
          <Button
            style={{ marginRight: "10%" }}
            title="Save"
            isLarge={false}
            disabled={
              false &&
              (nameError[0] ||
                emailError[0] ||
                telephoneError[0] ||
                passwordError[0] ||
                companyError[0] ||
                confirmPassError[0] ||
                name.length === 0 ||
                email.length === 0 ||
                telephone.length === 0 ||
                company.length === 0 ||
                password.length === 0 ||
                confirmPass.length === 0)
            }
          />
        </FormRow>
      </form>
    </div>
  );
};

export default User;
