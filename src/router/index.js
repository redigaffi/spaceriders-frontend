import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import Store from "../store/index";
import Vue from 'vue';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.ENV === 'testnet' ? createWebHashHistory : createWebHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  });
  
  Router.beforeEach(async (to, from, next) => {
      const loggedIn = Store.getters.loggedIn;
      const requieresAuth = to.meta.requiresAuth;
      const requiresPlanet = to.meta.requiresPlanet;
      
      const hasPlanets = Store.getters.activePlanet;

      if (loggedIn && to.name == "nouser") {
        next({name: "planet"});

      } else if (!loggedIn && requieresAuth && to.name != "nouser") {
        next({name: "nouser"});

      }else if ( (requiresPlanet && loggedIn && !hasPlanets && to.name != "planet")) {
        next({name: "planet"});
        
      } else {
        next();
      }
  
  })

  Router.afterEach(async (to, from) => {
    document.title = "SpaceRiders - " + to.meta.title; 
  })

  return Router
})
