/**
 * Created by MingYin Lv on 2017/2/28 下午9:07.
 */

import { injectReducer } from '../../store/reducers';

export default (store, add = true) => ({
  path: add ? 'add' : 'edit/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Add = require('./containers/AddContainer').default;
      const reducer = require('./modules/article').default;

      injectReducer(store, { key: 'article', reducer });

      cb(null, Add);

    }, 'article');
  },
});

