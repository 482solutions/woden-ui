import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button, Col, Form, Input, Row,
} from 'antd';
import './styles.css';

class RegistrationForm extends Component {
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
        className='flex-direction-column flex-up'
      >
        <label className='loginLabel'>Sign up</label>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Username can not be empty',
              whitespace: true,
            },
            {
              required: true,
              type: 'regexp',
              pattern: /^[a-zA-Z0-9-_.]{2,20}$/g,
              message: 'Incorrect Username',
            },
          ]}>
          <Input
            className='loginFormItem loginInputItem'
            placeholder='Username'/>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Invalid email address entered!',
            },
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}>
          <Input
            className='loginFormItem loginInputItem'
            placeholder='Email'/>
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input password!',
            },
            () => ({
              validator(rule, value) {
                if (!value || value.match(/(?=^.{8,100}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g)) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
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
                // eslint-disable-next-line prefer-promise-reject-errors
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
            <Link to={'login'}>Sign In</Link>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }))(RegistrationForm);
