import React from 'react';
import {
  Form, Input, Modal, Select,
} from 'antd';

const {Option} = Select;
export const PermissionsModal = ({
  visible, info, close, changePermissions,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const data = Object.assign(values, {hash: info.hash});
    changePermissions(data);
    close();
  };
  return (
    <Modal
      visible={visible}
      title={info.title}
      style={{padding: '16px'}}
      bodyStyle={{padding: '16px'}}
      width={364}
      okText="Confirm"
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
        initialValues={{modifier: 'public'}}
      >
        <Form.Item name="username"
                   rules={[
                     {
                       type: 'email',
                       message: 'Please enter a valid Email!',
                     },
                     {
                       required: true,
                       message: 'Please enter user\'s Email!',
                     }
                   ]}>
          <Input style={{width: 300}} placeholder="User's Email"/>
        </Form.Item>
        <Form.Item name="permissions"
                   rules={[{
                     required: true,
                     message: 'Please select permission!',
                   }]}>
          <Select
            placeholder="Access Type"
            style={{width: 300, marginTop: 20}}
          >
            {/* {info.permission === 'owner' &&
            <Option value="owner">Transfer ownership</Option>} */}
            {true && <Option value="owner">Transfer ownership</Option>}
            {/* {true && <Option value="write">Writer</Option>} */}
            {/* {true && <Opt

            +-ion value="read">Reader</Option>} */}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
