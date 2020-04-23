import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Checkbox, Row, Col, Input } from 'antd';
import './styles.css';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.onFinish = this.onFinish.bind(this);
  }

  toggleLoading = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading,
    }))
  };

  onFinish(e) {
    console.log(this.props);
    this.props.onFinish(e);
    this.toggleLoading();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <Form
        onFinish={this.onFinish}
        className='flex-direction-column flex-up'
        layout={this.layout}
      >
        <label className='loginLabel'>Sign up</label>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Username can not be empty',
              whitespace: true
            }
          ]}>
          <Input
            className='formItem inputItem'
            placeholder='Username'/>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}>
          <Input
            className='formItem inputItem'
            placeholder='Email'/>
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}>
          <Input.Password
            className='formItem inputItem'
            type='password'
            placeholder='Password'/>
        </Form.Item>
        <Form.Item
          name='confirm'
          dependencies={['password']}
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
            className='formItem inputItem'
            placeholder='Password Confirmation'/>
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) => value ? Promise.resolve() : Promise.reject(
                'Should accept agreement')
            },
          ]}
        >
          <Checkbox style={{ color: "#9EA0A5" }} className='formItem'>
            I have read the <a href="" style={{ color: "#000000", textDecoration: 'underline' }}>Terms
            and Conditions</a>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={isLoading}
            className='formItem buttonItem'
          >
            Log In
          </Button>
        </Form.Item>
        <Row className='formItem w100'>
          <Col style={{ color: "#9EA0A5" }} span={10}>Have an account?</Col>
          <Col span={10} offset={2}>
            <Link to={"login"}>Sign In</Link>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn })
)(RegistrationForm);
