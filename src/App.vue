<template>
  <router-view/>
</template>
<script setup>
import ApiRequest from "./service/http/ApiRequests";
import { getCurrentInstance } from "vue";
import { useQuasar } from "quasar";
import { ACTIVE_PLANET_CHANGED, LOGGED_IN, UPDATED_ALL } from "./constants/Events";
import { useStore } from "vuex";

const $eventBus = getCurrentInstance().appContext.config.globalProperties.$eventBus;
const $store = useStore();

const $quasar = useQuasar();

$eventBus.on(ACTIVE_PLANET_CHANGED, async () => {
  await $quasar.loading.show(
  {
      spinnerSize: 70,
      backgroundColor: 'blue-10',
      message: '1, 2, 3, Lift off...',
      messageColor: 'black',
      customClass: 'text',
  });

  await updateAll();
  await updateInterval();
  
  await $quasar.loading.hide();
});

$eventBus.on(LOGGED_IN, async () => {
  await $quasar.loading.show(
  {
      spinnerSize: 70,
      backgroundColor: 'blue-10',
      message: '1, 2, 3, Lift off...',
      messageColor: 'black',
      customClass: 'text',
  });

  await updateAll();
  await updateInterval();

  await $quasar.loading.hide();

});

async function getChainData() {
  const data = await ApiRequest.getChainInfo();
  $store.commit('setChainInfo', {chainInfo: data});
}

async function update(activePlanet) {
  ApiRequest.tokenPrice().then(tokenPrice => {
    $store.commit('setTokenPrice', { tokenPrice: tokenPrice })
  });

  const allPlanetInfo = (await ApiRequest.getAllInfoPlanet(activePlanet.id))
    .data;

  $store.commit('setActivePlanet', allPlanetInfo.planet);
  $store.commit("setResourceData", allPlanetInfo.resources);
  $store.commit("setInstallationData", allPlanetInfo.installation);
  $store.commit("setResearchData", allPlanetInfo.research);
  $store.commit("setDefenseData", allPlanetInfo.defense);
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
      activePlanet = activePlanets[0];
    }
  }
  if (activePlanet !== false) {
    $store.commit("setActivePlanet", activePlanet);
    await update(activePlanet);
  }
  
  $eventBus.emit(UPDATED_ALL);
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

async function init() {
  $quasar.loading.show(
    {
        spinnerSize: 70,
        backgroundColor: 'blue-10',
        message: '1, 2, 3, Lift off...',
        messageColor: 'black',
        customClass: 'text',
    });
  // On page refresh reset all.
  await getChainData();
  await updateAll();
  // Start timer
  await updateInterval();
  $quasar.loading.hide();

}

init();
</script>

<style>
.notify {
  margin-top: 80px;
}

.text {
  font-size: 25px;
  font-weight: bold;
}
</style>
