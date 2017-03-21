/**
 * Created by MingYin Lv on 2017/2/21 下午10:24.
 */
import Page from './components/Page';
import ArticleRoute from '../Article';
import TypeRoute from '../Type';
import PersonRoute from '../Person';


export default store => ({
  path: 'page',
  component: Page,
  childRoutes: [
    ArticleRoute(store),
    TypeRoute(store),
    PersonRoute(store),
  ],
});
