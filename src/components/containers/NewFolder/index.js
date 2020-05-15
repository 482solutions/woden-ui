import React, { Component } from 'react';
import {
  Button, Form, Input, Modal, Col,
} from 'antd';
import { FolderAddTwoTone } from '@ant-design/icons';

class NewFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return (<div>
      <Button onClick={this.showModal}>
        <FolderAddTwoTone/>
        New Folder
      </Button>
      <Modal
        title="Create Folder"
        visible={visible}
        onCancel={this.handleCancel}
        width={377}
        footer={null}
      >
        <Form
          onFinish={this.onFinish}
          className='flex-direction-column flex-up'
        >
          <Form.Item
            name="newFolder"
            rules={[{ required: true, message: 'Please input name for new folder' }]}
          >
            <Input className='formItem inputItem' placeholder="Folder Name"/>
          </Form.Item>
          <Form.Item className='formItem buttonItem flex-'>
            <div className='flex-start'>
              <Col span={1} offset={12}>
                <Button key="back" onClick={this.handleCancel}>
                  Cancel
                </Button>
              </Col>
              <Col span={1} offset={5}>
                <Button htmlType='submit' type="primary" loading={loading}>
                  Create
                </Button>
              </Col>
            </div>

          </Form.Item>
        </Form>
      </Modal>
    </div>);
  }
}

export default NewFolder;
