/**
 * Created by MingYin Lv on 2017/2/24 下午10:23.
 */
import Immutable from 'immutable';
import fetch from '../../../util/fetchUtil';
// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_ARTICLE_LIST = 'LOAD_ARTICLE_LIST';

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
        })
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
