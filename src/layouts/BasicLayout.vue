<template>
  <q-layout view="lHh Lpr lFf">
    <headerbar />
    <q-page-container id="main">
      <Particles
        id="particles-js"
        class="particles-bg"
        :options="{
          fpsLimit: 60,
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: false,
                mode: 'repulse',
              },
              resize: true,
            },
          },
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 1200,
              },
            },
            color: {
              value: '#ffffff',
            },
            shape: {
              type: 'star',
              stroke: {
                width: 0,
                color: '#000000',
              },
              polygon: {
                nb_sides: 4,
              },
              image: {
                src: '',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 1,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 20,
                size_min: 0,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 0.1,
              direction: 'top',
              random: true,
              straight: true,
              out_mode: 'out',
              bounce: false,
            },
            array: [],
          },
          detectRetina: true,
        }"
      />

      <q-page>
        <router-view />
        <Profile />
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
import { onMounted } from "@vue/runtime-core";
import { useQuasar } from "quasar";
import Profile from "../components/Profile.vue";

const $store = useStore();
const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

// Main app features
const $quasar = useQuasar();

onMounted(() => {
  $store.commit("setProfileModal", false);
  $store.commit("setDrawerLeft", false);
  $store.commit("setDrawerRight", false);
});

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

<style scoped>
/*
https://codepen.io/mattmarble/pen/qBdamQz
*/
:root {
  font-size: 14px;
}

#main {
  height: 100%;
  background: radial-gradient(ellipse at bottom, #0b131d 0%, #000000 100%);
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-size: 14px;
  /* font-family: 'Orbitron', sans-serif; */
  font-family: bodyFont;
}
</style>
