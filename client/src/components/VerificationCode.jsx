import React, { useState } from "react";
import { navigate } from "@reach/router";
import ChangePassword from "./ChangePassword";

const VerificationCode = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

  const sendCode = () => {
    // send email via get request on http://localhost:8000
    //  to recieve an email
    setIsCodeSent(true);
  };

  const checkCode = () => {
    // send code by request on .. to check if code is correct
    setIsCodeCorrect(true);
  };

  const Email = (
    <>
      <h1>Please Enter your email</h1>
      <input value={email} onChange={setEmail} name="email" id="email" />
      <button onClick={sendCode}>Send verification code</button>
    </>
  );

  const Code = (
    <>
      <h1>Please enter the Verification Code</h1>
      <input value={code} onChange={setCode} name="code" id="code" />
      <button onClick={checkCode}>Change password</button>
    </>
  );

  return (
    <div>{isCodeSent ? isCodeCorrect ? <ChangePassword /> : Code : Email}</div>
  );
};

export default VerificationCode;
