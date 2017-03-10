/**
 * Created by MingYin Lv on 2017/3/5 下午9:46.
 */

import listRoute from './list';
import addRoute from './add';
import { createUrl } from '../../util/pathUtil';

export default store => ({
  path: 'type',
  indexRoute: { onEnter: (nextState, replace) => replace(`${createUrl('page/type/list')}`) },
  childRoutes: [
    listRoute(store),
    addRoute(store),
    addRoute(store, false),
  ],
});

