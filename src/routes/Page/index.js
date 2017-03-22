/**
 * Created by MingYin Lv on 2017/2/21 下午10:24.
 */
import Page from './components/Page';
import ArticleRoute from '../Article';
import TypeRoute from '../Type';
import PersonRoute from '../Person';
import { createUrl } from '../../util/pathUtil';


export default store => ({
  path: 'page',
  component: Page,
  indexRoute: { onEnter: (nextState, replace) => replace(`${createUrl('page/person')}`) },
  childRoutes: [
    ArticleRoute(store),
    TypeRoute(store),
    PersonRoute(store),
  ],
});
