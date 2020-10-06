import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Col, Form, Input, Row,
} from 'antd';
import './styles.css';

export class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.onFinish = this.onFinish.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
    }));
  }

  onFinish(e) {
    this.props.onFinish(e);
    this.toggleLoading();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <Form
        onFinish={this.onFinish}
        className='flex-direction-column flex-up registrationElement'
      >
        <label className='loginLabel'>Sign up</label>
        <Form.Item
          name="name"
          id="Name"
          rules={[
            () => ({
              validator(rule, value) {
                if (value && value.match(/^[a-zA-Z0-9-_.]{2,20}$/g)
                  && value.indexOf(' ') === -1) {
                  return Promise.resolve();
                }
                if (value && value.trim().length !== 0) {
                  return Promise.reject('Incorrect username!');
                }
                return Promise.reject('Please enter your username!');
              },
            }),
          ]}>
          <Input
            className='loginFormItem loginInputItem'
            placeholder='Username'/>
        </Form.Item>
        <Form.Item
          name="email"
          id="Email"
          rules={[
            {
              type: 'email',
              message: 'Invalid email address entered!',
            },
            {
              required: true,
              message: 'Please enter your email!',
            },
          ]}>
          <Input
            className='loginFormItem loginInputItem'
            placeholder='Email Address'/>
        </Form.Item>
        <Form.Item
          name='password'
          id="Password"
          className="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
            () => ({
              validator(rule, value) {
                if (value.match(
                  /(?=^.*\s).*$/g,
                )) {
                  return Promise.reject('The password can\'t contain spaces');
                }
                if (!value || value.match(
                  /(?=^.{8,100}$)((?=.*\d)|(?=.*\W+))(?![.\s])(?=.*[A-Z])(?=.*[a-z]).*$/g,
                )) {
                  return Promise.resolve();
                }
                if (!value.match(
                  /(?=^.{8,}$).*$/g,
                )) {
                  return Promise.reject('The password should contain at least 8 characters');
                }
                if (value.match(
                  /(?=^.{101,}$).*$/g,
                )) {
                  return Promise.reject('The password can\'t contain more than 100 characters');
                }
                if (!value.match(
                  /(?=^.*\d).*$/g,
                )) {
                  return Promise.reject('The password should contain at least 1 digit');
                }
                if (!value.match(
                  /(?=.*[A-Z]).*$/g,
                )) {
                  return Promise.reject('The password should contain at least 1 uppercase letter');
                }
                if (!value.match(
                  /(?=.*[a-z]).*$/g,
                )) {
                  return Promise.reject('The password should contain at least 1 lowercase letter');
                }
                return Promise.reject('Incorrect password!');
              },
            }),
          ]}>
          <Input.Password
            className='loginFormItem loginInputItem'
            type='password'
            placeholder='Password'/>
        </Form.Item>
        <Form.Item
          name='confirm'
          id="Confirm"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password
            className='loginFormItem loginInputItem'
            placeholder='Password Confirmation'/>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={isLoading}
            className='loginFormItem LoginButtonItem'
          >
            Sign up now
          </Button>
        </Form.Item>
        <Row className='loginFormItem w100'>
          <Col style={{ color: '#9EA0A5' }} span={10}>Have an account?</Col>
          <Col span={10} offset={2}>
            <Link to={'login'} className="loginLink">Sign In</Link>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default RegistrationForm;
