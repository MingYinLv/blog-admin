/**
 * Created by MingYin Lv on 2017/2/24 下午10:06.
 */

import React, { Component, PropTypes as T } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

class ListComponent extends Component {
  static propTypes = {
    loadArticleList: T.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    this.props.loadArticleList();
  }

  render() {
    return (
      <div>
        123
      </div>
    );
  }
}

export default ListComponent;
