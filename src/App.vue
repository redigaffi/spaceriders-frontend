<template>
  <router-view />
</template>
<script setup>
import ApiRequest from "./service/http/ApiRequests";
import { getCurrentInstance } from "vue";
import {
  ACTIVE_PLANET_CHANGED,
  LOGGED_IN,
  UPDATED_ALL,
} from "./constants/Events";
import { useStore } from "vuex";

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;
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
  $store.commit("setChainInfo", { chainInfo: data });
}

async function update(activePlanet) {
  ApiRequest.tokenPrice().then((tokenPrice) => {
    $store.commit("setTokenPrice", { tokenPrice: tokenPrice });
  });

  const allPlanetInfo = (await ApiRequest.getAllInfoPlanet(activePlanet.id))
    .data;

  $store.commit("setActivePlanet", allPlanetInfo.planet);
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

  if ($store.getters.updateIntervalId !== false) {
    clearInterval($store.getters.updateIntervalId);
  }

  if ($store.getters.activePlanet) {
    const timerId = setInterval(async () => {
      update($store.getters.activePlanet);
    }, 60000);

    $store.commit("setUpdateIntervalId", { updateIntervalId: timerId });
  }
}

getChainData();

// On page refresh reset all.
updateAll();

// Start timer
updateInterval();
</script>

<style lang="scss">
.notify {
  margin-top: 80px;
}

// Mixins
@mixin keyframes($name) {
  @-webkit-keyframes #{$name} {
    @content;
  }
  @-moz-keyframes #{$name} {
    @content;
  }
  @-ms-keyframes #{$name} {
    @content;
  }
  @keyframes #{$name} {
    @content;
  }
}

// Variables
$debug: 0;
$animationTime: 3s;
$pufSize: 7px;
$pufCount: 45;
$intervalDegree: 360 / $pufCount;
$smokeRatioDisapear: 60%;
$particleMap: (
  _1: particle,
  _2: particle-o,
);

// Global Style
body {
  background: #333;
}
h1 {
  color: white;
}

// FontAwsome Icon Modifier
.offset-45deg {
  transform: rotate(45deg);
}

// Debug Mode
div:not(.pufs, .particles) {
  @if ($debug == 1) {
    border: 1px solid red;
  }
}

/*---------------------------*/
/*-- Rocket Spinner Styles --*/
/*---------------------------*/
.loader {
  width: 100px;
  height: 100px;
  position: relative;
  display: block;
  margin: 0 auto;
  transition: all 2s ease-out;
  transform: scale(1);
  &:hover {
    transition: all 1s ease-in;
    transform: scale(1.5);
  }
}

// Modifier (on Black)
.loader-white {
  .loader--icon {
    color: white;
    //color: transparent;
    //text-shadow: 0 0 5px rgba(255,255,255,0.99);
  }
  .pufs {
    > i {
      &:after {
        animation-name: puf-white;
      }
    }
  }
}

// Animate the loader main icon (spin/orbit)
.loader-spined {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  position: absolute;
  display: block;
  animation: orbit $animationTime linear infinite;
}
@include keyframes(orbit) {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// Loader icon styles
.loader--icon {
  text-align: center;
  width: 25px;
  height: 25px;
  line-height: 25px;
  margin: 0 auto;
  font-size: 26px;
  color: darken(#3498db, 40%);
}

// Smoke
.pufs {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: block;
  position: absolute;

  > i {
    // Use specific fontawesome icon
    font: normal normal normal 14px/1 FontAwesome;
    display: block;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    position: absolute;

    &:after {
      content: "\f111";
      height: $pufSize;
      width: $pufSize;
      position: relative;
      border-radius: 100%;
      display: block;
      margin: 0 auto;
      top: $pufSize;
      font-size: 9px;
      opacity: 0;

      animation-name: puf;
      animation-iteration-count: infinite;
      animation-timing-function: ease-out;
      animation-duration: $animationTime;
    }

    @for $i from 1 through $pufCount {
      $pufRatio: $i * 100 / $pufCount;
      $animationTimeDelay: $animationTime * $pufRatio / 100;
      // $rand: (random(40) - 20) / 10;
      &:nth-child(#{$i}) {
        transform: rotate(#{$i * $intervalDegree}deg);
      }
      &:nth-child(#{$i}):after {
        animation-delay: $animationTimeDelay;
        // random // margin-top: #{$rand}px;
        @if $i % 2 == 0 {
          margin-top: 1px;
        } @else {
          margin-top: -1px;
        }
      }
    }
  }
}

.particles {
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  > i {
    font: normal normal normal 14px/1 FontAwesome;
    display: block;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    position: absolute;

    &:after {
      content: "\f111";
      height: $pufSize;
      width: $pufSize;
      position: relative;
      border-radius: 100%;
      display: block;
      margin: 0 auto;
      top: $pufSize;
      font-size: 2px;
      opacity: 0; // INITIAL STATE
      margin-top: 0;

      animation-iteration-count: infinite;
      animation-timing-function: ease-out;
      animation-duration: $animationTime;
    }

    @for $i from 1 through $pufCount {
      $pufRatio: $i * 100 / $pufCount;
      $animationTimeDelay: $animationTime * $pufRatio / 100;
      &:nth-child(#{$i}) {
        transform: rotate(#{$i * $intervalDegree}deg);
      }
      &:nth-child(#{$i}):after {
        animation-delay: $animationTimeDelay;
        //@if $i % 3 == 0 {
        @if $i % 3 == 0 {
          animation-name: map-get($particleMap, _1);
        } @else {
          animation-name: map-get($particleMap, _2);
        }
      }
    }
  }
}

// Animation for smoke (on White)
@include keyframes(puf) {
  0% {
    opacity: 1;
    color: darken(#3498db, 60%);
    transform: scale(1);
  }
  10% {
    color: #3498db;
    transform: scale(1.5);
  }
  #{$smokeRatioDisapear},
  100% {
    opacity: 0;
    color: grey;
    transform: scale(0.4);
  }
}

// Animation for smoke (on Black)
@include keyframes(puf-white) {
  0% {
    opacity: 1;
    color: rgba(0, 0, 0, 0.75);
    transform: scale(1);
  }
  10% {
    color: rgba(255, 255, 255, 0.9);
    transform: scale(1.5);
  }
  #{$smokeRatioDisapear},
  100% {
    opacity: 0;
    color: rgba(0, 0, 0, 0.3);
    transform: scale(0.4);
  }
}

// Animation for particles (going down)
@include keyframes(particle) {
  0% {
    opacity: 1;
    color: rgba(255, 255, 255, 1);
    margin-top: 0px;
  }
  10% {
    margin-top: 15px;
  }
  75% {
    opacity: 0.5;
    margin-top: 5px;
  }
  100% {
    opacity: 0;
    margin-top: 0px;
  }
}

// Animation for particles (going up)
@include keyframes(particle-o) {
  0% {
    opacity: 1;
    color: rgba(255, 255, 255, 1);
    margin-top: 0px;
  }
  10% {
    margin-top: -7px;
  }
  75% {
    opacity: 0.5;
    margin-top: 0px;
  }
  100% {
    opacity: 0;
    margin-top: 0px;
  }
}
.q-loading__spinner {
  display: none;
}
</style>
