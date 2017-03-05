/**
 * Created by MingYin Lv on 2017/3/5 下午9:46.
 */

import listRoute from './list';
import config from '../../util/config';

export default store => ({
  path: 'type',
  indexRoute: { onEnter: (nextState, replace) => replace(`${config.publicDir}page/type/list`) },
  childRoutes: [
    listRoute(store),
  ],
});

