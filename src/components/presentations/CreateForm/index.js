import React, { Component } from "react";
import { Form, Input, Button } from 'antd';
// import '@ant-design/compatible/assets/index.css';

const FormItem = Form.Item;

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { layout = "horizontal", scheme, buttonName, className } = this.props;
    const { isLoading } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        className={className}
        layout={layout}
      >
        {
          scheme.map(field => (
            field.hasOwnProperty('className') ?
              <label
                className={field.className}
                key={field.label}>{field.label}</label> :
              <FormItem
                name={field.name}
                rules={[
                  {
                    required: field.required || false,
                    message: field.message || 'Please fill this input'
                  }
                ]}
                label={field.label}
                key={field.name}><Input/>
              </FormItem>
          ))
        }
        <FormItem
          {...layout.button}
        >
          {
            buttonName && (
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                {buttonName}
              </Button>
            )
          }

        </FormItem>
      </Form>
    )
  }
}

export default CreateForm;
