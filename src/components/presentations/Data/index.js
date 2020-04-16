import React from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';

import './style.css';

export default ({ type, name, selected, ...props }) => (
  <div
    className={`data transition flex-start flex-direction-column ${selected ? "selected" : ""}`}
    {...props}
  >
    <LegacyIcon className="data__icon" type={type} />
    <div className="data__text">{name}</div>
  </div>
)
