/**
 * Created by MingYin Lv on 2017/3/5 下午9:46.
 */

import Immutable from 'immutable';
import { LOAD_TYPE_LIST } from './Type/modules/type';


const ACTION_HANDLERS = {
  [LOAD_TYPE_LIST]: (state, action) => {
    return state.set('typeList', Immutable.fromJS(action.data));
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  typeList: [],
});

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
