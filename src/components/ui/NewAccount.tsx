import * as React from 'react';
import { Form, Input, Radio, Button, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

interface NewAccountProps extends FormComponentProps {
  dataPath: string;
}

class NewAccount extends React.Component<NewAccountProps, any> {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label='Account Name'>
          {getFieldDecorator('Account Name', {
            rules: [{required: true}]
          })(<Input placeholder='Account Name'/>)}
        </Form.Item>

        <Form.Item label='Account Type'>
          {getFieldDecorator('Account Type', {
            rules: [{required: true}]
          })(
            <Radio.Group>
              <Radio value='Fund'>Fund</Radio>
              <Radio value='Stock'>Stock</Radio>
            </Radio.Group>,
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type='primary' htmlType='submit'>
            Create Account
          </Button>
        </Form.Item>
      </Form>
    );
  }

}

export default Form.create<NewAccountProps>({ name: 'validate_other' })(NewAccount);


