import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import { navigate } from "@reach/router";
import Input from "./subComponents/Input";
import Button from "./subComponents/Button";
import FormRow from "./subComponents/FormRow";
import styles from "../styles/formContainer.module.css";
import H2 from "./headers/H2";
import MSelect from "./subComponents/MSelect";
import GoogleMap from "../components/GoogleMap";
import { isAdmin } from "../HOCs/AdminComponent";
import { AuthContext } from "../Context/AuthenticationContext";

const Site = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState([false, ""]);
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const [organization, setOrganization] = useState([]);
  const [disco, setDisco] = useState("");
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!isAdmin(user.role.name)) {
      navigate("/users");
    }
  }, [user]);

  const [discos] = useState(
    ["JDECO", "QDECO"].map((name) => ({ value: name, label: name }))
  );

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

  const handleDisco = (e) => {
    setDisco(e.value);
  };

  const handleOrganization = (selected) => {
    setOrganization(selected);
  };

  const handleSubmit = () => {
    axiosInstance
      .post(`/user/sites/`, {
        name: name,
        organization_id: organization.id,
        note: note,
        lng: lng.toFixed(2),
        lat: lat.toFixed(2),
        disco: disco,
      })
      .then((res) => {
        navigate("/tables/sites");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className={styles.container}>
      <H2 style={{ fontWeight: "normal" }}>Add New Site</H2>

      <FormRow>
        <Input
          id="name"
          name="name"
          placeholder="Site Name"
          value={name}
          onChange={handleName}
          className={
            nameError[0] ? "error" : name.length === 0 ? "input" : "success"
          }
        />
        <MSelect
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
          isMulti={false}
          options={discos}
          placeholder="DISCO"
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          selected={disco}
          setSelected={handleDisco}
          isWide={true}
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
      {/* MAP START */}
      <div style={{ width: "53vw", height: "30vh", borderRadius: "8px" }}>
        <GoogleMap
          onClick={(e) => {
            setLat(e.lat);
            setLng(e.lng);
          }}
        />
      </div>
      {/* MAP End */}

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
          onClick={() => navigate("/tables/sites")}
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

export default Site;
