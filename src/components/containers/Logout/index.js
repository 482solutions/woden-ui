import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { actions } from '../../../state-management';

const Logout = ({ logout }) => (
  <Button
    onClick={() => {
      logout()
    }}
    className="button"
  >
    Logout
  </Button>
);

export default connect(null, { logout: actions.logout })(Logout);
