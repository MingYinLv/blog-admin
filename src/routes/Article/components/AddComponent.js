/**
 * Created by MingYin Lv on 2017/2/28 下午9:08.
 */

import React, { PropTypes, Component } from 'react';
import marked from 'marked';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Card, Form, Input, Button, Tabs, Icon, Select } from 'antd';
import { highlightAuto } from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'github-markdown-css';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

marked.setOptions({
  highlight: (code) => {
    return `<div class="hljs">${highlightAuto(code).value}</div>`;
  },
});

class AddComponent extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    loadTypeList: PropTypes.func.isRequired,
    addArticle: PropTypes.func.isRequired,
    typeList: PropTypes.object.isRequired,
    addBtnDisable: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    this.state = {
      look: false,
    };
  }

  componentWillMount() {
    const { loadTypeList, typeList } = this.props;
    if (typeList.size <= 0) {
      // 如果typeList没有缓存数据，则尝试从服务器加载
      loadTypeList();
    }
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

  handleSubmit = (e) => {
    e.preventDefault();

    const { validateFields, getFieldsValue } = this.props.form;
    const { addArticle } = this.props;

    let validated = true;
    validateFields((err) => {
      if (err && validated) {
        validated = false;
      }
    });

    if (validated) {
      addArticle(getFieldsValue());
    }
  };

  checkType = (rule, value, callback) => {
    if (value === '0') {
      callback('请选择类型');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { typeList, addBtnDisable } = this.props;
    const inputCol = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };

    return (
      <Card title="添加文章">
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <FormItem
            {...inputCol}
            label="文章标题"
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入文章标题' }],
            })(
              <Input placeholder="文章标题" />,
            )}
          </FormItem>
          <FormItem
            {...inputCol}
            label="文章类型"
          >
            {getFieldDecorator('type_id', {
              rules: [
                { required: true, message: '请选择类型' },
                { validator: this.checkType },
              ],
              initialValue: '0',
            })(
              <Select addonBefore="文章类型">
                <Option value="0">请选择类型</Option>
                {
                  typeList.map((n) => {
                    return <Option key={n.get('_id')}>{n.get('name')}</Option>;
                  })
                }
              </Select>,
            )}
          </FormItem>
          <FormItem
            {...inputCol}
            label="文章标签"
          >
            {getFieldDecorator('tag', {})(
              <Select
                tags
                tokenSeparators={[',']}
                placeholder="文章标签"
              />,
            )}
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
          <FormItem>
            <Button htmlType="submit" disabled={addBtnDisable}>
              {
                addBtnDisable ? '保存中...' : '保存'
              }
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(AddComponent);
