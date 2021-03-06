// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout';
import CounterRoute from './Counter';
import LoginRoute from './Login';
import PageRoute from './Page';
import config from '../util/config';
import { createUrl } from '../util/pathUtil';

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = store => ({
  path: config.publicDir,
  component: CoreLayout,
  indexRoute: { onEnter: (nextState, replace) => replace(`${createUrl('page')}`) },
  childRoutes: [
    CounterRoute(store),
    LoginRoute(store),
    PageRoute(store),
  ],
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes;
