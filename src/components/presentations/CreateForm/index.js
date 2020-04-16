import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class CreateForm extends Component {
  state = {
    isLoading: false,
  };

  toggleLoading = () => {
    this.setState(prevState => ({
      isLoading: !prevState.isLoading,
    }))
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, form: { validateFields, resetFields } } = this.props;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      this.toggleLoading();
      console.log(values);
      onSubmit(values);
      resetFields();
      this.toggleLoading();
    });
  };

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  render() {
    const { layout = "horizontal", scheme, buttonName, className, form: { getFieldDecorator, getFieldsError } } = this.props;
    console.log(scheme);
    const { isLoading } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        className={className}
        layout={layout}
      >
        {
          scheme.map(field => (
            <FormItem
              label={field.label}
              key={field.name}
            >
              {getFieldDecorator(field.name, {
                rules: [
                  {
                    ...field.rules
                  },
                  {
                    required: field.required || false,
                    message: field.message || 'Please fill this input',
                  }
                ],
                initialValue: field.initialValue || "",
              })(
                field.component({ disabled: isLoading, ...field.props })
              )}
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
                disabled={this.hasErrors(getFieldsError()) || isLoading}
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

export default Form.create()(CreateForm);
