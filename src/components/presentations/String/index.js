import React from "react";
import { Input } from "antd";

const String = ({ type = "text", name = "", disabled = false, placeholder = "", className = "" }) => (
  (type.toString() === "password") ? (
    <Input.Password
      type={type}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      className={className}
    />
  ) : (
    <Input
      type={type}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      className={className}
    />
  )
);

export default String;
