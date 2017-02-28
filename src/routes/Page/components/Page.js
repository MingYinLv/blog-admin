/**
 * Created by MingYin Lv on 2017/2/21 下午10:24.
 */
import React, { Component, PropTypes as T } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Link } from 'react-router';
import config from '../../../util/config';
import classes from './Page.scss';
const { Content, Footer, Sider, Header } = Layout;
const SubMenu = Menu.SubMenu;

const menuConfig = [{
  title: '信息管理',
  icon: 'user',
  key: 'sub1',
  child: [{
    title: '信息详情',
    key: '1',
    url: `${config.publicDir}page/person/list`,
  }, {
    title: '修改信息',
    key: '2',
    url: `${config.publicDir}page/person/edit`,
  }],
}, {
  title: '类型管理',
  icon: 'laptop',
  key: 'sub2',
  child: [{
    title: '类型列表',
    key: '11',
    url: `${config.publicDir}page/type/list`,
  }, {
    title: '添加类型',
    key: '12',
    url: `${config.publicDir}page/type/add`,
  }],
}, {
  title: '文章管理',
  icon: 'notification',
  key: 'sub3',
  child: [{
    title: '文章列表',
    key: '21',
    url: `${config.publicDir}page/article/list`,
  }, {
    title: '添加文章',
    key: '22',
    url: `${config.publicDir}page/article/add`,
  }],
}];

class Page extends Component {

  static propTypes = {
    children: T.node,
    location: T.object,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    let defaultSelectKey = 0;
    let defaultOpenKey = 0;
    this.menu = menuConfig.map((n) => {
      return (
        <SubMenu key={n.key} title={<span><Icon type={n.icon} />{n.title}</span>}>
          {
            n.child.map((m) => {
              if (m.url === props.location.pathname) {
                defaultSelectKey = m.key;
                defaultOpenKey = n.key;
              }
              return <Menu.Item key={m.key}><Link to={m.url}>{m.title}</Link></Menu.Item>;
            })
          }
        </SubMenu>
      );
    });
    this.menu = (
      <Menu
        mode="inline"
        defaultSelectedKeys={[defaultSelectKey]}
        defaultOpenKeys={[defaultOpenKey]}
        style={{ height: '100%' }}
      >
        {this.menu}
      </Menu>
    );
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header className="header">
          <div className={classes.logo} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to={`${config.publicDir}article`}>信息管理</Link></Menu.Item>
            <Menu.Item key="2">类型列表</Menu.Item>
            <Menu.Item key="3">文章列表</Menu.Item>
            <Menu.Item key="4">退出</Menu.Item>
          </Menu>
        </Header>
        <Content className={classes.content}>
          <Layout className={classes.center}>
            <Sider width={200} style={{ background: '#fff' }}>
              {this.menu}
            </Sider>
            <Content className={classes.main}>
              {this.props.children}
            </Content>
          </Layout>
        </Content>
        <Footer className={classes.footer}>
          MingYin Lv ©2016 Created by Ant Design
        </Footer>
      </Layout>
    );
  }
}

export default Page;
