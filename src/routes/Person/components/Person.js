/**
 * Created by MingYin Lv on 2017/3/21 下午8:55.
 */

import React, { PropTypes, Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Card, Form, Input, Radio, Button } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class Person extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const inputCol = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };

    return (
      <Card
        title="账户信息"
      >
        <Form>
          <FormItem
            {...inputCol}
            label="姓名"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '姓名' }],
            })(
              <Input placeholder="姓名" />,
            )}
          </FormItem>
          <FormItem
            {...inputCol}
            label="性别"
          >
            {getFieldDecorator('sex')(
              <RadioGroup>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
                <Radio value="未知">未知</Radio>
              </RadioGroup>,
            )}
          </FormItem>
          <FormItem
            {...inputCol}
            label="年龄"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '年龄不能为空' }],
            })(
              <Input placeholder="年龄" />,
            )}
          </FormItem>
          <FormItem
            {...inputCol}
            label="邮箱"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '邮箱不能为空' }],
            })(
              <Input placeholder="邮箱" />,
            )}
          </FormItem>
          <FormItem
            {...inputCol}
            label="公司"
          >
            {getFieldDecorator('name', {
            })(
              <Input placeholder="公司" />,
            )}
          </FormItem>
          <FormItem
            style={{ marginLeft: '17%' }}
          >
            <Button htmlType="submit">
                保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(Person);
