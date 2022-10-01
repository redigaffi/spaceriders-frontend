<template>
  <router-view />
</template>
<script setup>
import ApiRequest from "./service/http/ApiRequests";
import { useStore } from "vuex";

if (!window.ethereum) {
  alert("No Web3 wallet detected, please install metamask to play the game.");
}

const $store = useStore();

async function getChainData() {
  const data = await ApiRequest.getChainInfo();
  $store.commit("setChainInfo", { chainInfo: data });
}

getChainData();
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

// New Loading icon
.circle {
  position: absolute;
  border: 3px solid transparent;
  border-top-color: #9ee925;
  border-radius: 50%;
  animation: rotate linear infinite;
}
.circle.one {
  height: 50px;
  width: 50px;
  left: 50px;
  top: 50px;
  animation-duration: 0.85s;
}
.circle.two {
  height: 75px;
  width: 75px;
  top: 38px;
  left: 38px;
  animation-duration: 0.95s;
}
.circle.three {
  height: 100px;
  width: 100px;
  top: 25px;
  left: 25px;
  animation-duration: 1.05s;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -90px 0 0 -90px;
  transition: all 2s ease-out;
  transform: scale(1.4);
  /*&:hover {
    transition: all 1s ease-in;
    transform: scale(3);
  }*/
}
body {
  background-color: #1a1a1a;
}
@-moz-keyframes rotate {
  from {
    transform: rotateZ(360deg);
  }
  to {
    transform: rotateZ(0deg);
  }
}
@-webkit-keyframes rotate {
  from {
    transform: rotateZ(360deg);
  }
  to {
    transform: rotateZ(0deg);
  }
}
@-o-keyframes rotate {
  from {
    transform: rotateZ(360deg);
  }
  to {
    transform: rotateZ(0deg);
  }
}
@keyframes rotate {
  from {
    transform: rotateZ(360deg);
  }
  to {
    transform: rotateZ(0deg);
  }
}

.q-loading__spinner {
  display: none;
}

.q-loading__backdrop {
  outline: 0;
  pointer-events: all;
  z-index: -1;
  opacity: 0.85;
}
</style>
