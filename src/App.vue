<template>
  

  <router-view />
  
</template>
<script setup>
import ApiRequest from "./service/http/ApiRequests";
import { defineComponent, getCurrentInstance } from "vue";
import { ACTIVE_PLANET_CHANGED, LOGGED_IN } from "./constants/Events";
import { useStore } from "vuex";

const $eventBus = getCurrentInstance().appContext.config.globalProperties.$eventBus;
const $store = useStore();

$eventBus.on(ACTIVE_PLANET_CHANGED, updateAll);
$eventBus.on(LOGGED_IN, updateAll);

async function getChainData() {
  const data = await ApiRequest.getChainInfo();
  $store.commit('setChainInfo', {chainInfo: data});
}

async function update(activePlanet) {

  $store.commit("setActivePlanet", activePlanet);

  const tokenPrice = (await ApiRequest.tokenPrice());
  const allPlanetInfo = (await ApiRequest.getAllInfoPlanet(activePlanet.id))
    .data;

  $store.commit('setTokenPrice', { tokenPrice: tokenPrice });
  $store.commit("setResourceData", allPlanetInfo.resources);
  $store.commit("setInstallationData", allPlanetInfo.installation);
  $store.commit("setResearchData", allPlanetInfo.research);
  $store.commit("setDefenseData", allPlanetInfo.defense);
  $store.commit("setConversionRequests", allPlanetInfo.conversion);
  $store.commit("addEmails", { emails: allPlanetInfo.email });
}

async function updateAll() {
  //TODO: Delete all intervals ..
  //this.$store.commit("clearAllIntervalTimeouts");

  if (!$store.getters.loggedIn) return;

  let activePlanetId = false;
  if ($store.getters.activePlanet) {
    activePlanetId = $store.getters.activePlanet.id;
  }

  const planets = (await ApiRequest.getAllPlanets()).data;
  $store.commit("setPlanets", planets);

  if (activePlanetId !== false) {
    console.log("active planet")
    let activePlanet = planets.filter((o) => o.id === activePlanetId);
    await update(activePlanet[0]);

    // Set default planet
  } else if (!activePlanetId && planets.length > 0) {
    let activePlanets = planets.filter((o) => o.claimed);
    if (activePlanets.length > 0) {
      console.log("no active planet")
      await update(activePlanets[0]);
    }
  }
}

getChainData();

// On page refresh reset all.
updateAll();
</script>

<style>
.notify {
  margin-top: 80px;
}
</style>
