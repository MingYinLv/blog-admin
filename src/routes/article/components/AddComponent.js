/**
 * Created by MingYin Lv on 2017/2/28 下午9:08.
 */

import React, { PropTypes, Component } from 'react';

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Card, Form, Input, Button, Tabs, Icon } from 'antd';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class AddComponent extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <Card title="添加文章">
        <Form className="login-form">
          <FormItem>
            <Input addonBefore="文章标题" placeholder="文章标题" />
          </FormItem>
          <FormItem>
            <Input addonBefore="文章类型" placeholder="文章类型" />
          </FormItem>
          <FormItem>
            <Input addonBefore="文章标签" placeholder="文章标签" />
          </FormItem>
          <Tabs>
            <TabPane key="1" tab={<span><Icon type="edit" />编辑内容</span>}>
              <FormItem>
                <Input type="textarea" style={{ resize: 'none' }} rows={10} placeholder="文章标签" />
              </FormItem>
            </TabPane>
            <TabPane key="2" tab={<span><Icon type="eye" />预览</span>}>
              123
            </TabPane>
          </Tabs>

        </Form>
      </Card>
    );
  }
}

export default AddComponent;
