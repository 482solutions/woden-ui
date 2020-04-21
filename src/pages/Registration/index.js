import React from 'react';
import { connect } from 'react-redux';
import { RegistrationForm } from "../../components";
import loginWelcome from '../../assets/images/loginWelcome.svg';
import logoCol from '../../assets/images/logoCol.svg';
import './style.css';
import { actions } from '../../state-management';

class Registration extends React.Component {
  replace = () => {
    this.props.history.replace('/');
  };
  regRequest = async (regData) => {
    await this.props.regRequest(regData);
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
            <img src={logoCol} alt="WodenLogo"/>
            <img src={loginWelcome} alt="Welcome"/>
          </div>
          <div className="loginBlock flex-direction-column flex-center">
            <RegistrationForm onFinish={this.regRequest}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { regRequest: actions.regRequest }
)(Registration);
