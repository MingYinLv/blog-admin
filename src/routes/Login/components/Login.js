/**
 * Created by MingYin Lv on 2017/2/21 下午9:55.
 */

import React, { PropTypes as T, Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Input, Button, Form } from 'antd';
import classes from './Login.scss';

const FormItem = Form.Item;

class Login extends Component {

  static propTypes = {
    loginIn: T.func.isRequired,
    form: T.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { getFieldValue } = this.props.form;
    const { loginIn } = this.props;
    const username = getFieldValue('username');
    const password = getFieldValue('password');
    loginIn({
      username, password,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={classes.wrap}>
        <img alt="我是背景" src="bg.jpg" className={classes.blur} />
        <div className={classes.mask} />
        <div className={classes.content}>
          <Form onSubmit={this.onSubmit}>
            <h1>BLOG ADMIN</h1>
            <div className={classes.row}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '请输入用户名' },
                  ],
                })(
                  <Input placeholder="Your Name" />,
                )}
              </FormItem>
            </div>
            <div className={classes.row}>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input placeholder="Your Password" type="password" />,
                )}
              </FormItem>
            </div>
            <div className={classes.btnGroup}>
              <FormItem>
                <Button htmlType="submit" className={classes.button} size="large">登录</Button>
              </FormItem>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
