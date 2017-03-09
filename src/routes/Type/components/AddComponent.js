/**
 * Created by MingYin Lv on 2017/2/28 下午9:08.
 */

import React, { PropTypes, Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Card, Form, Input, Button } from 'antd';

const FormItem = Form.Item;


class AddComponent extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    addType: PropTypes.func.isRequired,
    addBtnDisable: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      look: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { validateFields, getFieldsValue } = this.props.form;
    const { addType } = this.props;

    let validated = true;
    validateFields((err) => {
      if (err && validated) {
        validated = false;
      }
    });

    if (validated) {
      addType(getFieldsValue());
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { addBtnDisable } = this.props;
    const inputCol = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };

    return (
      <Card title="添加类型">
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <FormItem
            {...inputCol}
            label="类型名称"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入类型名称' }],
            })(
              <Input placeholder="类型名称" />,
            )}
          </FormItem>
          <FormItem
            style={{ marginLeft: '17%' }}
          >
            <Button htmlType="submit" disabled={addBtnDisable}>
              {
                addBtnDisable ? '保存中...' : '保存'
              }
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(AddComponent);
