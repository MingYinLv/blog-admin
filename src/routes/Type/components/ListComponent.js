/**
 * Created by MingYin Lv on 2017/2/24 下午10:06.
 */

import React, { Component, PropTypes as T } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Table, Card } from 'antd';
const { Column } = Table;

class ListComponent extends Component {
  static propTypes = {
    dataSource: T.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      dataSource: [],
    };
  }

  componentWillMount() {
  }

  onLook = (index) => {
    return () => {
      console.log(index);
    };
  };

  renderOperate = (text, record, index) => {
    return (
      <span key={index}>
        <span onClick={this.onLook(index)}>查看</span>&nbsp;
        <span>编辑</span>&nbsp;
        <span>删除</span>
      </span>
    );
  };

  render() {
    const { dataSource } = this.props;
    return (
      <Card title="类型列表">

      </Card>
    );
  }
}

export default ListComponent;
