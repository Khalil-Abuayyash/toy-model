import React, { useState } from "react";

const ChangePassword = () => {
  // check if the two passes are identical
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // send a post request to change password
  };

  return (
    <div>
      <h1>Change Password</h1>
      <input
        value={password}
        onChange={setPassword}
        id="password"
        name="password"
      />
      <input
        value={confirmPassword}
        onChange={setConfirmPassword}
        id="confirmPassword"
        name="ConfirmPassword"
      />
      <button onClick={handleSubmit}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
