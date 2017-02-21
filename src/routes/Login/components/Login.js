/**
 * Created by MingYin Lv on 2017/2/21 下午9:55.
 */

import React, { PropTypes as T, Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import {} from 'antd';
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
        <div className={classes.Header}>
          登陆
        </div>
      </div>
    );
  }

}

export default Login;
