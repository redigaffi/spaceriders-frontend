<template>
  <router-view />
</template>
<script setup>

import ApiRequest from "./service/http/ApiRequests";
import { getCurrentInstance, computed } from "vue";
import { ACTIVE_PLANET_CHANGED, LOGGED_IN, UPDATED_ALL } from "./constants/Events";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
if (!window.ethereum) {
  alert("No Web3 wallet detected, please install metamask to play the game.");
}

const $eventBus = getCurrentInstance().appContext.config.globalProperties.$eventBus;
const $store = useStore();

const $quasar = useQuasar();

$eventBus.on(ACTIVE_PLANET_CHANGED, async () => {
  $quasar.loading.show();
  await updateAll();
  await updateInterval();
  $quasar.loading.hide();
});

$eventBus.on(LOGGED_IN, async () => {
  await updateAll();
  await updateInterval();
});

async function getChainData() {
  const data = await ApiRequest.getChainInfo();
  $store.commit("setChainInfo", { chainInfo: data });
}

async function update(activePlanet) {
  ApiRequest.tokenPrice().then((tokenPrice) => {
    $store.commit("setTokenPrice", { tokenPrice: tokenPrice });
  });

  const allPlanetInfo = (await ApiRequest.getAllInfoPlanet(activePlanet.id)).data;

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

async function init() {
  if ($store.getters.loggedIn) {
    $quasar.loading.show();
    // On page refresh reset all.
    await updateAll();
    // Start timer
    await updateInterval();
    $quasar.loading.hide();
  }
}


getChainData();
init();

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
$animationTime: 2.5s;
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
  transform: scale(2.5);
  &:hover {
    transition: all 1s ease-in;
    transform: scale(3);
  }
}

.loader-text {
  margin-top: 100px !important;
  font-family: headingFont;
  font-size: 25px;
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
  font-size: 100px;

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


// New Loading icon

$m-01: #3c4359;
$m-02: #546c8c;
$m-03: #7ea1bf;
$m-04: #bacbd9;
$m-05: #bf80a9;

@import url("https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap");


.content {
   width: 300px;
   height: 300px;
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;

   .planet {
      width: 65%;
      height: 65%;
      background-color: $m-02;
      border-radius: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      transform-origin: center center;
      box-shadow: inset 2px -10px 0px rgba(0, 0, 0, 0.1);
      animation: planet 5s ease infinite alternate;

      @keyframes planet {
         0% {
            transform: rotate(10deg);
         }

         100% {
            transform: rotate(-10deg);
         }
      }

      /* planet ring */
      .ring {
         position: absolute;
         width: 300px;
         height: 300px;
         border-radius: 100%;
         background-color: $m-04;
         display: flex;
         align-items: center;
         justify-content: center;
         transform-origin: 33% center;
         box-shadow: 2px -10px 0px rgba(0, 0, 0, 0.1),
            inset -5px -10px 0px rgba(0, 0, 0, 0.1);
         animation: ring 3s ease infinite;

         @keyframes ring {
            0% {
               transform: rotateX(110deg) rotateZ(0deg) translate(-50px, 5px);
            }

            100% {
               transform: rotateX(110deg) rotateZ(360deg) translate(-50px, 5px);
            }
         }

         /* small ball */
         &:before {
            content: "";
            position: absolute;
            width: 10px;
            height: 30px;
            border-radius: 100%;
            background-color: $m-03;
            z-index: 2;
            left: calc(0px - 5px);
            box-shadow: inset -3px 3px 0px rgba(0, 0, 0, 0.2);
         }

         /* inner ring */
         &:after {
            content: "";
            position: absolute;
            width: 240px;
            height: 240px;
            border-radius: 100%;
            background-color: $m-03;
            box-shadow: inset 2px -10px 0px rgba(0, 0, 0, 0.1);
         }
      }

      /* to cover the back of the ring */
      .cover-ring {
         position: absolute;
         width: 100%;
         height: 50%;
         border-bottom-left-radius: 80%;
         border-bottom-right-radius: 80%;
         border-top-left-radius: 100px;
         border-top-right-radius: 100px;
         transform: translate(0px, -17px);
         background-color: $m-02;
         z-index: 2;
         box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
      }

      /* planet spots */
      .spots {
         width: 100%;
         height: 100%;
         display: flex;
         align-items: center;
         justify-content: center;
         position: absolute;
         z-index: 2;

         span {
            width: 30px;
            height: 30px;
            background-color: $m-01;
            position: absolute;
            border-radius: 100%;
            box-shadow: inset -2px 3px 0px rgba(0, 0, 0, 0.3);
            animation: dots 5s ease infinite alternate;

            @keyframes dots {
               0% {
                  box-shadow: inset -3px 3px 0px rgba(0, 0, 0, 0.3);
               }
               100% {
                  box-shadow: inset 3px 3px 0px rgba(0, 0, 0, 0.3);
               }
            }

            &:nth-child(1) {
               top: 20px;
               right: 50px;
            }

            &:nth-child(2) {
               top: 40px;
               left: 50px;
               width: 15px;
               height: 15px;
            }

            &:nth-child(3) {
               top: 80px;
               left: 20px;
               width: 25px;
               height: 25px;
            }

            &:nth-child(4) {
               top: 80px;
               left: 90px;
               width: 40px;
               height: 40px;
            }

            &:nth-child(5) {
               top: 160px;
               left: 70px;
               width: 15px;
               height: 15px;
            }

            &:nth-child(6) {
               top: 165px;
               left: 125px;
               width: 10px;
               height: 10px;
            }

            &:nth-child(7) {
               top: 90px;
               left: 150px;
               width: 15px;
               height: 15px;
            }
         }
      }
   }

   p {
      color: $m-04;
      font-size: 14px;
      z-index: 2;
      position: absolute;
      bottom: -20px;
      font-family: "Roboto Mono", monospace;
      animation: text 4s ease infinite;
      width: 100px;
      text-align: center;

      @keyframes text {
         0% {
            transform: translateX(-30px);
            letter-spacing: 0px;
            color: $m-04;
         }

         25% {
            letter-spacing: 3px;
            color: $m-03;
         }

         50% {
            transform: translateX(30px);
            letter-spacing: 0px;
            color: $m-04;
         }

         75% {
            letter-spacing: 3px;
            color: $m-03;
         }

         100% {
            transform: translateX(-30px);
            letter-spacing: 0px;
            color: $m-04;
         }
      }
   }
}

.q-loading__spinner {
  display: none;
}

.q-loading__backdrop {
  outline: 0;
  pointer-events: all;
  z-index: -1;
  opacity: 0.85
}
</style>
