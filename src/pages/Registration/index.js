import React from 'react';
import { connect } from 'react-redux';
import { RegistrationForm } from '../../components';
import { actions } from '../../state-management';
import { getCSR } from '../../utils/functions';
import loginWelcome from '../../assets/images/loginWelcome.svg';
import logoCol from '../../assets/images/logoCol.svg';
import './style.css';


export class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.regRequest = this.regRequest.bind(this);
  }

  replace() {
    this.props.history.replace('/');
  }

  async regRequest(regData) {
    const userData = regData;
    userData.csr = await getCSR({ username: userData.name });
    await this.props.regRequest(userData);
    this.replace();
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.replace();
    }
  }

  render() {
    return (
      <div className="login flex-direction-column flex-center">
        <div className="loginBox">
          <div className="loginBlock BGBlue">
            <img src={loginWelcome} alt="Welcome" className="Welcome"/>
          </div>
          <div className="loginBlock inputBlock">
            <img src={logoCol} alt="WodenLogo" className="WodenLogo"/>
            <RegistrationForm onFinish={this.regRequest}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn, regStatus: auth.regStatus }),
  { regRequest: actions.regRequest })(Registration);
