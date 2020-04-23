import React from "react";
import { Input } from "antd";

const defaultProps = {
  type: "text",
  disabled: false,
  name: ""
};

const String = ({ type = "text", name = "", disabled = false } = defaultProps) => (
  <Input
    type={type}
    name={name}
    disabled={disabled}
  />
);

export default String;