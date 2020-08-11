import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from '../../components';
import loginWelcome from '../../assets/images/loginWelcome.svg';
import logoCol from '../../assets/images/logoCol.svg';
import { actions } from '../../state-management';
import './style.css';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.loginRequest = this.loginRequest.bind(this);
    this.replace = this.replace.bind(this);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.replace();
    }
  }

  replace() {
    this.props.history.replace('/');
  }

  async loginRequest(loginData) {
    await this.props.loginRequest(loginData);
    this.replace();
  }

  render() {
    return (
      <div className="login">
        <div className="loginBox">
          <div className="loginBlock BGBlue flex-direction-column flex-center" id='LoginImage'>
            <img src={logoCol} alt="WodenLogo" className="WodenLogo"/>
            <img src={loginWelcome} alt="Welcome" className="Welcome"/>
          </div>
          <div className="loginBlock flex-direction-column flex-center">
            <LoginForm onFinish={this.loginRequest} id="LoginForm"/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { loginRequest: actions.loginRequest })(Login);
