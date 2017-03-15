/**
 * Created by MingYin Lv on 2017/3/5 下午9:48.
 */

import Immutable from 'immutable';
import { notification } from 'antd';
import { browserHistory } from 'react-router';
import fetch from '../../../util/fetchUtil';
// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_TYPE_LIST = 'LOAD_TYPE_LIST';
export const DELETE_TYPE_BY_ID = 'DELETE_TYPE_BY_ID';
export const ADD_TYPE = 'ADD_TYPE';
export const EDIT_TYPE = 'EDIT_TYPE';
export const ADD_TYPE_BUTTON_DISABLE = 'ADD_TYPE_BUTTON_DISABLE';
export const ADD_TYPE_BUTTON_ENABLE = 'ADD_TYPE_BUTTON_ENABLE';
export const FIND_TYPE_BY_ID = 'FIND_TYPE_BY_ID';

// ------------------------------------
// Actions
// ------------------------------------
export function loadTypeList() {
  return (dispatch) => {
    fetch('/type/list')
      .then((data) => {
        dispatch({
          type: LOAD_TYPE_LIST,
          data,
        });
      });
  };
}


export function findTypeById(id) {
  return (dispatch) => {
    fetch(`/type/get/${id}`).then((data) => {
      dispatch({
        type: FIND_TYPE_BY_ID,
        data,
      });
    });
  };
}

export function deleteTypeById(id) {
  return (dispatch) => {
    fetch('/type/delete', {
      method: 'POST',
      body: {
        id,
      },
    }).then(() => {
      dispatch({
        type: DELETE_TYPE_BY_ID,
        id,
      });
      notification.success({
        message: '删除成功',
        description: '删除成功',
      });
    });
  };
}

export function addType(type) {
  return (dispatch) => {
    dispatch({
      type: ADD_TYPE_BUTTON_DISABLE,
    });
    fetch('/type/add', {
      method: 'POST',
      body: type,
    }).then((data) => {
      dispatch({
        type: ADD_TYPE,
        data,
      });
      browserHistory.push('/page/type/list');
      notification.success({
        message: '添加成功',
        description: '类型添加成功',
      });
    }).catch(() => {
      dispatch({
        type: ADD_TYPE_BUTTON_ENABLE,
      });
    });
  };
}

export function editType(type) {
  return (dispatch) => {
    dispatch({
      type: ADD_TYPE_BUTTON_DISABLE,
    });
    fetch('/type/edit', {
      method: 'POST',
      body: type,
    }).then((data) => {
      dispatch({
        type: ADD_TYPE,
        data,
      });
      browserHistory.push('/page/type/list');
      notification.success({
        message: '修改成功',
        description: '类型修改成功',
      });
    }).catch(() => {
      dispatch({
        type: ADD_TYPE_BUTTON_ENABLE,
      });
    });
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_TYPE_LIST]: (state, action) => {
    return state.set('list', Immutable.fromJS(action.data));
  },
  [DELETE_TYPE_BY_ID]: (state, action) => {
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
  [ADD_TYPE_BUTTON_DISABLE]: (state) => {
    return state.set('addBtnDisable', true);
  },
  [ADD_TYPE_BUTTON_ENABLE]: (state) => {
    return state.set('addBtnDisable', false);
  },
  [ADD_TYPE]: (state, action) => {
    const { data } = action;
    const list = state.get('list');
    return state.set('list', list.push(Immutable.fromJS(data))).set('addBtnDisable', false);
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

