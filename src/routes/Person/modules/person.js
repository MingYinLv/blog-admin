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

// ------------------------------------
// Actions
// ------------------------------------


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
});

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
