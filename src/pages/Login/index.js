import React from 'react';
import { connect } from 'react-redux';
// import { Row, Col } from 'antd';
import { actions } from '../../state-management';
import { schemes } from "../../utils";
import { CreateForm } from "../../components";
import loginWelcome from '../../assets/images/loginWelcome.svg';
import logoCol from '../../assets/images/logoCol.svg';
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
        <div className="loginBox">
          <div className="loginBlock BGBlue flex-direction-column flex-center">
            <img src={loginWelcome} alt="Welcome"/>
          </div>
          <div className="loginBlock flex-direction-column flex-center">
            <img src={logoCol} alt="Welcome"/>
            <CreateForm
              layout="horizontal"
              onSubmit={this.loginRequest}
              scheme={schemes.login()}
              buttonName="Log In"
              className="flex-direction-column flex-center"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { loginRequest: actions.loginRequest }
)(Login);
