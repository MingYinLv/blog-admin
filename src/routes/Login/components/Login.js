/**
 * Created by MingYin Lv on 2017/2/21 下午9:55.
 */

import React, { PropTypes as T, Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Input, Button, Form } from 'antd';
import classes from './Login.scss';

class Login extends Component {

  static propTypes = {
    loginIn: T.func.isRequired,
    form: T.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  onSubmit = () => {
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
          <h1>BLOG ADMIN</h1>
          <div className={classes.row}>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input placeholder="Your Name" />,
            )}
          </div>
          <div className={classes.row}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input placeholder="Your Password" type="password" />,
            )}
          </div>
          <div className={classes.btnGroup}>
            <Button onClick={this.onSubmit} className={classes.button} size="large">登录</Button>
          </div>
        </div>
      </div>
    );
  }

}

export default Form.create()(Login);
