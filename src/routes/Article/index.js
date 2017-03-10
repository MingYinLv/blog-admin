/**
 * Created by MingYin Lv on 2017/2/23 下午2:02.
 */


import listRoute from './list';
import addRoute from './add';
import { createUrl } from '../../util/pathUtil';

export default store => ({
  path: 'article',
  indexRoute: { onEnter: (nextState, replace) => replace(`${createUrl('page/article/list')}`) },
  childRoutes: [
    listRoute(store),
    addRoute(store),
  ],
});
