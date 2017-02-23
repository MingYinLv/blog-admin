/**
 * Created by MingYin Lv on 2017/2/21 下午10:24.
 */
import React, { Component, PropTypes as T } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import classes from './Page.scss';
const { Content, Footer, Sider, Header } = Layout;
const SubMenu = Menu.SubMenu;

class Page extends Component {

  static propTypes = {
    children: T.node,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
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
            <Menu.Item key="1">信息管理</Menu.Item>
            <Menu.Item key="2">类型列表</Menu.Item>
            <Menu.Item key="3">文章列表</Menu.Item>
            <Menu.Item key="4">退出</Menu.Item>
          </Menu>
        </Header>
        <Content className={classes.content}>
          <Layout className={classes.center}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />信息管理</span>}>
                  <Menu.Item key="1">信息详情</Menu.Item>
                  <Menu.Item key="2">修改信息</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="laptop" />类型管理</span>}>
                  <Menu.Item key="5">类型列表</Menu.Item>
                  <Menu.Item key="6">添加类型</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="notification" />文章管理</span>}>
                  <Menu.Item key="9">文章列表</Menu.Item>
                  <Menu.Item key="10">添加文章</Menu.Item>
                </SubMenu>
              </Menu>
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
