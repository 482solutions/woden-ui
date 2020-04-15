import React from "react";
import { Select } from "antd";

export default ({ options }) => (
  <Select >
    {
      options.map(option => (
        <Select.Option key={option.view}
          value={option.type}>{option.view}</Select.Option>
      ))
    }
  </Select>
);
