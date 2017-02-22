/**
 * Created by MingYin Lv on 2017/2/21 下午9:55.
 */

import React, { PropTypes as T, Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Input, Button } from 'antd';
import classes from './Login.scss';

class Login extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className={classes.wrap}>
        <img alt="我是背景" src="bg.jpg" className={classes.blur} />
        <div className={classes.mask} />
        <div className={classes.content}>
          <h1>BLOG ADMIN</h1>
          <div className={classes.row}>
            <Input placeholder="Your Name" />
          </div>
          <div className={classes.row}>
            <Input placeholder="Your Password" type="password" />
          </div>
          <div className={classes.btnGroup}>
            <Button className={classes.button} size="large">登录</Button>
          </div>
        </div>
      </div>
    );
  }

}

export default Login;
