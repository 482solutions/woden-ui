import React, { Component } from "react";
import { Form, Button, Checkbox, Row, Col } from 'antd';
import './styles.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from 'antd/es/input';

class LoginForm extends Component {
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
        <label className='loginLabel'>Sign In</label>
        <Form.Item
          name="loginEmail"
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
          <Button
            type='primary'
            htmlType='submit'
            loading={isLoading}
            className='formItem buttonItem'
          >
            Continue
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
