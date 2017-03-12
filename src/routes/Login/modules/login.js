/**
 * Created by MingYin Lv on 2017/2/21 下午9:55.
 */
import Immutable from 'immutable';
import crypto from 'crypto';
import { browserHistory } from 'react-router';
import { notification } from 'antd';
import fetch from '../../../util/fetchUtil';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_IN = 'LOGIN_IN';
export const LOGIN_TRUE = 'LOGIN_TRUE';
export const LOGIN_FALSE = 'LOGIN_FALSE';

// ------------------------------------
// Actions
// ------------------------------------

export function loginIn({ username, password }) {
  return (dispatch) => {
    const md5 = crypto.createHash('md5');
    md5.update(password);
    fetch('/person/login', {
      method: 'POST',
      body: {
        username,
        password: md5.digest('hex'),
      },
    }).then(() => {
      dispatch({
        type: LOGIN_IN,
        username,
      });
      notification.success({
        message: '登陆成功',
        description: '登陆成功',
      });
      browserHistory.push('/page/article/list');
    });
  };
}

export function checkLogin() {
  return (dispatch) => {
    fetch('/person/check').then(() => {
      dispatch({
        type: LOGIN_TRUE,
      });
    }).catch(() => {
      dispatch({
        type: LOGIN_FALSE,
      });
      browserHistory.push('/');
    });
  };
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_IN]: (state, action) => {
    return state.set('username', action.username);
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  username: '',
});

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
