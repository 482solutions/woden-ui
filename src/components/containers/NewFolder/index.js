import React, { useState } from 'react';
import {
  Button, Form, Input, Modal, Col,
} from 'antd';
import { FolderAddTwoTone } from '@ant-design/icons';

const NewFolder = ({ onFinish: createFolder }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [setLoading] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const onFinish = (e) => {
    setLoading(true);
    createFolder(e);
    form.resetFields();
    setVisible(false);
    setLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (<div>
    <Button onClick={showModal}>
      <FolderAddTwoTone/>
      New Folder
    </Button>
    <Modal
      title="Create Folder"
      className="createFolder"
      visible={visible}
      onCancel={handleCancel}
      width={377}
      footer={null}
    >
      <Form
        onFinish={onFinish}
        form={form}
        className='flex-direction-column flex-up'
      >
        <Form.Item
          name="newFolder"
          rules={[{ required: true, message: 'Please input name for new folder' }]}
        >
          <Input className='formItem inputItem' id='FolderNameField' placeholder="Folder Name"/>
        </Form.Item>
        <Form.Item className='formItem buttonItem'>
          <div className='flex-start'>
            <Col span={1} offset={12}>
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>
            </Col>
            <Col span={1} offset={5}>
              <Button htmlType='submit' type="primary">
                Create
              </Button>
            </Col>
          </div>

        </Form.Item>
      </Form>
    </Modal>
  </div>);
};

export default NewFolder;
