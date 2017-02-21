/**
 * Created by MingYin Lv on 2017/2/21 下午10:24.
 */
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import classes from './Page.scss';

const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Page extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  render() {
    return (
      <Layout className={classes.wrap}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span className="nav-text">用户信息</span>
                </span>
              }
            >
              <Menu.Item key="1">修改信息</Menu.Item>
              <Menu.Item key="2">退出登陆</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span className="nav-text">文章类型</span>
                </span>
              }
            >
              <Menu.Item key="4">类型列表</Menu.Item>
              <Menu.Item key="5">添加类型</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="team" />
                  <span className="nav-text">文章管理</span>
                </span>
              }
            >
              <Menu.Item key="6">文章列表</Menu.Item>
              <Menu.Item key="7">发布文章</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content className={classes.content}>
            <Breadcrumb className={classes.breadcrumb}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className={classes.main}>
              主内容区
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            MingYin Lv ©2016 Created by Ant Design
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Page;
