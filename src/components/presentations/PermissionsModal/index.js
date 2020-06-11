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
      onCancel={close}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onFinish(values);
          })
          .catch((e) => {
            console.log('Validate Failed:', e);
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
                     message: 'Please input your Username or Email!',
                   }]}>
          <Input style={{ width: 300, marginBottom: 20 }} placeholder='Username or Email'/>
        </Form.Item>
        <Form.Item name="permissions"
                   rules={[{
                     required: true,
                     message: 'Please select permission!',
                   }]}>
          <Select
            placeholder="Access Type"
            style={{ width: 300 }}
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

// import React, { Component } from 'react';
// import {
//   Button, Form, Input, Modal, Row, Select,
// } from 'antd';
//
// const { Option } = Select;
//
// export class PermissionsModal extends Component {
//   formRef = React.createRef();
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       selectedRole: null,
//     };
//     this.handleOk = this.handleOk.bind(this);
//     this.handleCancel = this.handleCancel.bind(this);
//   }
//
//   handleOk(data) {
//     console.log(data);
//     this.form.reset();
//     this.setState({ loading: true });
//     setTimeout(() => {
//       this.setState({ loading: false });
//     }, 3000);
//   }
//
//   handleCancel() {
//     this.setState({ selectedRole: null });
//     this.props.close();
//   }
//
//   render() {
//     const { loading, userName } = this.state;
//     const { visible, info } = this.props;
//     return (
//       <div>
//         <Modal
//           visible={visible}
//           title={info.fileName}
//           footer={null}
//         >
//           <Form
//             name="shareForm"
//             form={this.formRef}
//             onFinish={this.handleOk}
//           >
//             <Form.Item name="username"
//                        rules={[{
//                          required: true,
//                          message: 'Please input your Username or Email!',
//                        }]}>
//               <Input style={{ width: 300, marginBottom: 20 }} placeholder='Username or Email'/>
//             </Form.Item>
//
//             <Select
//               placeholder="Access Type"
//               style={{ width: 300 }}
//               onChange={(value) => {
//                 this.setState({ selectedRole: value });
//               }}
//             >
//               {/* {info.permission === 'owner' && <Option value="owner">Transfer ownership</Option>} */}
//               {true && <Option value="owner">Transfer ownership</Option>}
//             </Select>
//             <Row>
//               <Button key="back" onClick={this.handleCancel}>
//                 Cancel
//               </Button>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Submit
//                 </Button>
//               </Form.Item>
//             </Row>
//           </Form>
//         </Modal>
//       </div>
//     );
//   }
// }
