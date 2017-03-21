/**
 * Created by MingYin Lv on 2017/3/21 下午8:51.
 */

import { injectReducer } from '../../store/reducers';

export default store => ({
  path: 'person',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Person = require('./containers/PersonContainer').default;
      const reducer = require('./modules/person').default;

      injectReducer(store, { key: 'person', reducer });

      cb(null, Person);
    }, 'person');
  },
});

