import React from "react";

const Button = (props) => {
  const { title, onClick } = props;
  return <button onClick={onClick}>{title}</button>;
};

export default Button;
