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
    loadTypeList: T.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      dataSource: [],
    };
  }

  componentWillMount() {
    this.props.loadTypeList();
  }

  onLook = (index) => {
    return () => {
      console.log(index);
    };
  };

  renderOperate = (text, record, index) => {
    return (
      <span key={index}>
        <span>编辑</span>&nbsp;
        <span>删除</span>
      </span>
    );
  };

  render() {
    const { dataSource } = this.props;
    return (
      <Card title="类型列表">
        <Table
          dataSource={dataSource.toJS()}
          bordered
          rowKey="_id"
        >
          <Column
            title="名称"
            dataIndex="name"
            key="name"
          />
          <Column
            title="操作"
            key="operate"
            render={this.renderOperate}
          />
        </Table>
      </Card>
    );
  }
}

export default ListComponent;
