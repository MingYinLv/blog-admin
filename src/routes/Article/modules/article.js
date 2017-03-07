/**
 * Created by MingYin Lv on 2017/2/24 下午10:23.
 */
import Immutable from 'immutable';
import { notification } from 'antd';
import fetch from '../../../util/fetchUtil';

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_ARTICLE_LIST = 'LOAD_ARTICLE_LIST';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const DELETE_ARTICLE_BY_ID = 'DELETE_ARTICLE_BY_ID';

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
        })
      });
    }
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
    const index = list.findIndex((n) => {
      return n.get('_id') === action.id;
    });
    if (index >= 0) {
      list = list.remove(index);
    }
    return state.set('list', list);
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  list: [],
});

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
