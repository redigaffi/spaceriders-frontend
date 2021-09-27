import { createStore } from "vuex";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = createStore({
    state() {
      return {
        jwt: false,
        address: false,
        planets: [],
        activePlanet: false,
        resourceData: false,
      };
    },
    mutations: {
      initialiseStore(state) {
        // Check if the ID exists
        if (localStorage.getItem("store")) {
          this.replaceState(
            Object.assign(state, JSON.parse(localStorage.getItem("store")))
          );
        }
      },
      login(state, payload) {
        state.jwt = payload.jwt;
        state.address = payload.address;
      },

      destroySession(state) {
        localStorage.removeItem("store");
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
        state.planets = payload;
      },

      addPlanet(state, payload) {
        state.planets.push(payload);
      },

      refreshPlanets(state) {
        state.planets = [...state.planets];
      },

      restPlanetResources(state, payload) {
        state.activePlanet.ressources.metal -= payload.metal;
        state.activePlanet.ressources.petrol -= payload.petrol;
        state.activePlanet.ressources.crystal -= payload.crystal;
      },

      /**
       * Update planet values by providing planet, field name, and value to update.
       * @param {*} state
       * @param {*} payload
       */
      updatePlanet(state, payload) {
        let planet = payload.planet;
        let pI = state.planets.findIndex((p) => p.id === planet.id);
        let p = state.planets[pI];
        p[payload.field] = payload.value;
        state.planets[pI] = p;
      },

      upgradeRessourceData(state, payload) {
        const label = payload.label;
        let resource = state.resourceData[label];
        resource.upgrading = true;
        resource.current_upgrade_time_left = payload.upgradeFinish;
        state.resourceData[label] = resource;
      },

      incrementResources(state, payload) {
        const key = payload.ressource;
        state.activePlanet.ressources[key] += payload.value;
      },
    },

    getters: {
      planets: (state) => {
        return state.planets;
      },

      resourceData: (state) => {
        return state.resourceData;
      },

      activePlanet: (state) => {
        return state.activePlanet;
      },

      address: (state) => {
        return state.address;
      },

      loggedIn: (state) => {
        return state.jwt !== false;
      },

      jwt: (state) => {
        return state.jwt;
      },
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
}
