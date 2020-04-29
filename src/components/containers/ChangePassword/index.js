import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Modal } from 'antd';
import { SettingFilled } from '@ant-design/icons';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: 'Content of the modal',
      visible: true, //TODO: сменить на false после завершения модуля!
      confirmLoading: false,
      loading: false,
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    this.setState({ visible: true });
  };

  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
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
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={377}
        footer={
          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
            Save Changes
          </Button>
        }
      >
        <Form
          onFinish={this.onFinish}
          className='flex-direction-column flex-up'
        >
          <label className='upperLabel'>Current password</label>
          <Form.Item
            name="currentPassword"
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
        </Form>
      </Modal>
    </div>);
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn })
)(ChangePassword);
