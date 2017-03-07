/**
 * Created by MingYin Lv on 2017/2/24 下午10:23.
 */
import Immutable from 'immutable';
import { notification } from 'antd';
import { browserHistory } from 'react-router';
import fetch from '../../../util/fetchUtil';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_ARTICLE_LIST = 'LOAD_ARTICLE_LIST';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const DELETE_ARTICLE_BY_ID = 'DELETE_ARTICLE_BY_ID';
export const ADD_ARTICLE_BUTTON_DISABLE = 'ADD_ARTICLE_BUTTON_DISABLE';
export const ADD_ARTICLE_BUTTON_ENABLE = 'ADD_ARTICLE_BUTTON_ENABLE';

// ------------------------------------
// Actions
// ------------------------------------
export function loadArticleList() {
  return (dispatch) => {
    fetch('/article/list')
      .then((data) => {
        dispatch({
          type: LOAD_ARTICLE_LIST,
          data,
        });
      });
  };
}

export function deleteArticleById(id) {
  return (dispatch) => {
    if (id) {
      fetch('/article/delete', {
        method: 'POST',
        body: {
          id,
        },
      }).then(() => {
        dispatch({
          type: DELETE_ARTICLE_BY_ID,
          id,
        });
        notification.success({
          message: '删除成功',
          description: '删除成功',
        });
      });
    }
  };
}


export function addArticle(article) {
  return (dispatch) => {
    dispatch({
      type: ADD_ARTICLE_BUTTON_DISABLE,
    });
    fetch('/article/add', {
      method: 'POST',
      body: article,
    }).then((data) => {
      dispatch({
        type: ADD_ARTICLE,
        data,
      });
      browserHistory.push('/page/article/list');
      notification.success({
        message: '添加成功',
        description: '文章添加成功',
      });
    }).catch(() => {
      dispatch({
        type: ADD_ARTICLE_BUTTON_ENABLE,
      });
    });
  };
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_ARTICLE_LIST]: (state, action) => {
    return state.set('list', Immutable.fromJS(action.data));
  },
  [DELETE_ARTICLE_BY_ID]: (state, action) => {
    let list = state.get('list');
    // 服务端请求删除成功后，根据id查找index
    const index = list.findIndex((n) => {
      return n.get('_id') === action.id;
    });
    if (index >= 0) {
      // 如果index大于0，删除当前store中的数据
      list = list.remove(index);
    }
    return state.set('list', list);
  },
  [ADD_ARTICLE]: (state, action) => {
    const { data } = action;
    const list = state.get('list');
    return state.set('list', list.push(Immutable.fromJS(data))).set('addBtnDisable', false);
  },
  [ADD_ARTICLE_BUTTON_DISABLE]: (state) => {
    return state.set('addBtnDisable', true);
  },
  [ADD_ARTICLE_BUTTON_ENABLE]: (state) => {
    return state.set('addBtnDisable', false);
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  list: [],
  addBtnDisable: false,
});

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
