import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Modal } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import actions from '../../../state-management';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      loading: false,
    };
    this.showModal = this.showModal.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    this.setState({ visible: true });
  };

  onFinish = async (e) => {
    this.setState({ loading: true });
    this.props.onFinish(e);
    this.setState({ loading: false, visible: false });
  };

  handleCancel() {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (<div>
      <Button onClick={this.showModal}>
        <SettingFilled/>
      </Button>
      <Modal
        title="Change password"
        visible={visible}
        onCancel={this.handleCancel}
        width={377}
        footer={null}
      >
        <Form
          onFinish={this.onFinish}
          className='flex-direction-column flex-up'
        >
          <label className='upperLabel'>Current password</label>
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: 'Please input your current password!' }]}
          >
            <Input.Password className='formItem inputItem'/>
          </Form.Item>
          <label className='upperLabel'>New password</label>
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password className='formItem inputItem'/>
          </Form.Item>
          <label className='upperLabel'>Confirm password</label>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Please input your confirm password!' }]}
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

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { logout: actions.logout, cleanStorage: actions.cleanStorage })(ChangePassword);
