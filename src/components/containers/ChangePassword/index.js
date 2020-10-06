import React, { Component } from 'react';
import {
  Button, Form, Input, Modal,
} from 'antd';
import settingsIcon from '../../../assets/images/settingsIcon.svg';
import './style.css';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
    };
    this.showModal = this.showModal.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    this.setState({ visible: true });
  }

  onFinish(e) {
    this.setState({ loading: true });
    this.props.onFinish(e);
    this.setState({ loading: false, visible: false });
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <div >
           <img className="settingsIcon" id="SettingsIcon" onClick={this.showModal} src={settingsIcon} alt="settings"/>
        </div>
        <Modal
          title="Change password"
          visible={visible}
          onCancel={this.handleCancel}
          width={377}
          footer={null}
          id="passwordModal"
        >
          <Form
            onFinish={this.onFinish}
            className='flex-direction-column flex-up'
            id='passwordElement'
          >
            <label className='upperLabel'>Current password</label>
            <Form.Item
              name="oldPassword"
              rules={[{ required: true, message: 'Please input your current password!' }]}
            >
               <Input.Password className='formItem inputItem newPassword'/>
            </Form.Item>
            <label className='upperLabel'>New password</label>
            <Form.Item
              name="newPassword"
              className="newPassword"
              id="NewPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input password!',
                },
                () => ({
                  validator(rule, value) {
                    if (!value || value.match(
                      /(?=^.{8,100}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g,
                    )) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Incorrect password!');
                  },
                }),
              ]}
            >
              <Input.Password className='formItem inputItem'/>
            </Form.Item>
            <label className='upperLabel'>Confirm password</label>
            <Form.Item
              name="confirmPassword"
              className="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password className='formItem inputItem'/>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                className='formItem buttonItem'
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>);
  }
}

export default ChangePassword;
