import React from 'react';
import { connect } from 'react-redux';

import { actions } from '../../state-management';
import { schemes } from "../../utils";
import { CreateForm } from "../../components";
import './style.css';

class Login extends React.Component {
 
  replace = () => {
    this.props.history.replace('/');
  };

  loginRequest = ({ name, password }) => {
    this.props.loginRequest({ name, password });
    this.replace();
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.replace();
    }
  }

  render() {

    return (
      <div className="login flex-direction-column flex-center">
        <CreateForm
          layout="horizontal"
          onSubmit={this.loginRequest}
          scheme={schemes.login()}
          buttonName="Log In"
          className="flex-direction-column flex-center"
        />
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }), 
{ loginRequest: actions.loginRequest }
)(Login);
