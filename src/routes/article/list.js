/**
 * Created by MingYin Lv on 2017/2/24 下午9:57.
 */

import { injectReducer } from '../../store/reducers';

export default store => ({
  path: 'list',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const List = require('./containers/ListContainer').default;
      const reducer = require('./modules/articleList').default;

      injectReducer(store, { key: 'articleList', reducer });

      cb(null, List);

    }, 'articleList');
  },
});
