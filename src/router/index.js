import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import {routerArr} from './routerArr' 
Vue.use(Router)

export const router = new Router({
  routes: routerArr
})

router.beforeEach((to, from, next) => {
      iView.LoadingBar.start();
      next();
});

router.afterEach((to) => {
  iView.LoadingBar.finish();
  document.title = to.meta.title;
  let page = document.getElementById("app");
  if (page){ page.scrollTop = 0 };
});
