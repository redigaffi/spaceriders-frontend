import { createStore } from "vuex";
import { releaseDate } from "src/constants/Shared";
import { ref } from "vue";
// import example from './module-example'

const Store = createStore({
  state() {
    return {
      intervals: {
        updateIntervalId: false,
        energyTimerId: false,
        metalTimerId: false,
        crystalTimerId: false,
        petrolTimerId: false,
      },
      chainInfo: false,
      tokenPrice: false,
      jwt: false,
      address: false,
      provider: false,
      planets: [],
      activePlanet: false,
      resourceData: false,
      installationData: false,
      researchData: false,
      defenseData: false,
      buildingQueue: { items: [] },
      emails: [],
      tabPanel: "inbox",
      drawerLeft: false,
      drawerRight: false,
      profileModal: false,
      dateNow: 0,
      accountInfo: {},
      settings: {
        showMusicPlayer: true,
        autoplayMusic: true,
        audibleNotifications: true,
        musicVolume: 100,
      },
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
    setChainInfo(state, payload) {
      state.chainInfo = payload.chainInfo;
    },
    setEnergyTimerId(state, payload) {
      state.intervals.energyTimerId = payload;
    },
    setUpdateIntervalId(state, payload) {
      state.intervals.updateIntervalId = payload.updateIntervalId;
    },

    setTokenPrice(state, payload) {
      state.tokenPrice = payload.tokenPrice;
    },

    setTabPanel(state, payload) {
      state.tabPanel = payload;
    },

    setDrawerLeft(state, payload) {
      state.drawerLeft = payload;
    },

    setDrawerRight(state, payload) {
      state.drawerRight = payload;
    },

    setProfileModal(state, payload) {
      state.profileModal = payload;
    },

    setShowMusicPlayer(state, payload) {
      state.settings.showMusicPlayer = payload;
    },

    setAutoplayMusic(state, payload) {
      state.settings.autoplayMusic = payload;
    },

    setAudibleNotifications(state, payload) {
      state.settings.audibleNotifications = payload;
    },

    setMusicVolume(state, payload) {
      state.settings.musicVolume = payload;
    },

    setAccountInfo(state, info) {
      state.accountInfo = info;
    },

    addEmails(state, payload) {
      state.emails = payload.emails;
    },

    updateEmail(state, payload) {
      let email = payload.email;
      let eI = state.emails.findIndex((e) => e.id === email.id);
      state.emails[eI] = email;
    },

    deleteEmail(state, payload) {
      let email = payload.email;
      let eI = state.emails.findIndex((e) => e.id === email.id);
      state.emails.splice(eI, 1);
    },

    deleteAllEmails(state) {
      state.emails = [];
    },

    login(state, payload) {
      state.jwt = payload.jwt;
      state.address = payload.address;
      state.provider = payload.provider;
    },

    destroySession(state) {
      localStorage.removeItem("store");
      clearInterval(state.intervals.updateIntervalId);
      state.intervals.updateIntervalId = false;
      clearInterval(state.intervals.energyTimerId);
      state.intervals.energyTimerId = false;
      clearInterval(state.intervals.metalTimerId);
      state.intervals.metalTimerId = false;
      clearInterval(state.intervals.crystalTimerId);
      state.intervals.crystalTimerId = false;
      clearInterval(state.intervals.petrolTimerId);
      state.intervals.petrolTimerId = false;
      state.jwt = false;
      state.address = false;
      state.planets = [];
      state.activePlanet = false;
      state.resourceData = false;
      state.installationData = false;
      state.researchData = false;
      state.defenseData = false;
      state.emails = [];
    },

    setActivePlanet(state, payload) {
      state.activePlanet = payload;
    },

    setBuildingQueue(state, payload) {
      state.buildingQueue = payload;
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
      state.activePlanet.defense_items = {
        ...state.activePlanet.defense_items,
      };
      state.activePlanet.installation_level = {
        ...state.activePlanet.installation_level,
      };
      state.activePlanet.research_level = {
        ...state.activePlanet.research_level,
      };
      state.activePlanet.resources_level = {
        ...state.activePlanet.resources_level,
      };

      state.resourceData = { ...state.resourceData };
      state.installationData = { ...state.installationData };
      state.researchData = { ...state.researchData };
      state.defenseData = { ...state.defenseData };
      state.buildingQueue.items = [...state.buildingQueue.items];
    },

    restPlanetResources(state, payload) {
      state.activePlanet.resources.metal -= payload.metal;
      state.activePlanet.resources.petrol -= payload.petrol;
      state.activePlanet.resources.crystal -= payload.crystal;
    },

    addPlanetResources(state, payload) {
      state.activePlanet.resources.metal += payload.metal;
      state.activePlanet.resources.petrol += payload.petrol;
      state.activePlanet.resources.crystal += payload.crystal;
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

    /**
     * Update active planet
     * @param {*} state
     * @param {*} payload
     */
    updateActivePlanet(state, payload) {
      state.activePlanet = payload.planet;
    },

    upgradeResourceData(state, payload) {
      const label = payload.label;
      let resource = state.resourceData[label];
      resource.building = true;
      resource.finish = payload.upgradeFinish;
      state.resourceData[label] = resource;

      // @TODO: fix this
      //const building = state.activePlanet.resources_level.filter(r => r.label===label)[0];
      //building.building = true;
      //building.finish = payload.upgradeFinish;
    },
    repairResourceData(state, payload) {
      const label = payload.label;
      let resource = state.resourceData[label];

      resource.repairing = true;
      resource.current_repair_time_left = payload.finish;
      resource.finish = payload.finish;

      state.resourceData[label] = resource;
    },
    upgradeInstallationData(state, payload) {
      const label = payload.label;
      let resource = state.installationData[label];
      resource.building = true;
      resource.finish = payload.upgradeFinish;
      state.installationData[label] = resource;
    },

    upgradeResearchData(state, payload) {
      const label = payload.label;
      let resource = state.researchData[label];
      resource.building = true;
      resource.finish = payload.upgradeFinish;
      state.researchData[label] = resource;
    },

    buildDefenseData(state, payload) {
      const label = payload.label;
      let resource = state.defenseData[label];
      resource.building = true;
      resource.quantity_building = payload.quantity;
      resource.finish = payload.upgradeFinish;
      state.defenseData[label] = resource;
    },

    repairFinished(state, payload) {
      const label = payload.label;
      let dataSource = state.resourceData[label];
      const level = dataSource.level;

      dataSource.repairing = false;
      dataSource.health = dataSource["upgrades"][level].health;
      dataSource.finish = false;

      state.resourceData[label] = dataSource;
      state.buildingQueue.items.shift();
    },

    upgradeFinished(state, payload) {
      const label = payload.label;
      let dataSource = {};

      let type = "";
      switch (payload.type) {
        case "resources":
          type = "mines";
          dataSource = state.resourceData[label];
          break;
        case "installations":
          type = "infrastructure";
          dataSource = state.installationData[label];
          break;
        case "research":
          type = "infrastructure";
          dataSource = state.researchData[label];
          break;
        case "defense":
          type = "item";
          dataSource = state.defenseData[label];
          break;
      }

      if (type === "mines") {
        dataSource.building = false;
        dataSource.level = dataSource.level + 1;
        dataSource.finish = false;
        dataSource.health = dataSource.upgrades[dataSource.level].health;
      } else if (type === "infrastructure") {
        dataSource.building = false;
        dataSource.level = dataSource.level + 1;
        dataSource.finish = false;
      } else if (type === "item") {
        dataSource.building = false;
        dataSource.available += dataSource.quantity_building;
        dataSource.finish = false;
      }

      switch (payload.type) {
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

      state.buildingQueue.items.shift();
    },

    claimPendingLvlUp(state, payload) {
      state.activePlanet.pending_levelup_reward[payload.idx].completed = true;
    },

    incrementResources(state, payload) {
      const key = payload.resource;
      state.activePlanet.resources[key] += payload.value;
    },

    incrementEnergy(state, payload) {
      state.activePlanet.resources.energy += payload.energy;
    },

    incrementBkm(state, payload) {
      state.activePlanet.resources.bkm += payload.bkm;
    },

    decrementBkm(state, payload) {
      state.activePlanet.resources.bkm -= payload.bkm;
    },

    decrementEnergy(state, payload) {
      state.activePlanet.resources.energy -= payload.energy;
    },

    increaseTimeCount(state) {
      state.dateNow += 1000;
    },

    setTimeCount(state) {
      state.dateNow = new Date().getTime();
    },

    markPlanet(state, payload) {
      let planet = payload.planet;
      let p;

      if (!payload.active) {
        let pI = state.planets.findIndex((p) => p.id === planet.id);
        p = state.planets[pI];
        p["is_favourite"] = !p["is_favourite"];
        state.planets[pI] = p;
      } else {
        p = state.activePlanet;
        p["is_favourite"] = !p["is_favourite"];
        state.activePlanet = p;
      }
    },

    appendBuildingQueue(state, payload) {
      state.buildingQueue.items.push(payload);
    },
  },

  getters: {
    provider: (state) => {
      return state.provider;
    },
    energyTimerId: (state) => {
      return state.intervals.energyTimerId;
    },
    metalTimerId: (state) => {
      return state.intervals.metalTimerId;
    },
    crystalTimerId: (state) => {
      return state.intervals.crystalTimerId;
    },
    petrolTimerId: (state) => {
      return state.intervals.petrolTimerId;
    },
    updateIntervalId: (state) => {
      return state.intervals.updateIntervalId;
    },

    chainInfo: (state) => {
      return state.chainInfo;
    },

    tokenPrice: (state) => {
      return state.tokenPrice;
    },

    emails: (state) => {
      return state.emails;
    },

    planets: (state) => {
      return state.planets;
    },

    buildingQueue: (state) => {
      return state.buildingQueue;
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

    tabPanel: (state) => {
      return state.tabPanel;
    },

    drawerLeft: (state) => {
      return state.drawerLeft;
    },

    drawerRight: (state) => {
      return state.drawerRight;
    },

    profileModal: (state) => {
      return state.profileModal;
    },

    address: (state) => {
      return state.address;
    },

    loggedIn: (state) => {
      return state.jwt !== false;
    },

    dateNow: (state) => {
      return state.dateNow;
    },

    isReleaseTime: (state) => {
      return releaseDate - state.dateNow <= 0;
    },

    accountInfo: (state) => {
      return state.accountInfo;
    },

    showMusicPlayer: (state) => {
      return state.settings.showMusicPlayer;
    },

    autoplayMusic: (state) => {
      return state.settings.autoplayMusic;
    },

    audibleNotifications: (state) => {
      return state.settings.audibleNotifications;
    },

    musicVolume: (state) => {
      return state.settings.musicVolume;
    },

    jwt: (state) => {
      return state.jwt;
    },
  },

  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  strict: process.env.DEBUGGING,
});

export default Store;
