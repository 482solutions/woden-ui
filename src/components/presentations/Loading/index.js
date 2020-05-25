import React from 'react';
import { Spin } from 'antd';

import './style.css';

export default ({ isFullScreen = false, text }) => (
  <div className={isFullScreen ? 'loading-full' : 'loading-min'} id="SpinLoading">
    <Spin size={isFullScreen ? 'large' : 'small'} tip={text}/>
  </div>
);
