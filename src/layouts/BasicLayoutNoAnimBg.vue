<template>
  <q-layout view="lHh Lpr lFf">
    <headerbar />
    <q-page-container id="main">
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
// window.location.reload();
import { getCurrentInstance } from "vue";
import { useStore } from "vuex";
import Headerbar from "../components/HeaderBar.vue";
import ApiRequest from "../service/http/ApiRequests";
import { UPDATED_ALL } from "../constants/Events";
import { useQuasar } from "quasar";

const $store = useStore();
const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

// Main app features
const $quasar = useQuasar();

async function update(activePlanet) {
  ApiRequest.tokenPrice().then((tokenPrice) => {
    $store.commit("setTokenPrice", { tokenPrice: tokenPrice });
  });

  const allPlanetInfoReq = await ApiRequest.getAllInfoPlanet(activePlanet.id);
  const allPlanetInfo = allPlanetInfoReq.data;

  $store.commit("setActivePlanet", allPlanetInfo.planet);
  $store.commit("setResourceData", allPlanetInfo.resources);
  $store.commit("setInstallationData", allPlanetInfo.installation);
  $store.commit("setResearchData", allPlanetInfo.research);
  $store.commit("setDefenseData", allPlanetInfo.defense);
  $store.commit("addEmails", { emails: allPlanetInfo.emails });
}

async function updateAll() {
  if (!$store.getters.loggedIn) return;

  let activePlanetId = false;
  if ($store.getters.activePlanet) {
    activePlanetId = $store.getters.activePlanet.id;
  }

  const planets = await ApiRequest.getAllPlanets();
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
    update(activePlanet);
  }

  $eventBus.emit(UPDATED_ALL);
}

async function init() {
  if ($store.getters.loggedIn) {
    $quasar.loading.show();
    // On page refresh reset all.
    await updateAll();
    $quasar.loading.hide();
  }
}

init();
</script>

<style></style>
