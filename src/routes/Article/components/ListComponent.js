/**
 * Created by MingYin Lv on 2017/2/24 下午10:06.
 */

import React, { Component, PropTypes as T } from 'react';
import moment from 'moment';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Table, Card } from 'antd';

const { Column } = Table;

class ListComponent extends Component {
  static propTypes = {
    loadArticleList: T.func.isRequired,
    dataSource: T.object.isRequired,
    typeList: T.object.isRequired,
    deleteArticleById: T.func.isRequired,
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
    const { loadArticleList, loadTypeList, typeList } = this.props;
    loadArticleList();
    if (typeList.size <= 0) {
      loadTypeList();
    }
  }

  onLook = (index) => {
    return () => {
      console.log(index);
    };
  };

  onDelete = ({ _id }) => {
    const { deleteArticleById } = this.props;
    return () => {
      deleteArticleById(_id);
    };
  };

  renderOperate = (text, record, index) => {
    return (
      <span key={index}>
        <a onClick={this.onLook(index)}>查看</a>&nbsp;
        <a>编辑</a>&nbsp;
        <a onClick={this.onDelete(record)}>删除</a>
      </span>
    );
  };

  render() {
    const { dataSource, typeList } = this.props;
    const typeMap = {};
    typeList.forEach((n) => {
      typeMap[n.get('_id')] = n.get('name');
    });
    const newData = dataSource.map((n) => {
      return n.set('type', typeMap[n.get('type_id')] || '未知')
        .set('updateDate', moment(n.get('updateDate'), 'x').format('YYYY-MM-DD HH:mm'));
    });

    return (
      <Card title="文章列表">
        <Table
          dataSource={newData.toJS()}
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
            title="分类"
            dataIndex="type"
            key="type"
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
