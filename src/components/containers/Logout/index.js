import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { actions } from '../../../state-management';

const Logout = ({ logout, cleanStorage }) => (
  <Button
    onClick={() => { logout(); cleanStorage() }}
    className="button"
  >
    Logout
  </Button>
);

export default connect(null, { logout: actions.logout, cleanStorage: actions.cleanStorage })(Logout);