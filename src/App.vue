<template>
  

  <router-view />
  
</template>
<script setup>
import ApiRequest from "./service/http/ApiRequests";
import { getCurrentInstance } from "vue";
import { ACTIVE_PLANET_CHANGED, LOGGED_IN } from "./constants/Events";
import { useStore } from "vuex";

const $eventBus = getCurrentInstance().appContext.config.globalProperties.$eventBus;
const $store = useStore();


$eventBus.on(ACTIVE_PLANET_CHANGED, () => {
  updateAll();
  updateInterval();
});
$eventBus.on(LOGGED_IN, () => {
  updateAll();
  updateInterval();
});

async function getChainData() {
  const data = await ApiRequest.getChainInfo();
  $store.commit('setChainInfo', {chainInfo: data});
}

async function update(activePlanet) {
  const tokenPrice = (await ApiRequest.tokenPrice());
  const allPlanetInfo = (await ApiRequest.getAllInfoPlanet(activePlanet.id))
    .data;

  $store.commit('setActivePlanet', allPlanetInfo.planet)
  $store.commit('setTokenPrice', { tokenPrice: tokenPrice });
  $store.commit("setResourceData", allPlanetInfo.resources);
  $store.commit("setInstallationData", allPlanetInfo.installation);
  $store.commit("setResearchData", allPlanetInfo.research);
  $store.commit("setDefenseData", allPlanetInfo.defense);
  $store.commit("setConversionRequests", allPlanetInfo.conversion);
  $store.commit("addEmails", { emails: allPlanetInfo.email });
}

async function updateAll() {
  if (!$store.getters.loggedIn) return;

  let activePlanetId = false;
  if ($store.getters.activePlanet) {
    activePlanetId = $store.getters.activePlanet.id;
  }

  const planets = (await ApiRequest.getAllPlanets()).data;
  $store.commit("setPlanets", planets);

  let activePlanet = false;
  if (activePlanetId !== false) {
    activePlanet = planets.filter((o) => o.id === activePlanetId)[0];
  } else if (!activePlanetId && planets.length > 0) {
    let activePlanets = planets.filter((o) => o.claimed);
    if (activePlanets.length > 0) {
      activePlanet = activePlanets[1];
    }
  }
  
  if (activePlanet !== false) {
    $store.commit("setActivePlanet", activePlanet);
    await update(activePlanet);
  }
}

async function updateInterval() {
  if (!$store.getters.loggedIn) return;

  if($store.getters.updateIntervalId !== false) {
    clearInterval($store.getters.updateIntervalId);
  }

  if ($store.getters.activePlanet) {
    const timerId = setInterval(async () => {
      update($store.getters.activePlanet);
    }, 60000);

    $store.commit('setUpdateIntervalId', {updateIntervalId: timerId});
  }

}

getChainData();

// On page refresh reset all.
updateAll();

// Start timer
updateInterval();
</script>

<style>
.notify {
  margin-top: 80px;
}
</style>
