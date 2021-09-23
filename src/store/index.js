import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state() {
        return {
            jwt: false,
            address: false,
            planets: false,
            activePlanet: false,
            resourceData: false,
        }
    },
    mutations: {
        initialiseStore(state) {
            // Check if the ID exists
            if(localStorage.getItem('store')) {
                  this.replaceState(
                          Object.assign(state, JSON.parse(localStorage.getItem('store')))
                  );
            }
        },
        login(state, payload) {
            state.jwt = payload.jwt;
            state.address = payload.address;
        },

        destroySession(state) {
            localStorage.removeItem('store');
            state.jwt = false;
            state.address = false;
        },

        setActivePlanet(state, payload) {
            state.activePlanet = payload;
        },

        setResourceData(state, payload) {
            state.resourceData = payload;
        },

        setPlanets(state, payload) {
            state.planets = payload.planets
        },

        incrementResources(state, payload) {
            const key = payload.ressource;
            state.activePlanet.ressources[key] += payload.value;
        },
    },
  
    getters: {
        planets: state =>  {
            return state.planets;
        },
        
        resourceData: state => {
            return state.resourceData;
        },

        activePlanet: state => {
            return state.activePlanet;
        },

        address: state => {
          return state.address;
        },

        loggedIn: state => {
            return state.jwt !== false;
        },

        jwt: state => {
            return state.jwt;
        }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
