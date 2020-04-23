import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import forge from 'node-forge';
import { Form, Button, Checkbox, Row, Col, Input, message } from 'antd';
import {validationPrivateKey, validationCertificate} from '../../../utils/functions';
import { FileInMemory } from '../../presentations'
import './styles.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      certificate: "",
      privateKey: "",
      identity: "",
    };
    this.onFinish = this.onFinish.bind(this);
  }

  toggleLoading() {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading,
    }))
  };

  onFinish(e) {
    this.props.onFinish(e);
    this.toggleLoading();
  }

  beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = async e => {
      if (validationPrivateKey(e.target.result)) {
        this.setState({ privateKey: e.target.result });
        message.success('Private key was provided');
        if (!this.state.certificate) {
          message.info('Please provide your certificate');
        }
      }
      if (validationCertificate(e.target.result)) {
        const certData = (await forge.pem.decode(e.target.result))[0];
        const obj = forge.asn1.fromDer(certData.body);
        this.setState({
          certificate: e.target.result,
          identity: obj.value[0].value[5].value[3].value[0].value[1].value || ""
        });
        message.success('Certificate was provided');
        if (!this.state.privateKey) {
          message.info('Please provide your private key');
        }
      }
    };
    reader.readAsText(file);

    return false;
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Form
        onFinish={this.onFinish}
        className='flex-direction-column flex-up'
        layout={this.layout}
      >
        <label className='loginLabel'>Sign In</label>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Username can not be empty'
            }
          ]}>
          <Input
            className='formItem inputItem'
            placeholder='Username or email'/>
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Password can not be empty'
            }
          ]}>
          <Input.Password
            className='formItem inputItem'
            type='password'
            placeholder='Password'/>
        </Form.Item>
        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox className='formItem'>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <FileInMemory
            accept=".pem,.crt,.key"
            beforeUpload={this.beforeUpload}
            title="Click or drag your identity files to this area to upload"
            description="Identity should be presented via certificate and private key. Both should be in PEM format."
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{"marginTop": "70px"}}
            type='primary'
            htmlType='submit'
            loading={isLoading}
            className='formItem buttonItem'
          >
            Log In
          </Button>
        </Form.Item>
        <Link className='formItem' to={'reset'}>Forgot password</Link>
        <Row className='w100'>
          <Col span={10}>Don't have an account?</Col>
          <Col span={10} offset={2}>
            <Link to={"registration"}>Register now</Link>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn })
)(LoginForm);
