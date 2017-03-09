/**
 * Created by MingYin Lv on 2017/3/5 下午9:46.
 */

import Immutable from 'immutable';
import { LOAD_TYPE_LIST, DELETE_TYPE_BY_ID, ADD_TYPE } from './Type/modules/type';


const ACTION_HANDLERS = {
  [LOAD_TYPE_LIST]: (state, action) => {
    return state.set('typeList', Immutable.fromJS(action.data));
  },
  [DELETE_TYPE_BY_ID]: (state, action) => {
    let list = state.get('typeList');
    // 服务端请求删除成功后，根据id查找index
    const index = list.findIndex((n) => {
      return n.get('_id') === action.id;
    });
    if (index >= 0) {
      // 如果index大于0，删除当前store中的数据
      list = list.remove(index);
    }
    return state.set('typeList', list);
  },
  [ADD_TYPE]: (state, action) => {
    const { data } = action;
    const list = state.get('typeList');
    return state.set('typeList', list.push(Immutable.fromJS(data)));
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
