import React from 'react';
import {
  Form, Input, Modal, Select,
} from 'antd';

const { Option } = Select;
export const PermissionsModal = ({
  visible, info, close, changePermissions,
}) => {
  const [form] = Form.useForm();

  const onFinish = async(values) => {
    const data = Object.assign(values, { hash: info.hash });
    changePermissions(data);
    close();
  };
  return (
    <Modal
      visible={visible}
      title={info.title}
      okText="Save"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        close();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onFinish(values);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item name="username"
                   rules={[{
                     required: true,
                     type: 'email',
                     message: 'Please input your Username or Email!',
                   }]}>
          <Input style={{ width: 300 }} placeholder='Username or Email'/>
        </Form.Item>
        <Form.Item name="permissions"
                   rules={[{
                     required: true,
                     message: 'Please select permission!',
                   }]}>
          <Select
            placeholder="Access Type"
            style={{ width: 300, marginTop: 20 }}
          >
            {/* {info.permission === 'owner' &&
            <Option value="owner">Transfer ownership</Option>} */}
            {true && <Option value="owner">Transfer ownership</Option>}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
