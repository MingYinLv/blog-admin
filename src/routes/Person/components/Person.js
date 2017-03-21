/**
 * Created by MingYin Lv on 2017/3/21 下午8:55.
 */

import React, { PropTypes, Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Card } from 'antd';

class Person extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this)
  }

  render(){
    return (
      <Card
        title="账户信息"
      >
        123
      </Card>
    );
  }
}

export default Person;
