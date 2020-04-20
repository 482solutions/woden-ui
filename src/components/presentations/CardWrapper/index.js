import React from "react";
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Card } from "antd";

import "./style.css";

const Meta = Card.Meta;

const CardWrapper = ({ selected, children, ...props }) => (
  <Card
    className="card-wrapper"

    {...props}
  >
    <Meta
      avatar={<LegacyIcon type={selected.type} />}
      title={selected.name} />
    <hr />
    {children}
  </Card>
);

export default CardWrapper;
