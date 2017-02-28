/**
 * Created by MingYin Lv on 2017/2/24 下午10:06.
 */

import React, { Component, PropTypes as T } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Table, Card } from 'antd';
const { Column } = Table;

class ListComponent extends Component {
  static propTypes = {
    loadArticleList: T.func.isRequired,
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
    this.props.loadArticleList();
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
      <Card title="文章列表">
        <Table
          dataSource={dataSource.toJS()}
          bordered
          rowKey="_id"
        >
          <Column
            title="标题"
            dataIndex="title"
            key="title"
          />
          <Column
            title="作者"
            dataIndex="author"
            key="author"
          />
          <Column
            title="最后更新时间"
            dataIndex="updateDate"
            key="updateDate"
          />
          <Column
            title="访问统计"
            dataIndex="accessTotal"
            key="accessTotal"
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
