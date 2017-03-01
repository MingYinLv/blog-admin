/**
 * Created by MingYin Lv on 2017/2/28 下午9:08.
 */

import React, { PropTypes, Component } from 'react';
import marked from 'marked';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Card, Form, Input, Button, Tabs, Icon } from 'antd';
import { highlightAuto } from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'github-markdown-css';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

marked.setOptions({
  highlight: (code) => {
    return `<div class="hljs">${highlightAuto(code).value}</div>`;
  },
});

class AddComponent extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      look: false,
    };
  }

  onTabsChange = (key) => {
    let look = false;
    if (key === '2') {
      look = true;
    }

    if (look !== this.state.look) {
      this.setState({
        look,
      });
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

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
          <Tabs
            defaultActiveKey="1"
            tabBarExtraContent={
              <Button><Icon type="arrows-alt" /></Button>
            }
            onChange={this.onTabsChange}
          >
            <TabPane key="1" tab={<span><Icon type="edit" />编辑内容</span>}>
              <FormItem>
                {getFieldDecorator('content', {
                  rules: [{ required: true, message: '请输入文章内容' }],
                })(
                  <Input
                    type="textarea"
                    rows={20}
                    placeholder="文章内容"
                  />,
                )}
              </FormItem>
            </TabPane>
            <TabPane key="2" tab={<span><Icon type="eye" />预览</span>}>
              <div
                className="markdown-body"
                style={{ marginBottom: '20px' }}
                dangerouslySetInnerHTML={{ __html: marked(getFieldValue('content') || '') }}
              />
            </TabPane>
          </Tabs>
          <Button>保存</Button>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(AddComponent);
