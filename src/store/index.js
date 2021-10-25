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
        installationData: false,
        researchData: false,
        defenseData: false,
        timeoutIds: [],
        intervalIds: [],
        conversionRequests: [],
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

      removeConversionRequest(state, payload) {
        const conversionRequest = payload.conversionRequest;
        let index = state.conversionRequests.findIndex(cR => cR.id == conversionRequest.id);
        state.conversionRequests.splice(index, 1);
      },

      addConversionRequest(state, payload) {
        state.conversionRequests.push(payload.conversionRequest);
      },

      login(state, payload) {
        state.jwt = payload.jwt;
        state.address = payload.address;
      },

      destroySession(state) {
        localStorage.removeItem("store");
        state.jwt = false;
        state.address = false;
        state.planets = [];
        state.activePlanet = false;
        state.resourceData = false;
        state.installationData = false;
        state.researchData = false;
        state.defenseData = false;
        state.timeoutIds = [];
        state.intervalIds = [];
        state.conversionRequests = [];
      },

      setConversionRequests(state, payload) {
        state.conversionRequests = payload;
      },

      setActivePlanet(state, payload) {
        state.activePlanet = payload;
      },

      setResourceData(state, payload) {
        state.resourceData = payload;
      },

      setInstallationData(state, payload) {
        state.installationData = payload;
      },
      
      setResearchData(state, payload) {
        state.researchData = payload;
      },

      setDefenseData(state, payload) {
        state.defenseData = payload;
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

      refreshAllData(state) {
        state.resourceData = {...state.resourceData};
        state.installationData = {...state.installationData};
        state.researchData = {...state.researchData};
        state.defenseData = {...state.defenseData};
      },

      restPlanetResources(state, payload) {
        state.activePlanet.ressources.metal -= payload.metal;
        state.activePlanet.ressources.petrol -= payload.petrol;
        state.activePlanet.ressources.crystal -= payload.crystal;
      },

      addPlanetResources(state, payload) {
        state.activePlanet.ressources.metal += payload.metal;
        state.activePlanet.ressources.petrol += payload.petrol;
        state.activePlanet.ressources.crystal += payload.crystal;
      },

      addTimeoutId(state, payload) {
        state.timeoutIds.push(payload.id);
      },

      addIntervalId(state, payload) {
        state.intervalIds.push(payload.id);
      },

      clearAllIntervalTimeouts(state) {
        state.intervalIds.forEach((id) => clearInterval(id));
        state.intervalIds = [];

        state.timeoutIds.forEach((id) => clearTimeout(id));
        state.timeoutIds = [];
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

      upgradeInstallationData(state, payload) {
        const label = payload.label;
        let resource = state.installationData[label];
        resource.upgrading = true;
        resource.current_upgrade_time_left = payload.upgradeFinish;
        state.installationData[label] = resource;
      },

      upgradeResearchData(state, payload) {
        const label = payload.label;
        let resource = state.researchData[label];
        resource.upgrading = true;
        resource.current_upgrade_time_left = payload.upgradeFinish;
        state.researchData[label] = resource;
      },

      buildDefenseData(state, payload) {
        const label = payload.label;
        let resource = state.defenseData[label];
        resource.building = true;
        resource.quantity_building = payload.quantity;
        resource.current_upgrade_time_left = payload.upgradeFinish;
        state.defenseData[label] = resource;
      },

      upgradeFinished(state, payload) {
        const label = payload.label;
        let dataSource = {};
        
        let type = "";
        switch(payload.type) {
          case "resources":
            type = "infrastructure";
            dataSource = state.resourceData[label]
            break;
          case "installations":
            type = "infrastructure";
            dataSource = state.installationData[label]
            break;
          case "research":
            type = "infrastructure";
            dataSource = state.researchData[label]
            break;
          case "defense":
              type = "item";
              dataSource = state.defenseData[label]
              break;
        }
        
        if (type === "infrastructure") {
          dataSource.upgrading = false;
          dataSource.level = dataSource.level+1;
          dataSource.current_upgrade_time_left = false;

        } else if (type === "item") {
          dataSource.building = false;
          dataSource.available += dataSource.quantity_building;
          dataSource.current_upgrade_time_left = false;
        }
        
        switch(payload.type) {
          case "resources":
            state.resourceData[label] = dataSource;
            break;
          case "installations":
            state.installationData[label] = dataSource;
            break;
          case "research":
            state.researchData[label] = dataSource;
            break;
          case "defense":
            state.defenseData[label] = dataSource;
            break;
        }
        
      },

      incrementResources(state, payload) {
        const key = payload.ressource;
        state.activePlanet.ressources[key] += payload.value;
      },
    },

    getters: {
      conversionRequests: (state) => {
        return state.conversionRequests;
      },

      planets: (state) => {
        return state.planets;
      },

      resourceData: (state) => {
        return state.resourceData;
      },
      
      installationData: (state) => {
        return state.installationData;
      },

      researchData: (state) => {
        return state.researchData;
      },
      
      defenseData: (state) => {
        return state.defenseData;
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
