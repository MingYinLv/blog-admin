/**
 * Created by MingYin Lv on 2017/3/21 下午8:55.
 */

import React, { PropTypes, Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Card, Form, Input, Radio, Button, Upload, Icon, message } from 'antd';
import classes from './Person.scss';
import { join } from '../../../util/pathUtil';
import config from '../../../util/config';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

function beforeUpload(file) {
  const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
  if (!isJPG) {
    message.error('只支持上传jpg和png图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片最大为2MB!');
  }
  return isJPG && isLt2M;
}

class Person extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      imageUrl: '',
    };
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      this.setState({
        imageUrl: `${config.apiAddress}${info.file.response.data.url}`,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { imageUrl } = this.state;
    const inputCol = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    return (
      <Card
        title="账户信息"
      >
        <Upload
          className={classes['avatar-uploader']}
          name="uploadFile"
          showUploadList={false}
          action={`${config.apiAddress}/upload`}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {
            imageUrl ?
              <img src={imageUrl} alt="" className={classes.avatar} /> :
              <Icon type="plus" className={classes['avatar-uploader-trigger']} />
          }
        </Upload>
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
            {getFieldDecorator('age', {
              rules: [{ required: true, message: '年龄不能为空' }],
            })(
              <Input placeholder="年龄" />,
            )}
          </FormItem>
          <FormItem
            {...inputCol}
            label="邮箱"
          >
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '邮箱不能为空' }],
            })(
              <Input placeholder="邮箱" />,
            )}
          </FormItem>
          <FormItem
            {...inputCol}
            label="公司"
          >
            {getFieldDecorator('company', {})(
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
