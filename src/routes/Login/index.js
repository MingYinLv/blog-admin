import { injectReducer } from '../../store/reducers';

export default store => ({
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Counter = require('./containers/LoginContainer').default;
      const reducer = require('./modules/login').default;

      injectReducer(store, { key: 'counter', reducer });

      cb(null, Counter);
    }, 'login');
  },
});
