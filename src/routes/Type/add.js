/**
 * Created by MingYin Lv on 2017/2/28 下午9:07.
 */

import { injectReducer } from '../../store/reducers';

export default store => ({
  path: 'add',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Add = require('./containers/AddContainer').default;
      const reducer = require('./modules/type').default;

      injectReducer(store, { key: 'type', reducer });

      cb(null, Add);
    }, 'type');
  },
});

