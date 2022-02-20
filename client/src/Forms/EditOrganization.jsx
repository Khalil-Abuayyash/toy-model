import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Input from "../components/subComponents/Input";
import Button from "../components/subComponents/Button";
import FormRow from "../components/subComponents/FormRow";
import styles from "../styles/formContainer.module.css";
import H2 from "../components/headers/H2";
import MSelect from "../components/subComponents/MSelect";
import moment from "moment-timezone";
import { isAdmin } from "../HOCs/AdminComponent";
import { AuthContext } from "../Context/AuthenticationContext";

const EditOrganization = (props) => {
  const { id } = props;
  const [isLodaed, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState([false, ""]);
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");

  const [timeZone, setTimeZone] = useState("");
  const [admins, setAdmins] = useState([]);
  const [disco, setDisco] = useState("");
  const [theme, setTheme] = useState("");

  const [zones] = useState(
    moment.tz.names().map((name) => ({ value: name, label: name }))
  );
  const [themes] = useState(
    ["Light", "Dark"].map((name) => ({ value: name, label: name }))
  );
  const [discos] = useState(
    ["JDECO", "QDECO"].map((name) => ({ value: name, label: name }))
  );
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (
      user.adminOrgs.filter((item) => item.organization.id === id).length ===
        1 ||
      isAdmin(user.role.name)
    ) {
      axiosInstance
        .get(`/user/organizations/${id}`)
        .then((res) => {
          console.log(res.data);
          const popultedOrg = res.data;
          setName(popultedOrg.name);
          setNote(popultedOrg.note);
          setTimeZone({
            label: popultedOrg.timezone,
            value: popultedOrg.timezone,
          });
          setDisco({
            label: popultedOrg.disco,
            value: popultedOrg.disco,
          });
          setTheme({
            label: popultedOrg.theme,
            value: popultedOrg.theme,
          });
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

  const handleNote = (e) => {
    setNote(e.target.value);
  };

  const handleTimeZone = (e) => {
    setTimeZone(e.value);
  };

  const handleDisco = (e) => {
    setDisco(e.value);
  };

  const handleTheme = (e) => {
    setTheme(e.value);
  };

  const handleAdmins = (selected) => {
    setAdmins(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {isLodaed && (
        <div className={styles.container}>
          <H2 style={{ fontWeight: "normal" }}>Edit Organization</H2>
          {/* <form onSubmit={handleSubmit}> */}
          <FormRow>
            <Input
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleName}
              isWide={true}
              className={
                nameError[0] ? "error" : name.length === 0 ? "input" : "success"
              }
            />
          </FormRow>
          <FormRow>
            <MSelect
              isMulti={false}
              options={zones}
              placeholder="TimeZone"
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              selected={timeZone}
              setSelected={handleTimeZone}
              isWide={true}
            />
          </FormRow>
          <FormRow>
            <MSelect
              isMulti={true}
              options={[{ name: "khalil abuayyash", id: 1 }]}
              placeholder="Admins"
              getOptionLabel={(option) => option.name}
              selected={admins}
              setSelected={handleAdmins}
              isWide={true}
            />
          </FormRow>
          <FormRow>
            <MSelect
              isMulti={false}
              options={discos}
              placeholder="DISCO"
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              selected={disco}
              setSelected={handleDisco}
            />
            <MSelect
              isMulti={false}
              options={themes}
              placeholder="Theme"
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              selected={theme}
              setSelected={handleTheme}
            />
          </FormRow>
          <FormRow>
            <Input
              id="note"
              name="note"
              placeholder="Note"
              value={note}
              onChange={handleNote}
              isWide={true}
              className={
                noteError[0] ? "error" : note.length === 0 ? "input" : "success"
              }
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
              onClick={() => navigate("/organizations")}
            />
            <Button
              isRight={true}
              title="Save"
              isLarge={false}
              disabled={false && (nameError[0] || name.length === 0)}
              onClick={handleSubmit}
            />
          </FormRow>
          {/* </form> */}
        </div>
      )}
    </>
  );
};

export default EditOrganization;
