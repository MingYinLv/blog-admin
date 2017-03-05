/**
 * Created by MingYin Lv on 2017/3/5 下午9:48.
 */

import Immutable from 'immutable';
import fetch from '../../../util/fetchUtil';
// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_TYPE_LIST = 'LOAD_TYPE_LIST';

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


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_TYPE_LIST]: (state, action) => {
    return state.set('list', Immutable.fromJS(action.data));
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

