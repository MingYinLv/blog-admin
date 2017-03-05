/**
 * Created by MingYin Lv on 2017/2/23 下午2:02.
 */


import listRoute from './list';
import addRoute from './add';
import config from '../../util/config';

export default store => ({
  path: 'article',
  indexRoute: { onEnter: (nextState, replace) => replace(`${config.publicDir}page/article/list`) },
  childRoutes: [
    listRoute(store),
    addRoute(store),
  ],
});
