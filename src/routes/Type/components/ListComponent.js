/**
 * Created by MingYin Lv on 2017/2/24 下午10:06.
 */

import React, { Component, PropTypes as T } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Table, Card } from 'antd';
import { browserHistory } from 'react-router';
import { createUrl } from '../../../util/pathUtil';

const { Column } = Table;

class ListComponent extends Component {
  static propTypes = {
    dataSource: T.object.isRequired,
    loadTypeList: T.func.isRequired,
    deleteTypeById: T.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    this.props.loadTypeList();
  }

  onLook = (index) => {
    return () => {
      console.log(index);
    };
  };

  onDelete = ({ _id }) => {
    const { deleteTypeById } = this.props;
    return () => {
      deleteTypeById(_id);
    };
  };

  onEdit = ({ _id }) => {
    return () => {
      browserHistory.push(createUrl(`/page/type/edit/${_id}`));
    };
  };

  renderOperate = (text, record, index) => {
    return (
      <span key={index}>
        <a onClick={this.onLook(index)}>查看</a>&nbsp;
        <a onClick={this.onEdit(record)}>编辑</a>&nbsp;
        <a onClick={this.onDelete(record)}>删除</a>
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
