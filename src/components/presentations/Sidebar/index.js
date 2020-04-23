import React from "react";

import {Permissions, Stats} from "../../containers";

import './style.css';

const Sidebar = () => (
  <>
    <Stats />
    <Permissions />
  </>
);

export default Sidebar;