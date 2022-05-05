<template>
  <div v-if="loggedIn">
    <q-btn
      rounded
      v-if="showTokenAmount"
      @click="toggleValue"
      class="glossy"
      color="primary"
      text-color="white"
    >
      <img src="logo.png" style="width: 22px; height: 22px" />
      <div class="q-ml-sm">{{ tokenBalance }}</div>
    </q-btn>
    <q-btn
      rounded
      v-else
      @click="toggleValue"
      class="glossy"
      color="primary"
      text-color="white"
    >
      <q-avatar
        class="q-mr-xs"
        size="1.5rem"
        color="warning"
        text-color="white"
        icon="fas fa-dollar-sign"
      />
      <div class="q-ml-xs">{{ totalUsd }}</div>
    </q-btn>
  </div>
</template>
<script setup>
import SpaceRiders from "../service/contract/SpaceRiders";
import { useStore } from "vuex";
import { ref, onBeforeMount, computed, getCurrentInstance } from "vue";
import {
  LOGGED_IN,
  SWAP_COMPLETED,
  NEW_PLANET_PURCHASED,
  CONVERT_COMPLETED,
  STAKE,
  UNSTAKE,
  ENERGY_DEPOSITED
} from "../constants/Events";
import tc from "thousands-counter";
import ApiRequest from "../service/http/ApiRequests";

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;
$eventBus.on(LOGGED_IN, upateBalance);
$eventBus.on(SWAP_COMPLETED, upateBalance);
$eventBus.on(NEW_PLANET_PURCHASED, upateBalance);
$eventBus.on(CONVERT_COMPLETED, upateBalance);
$eventBus.on(STAKE, upateBalance);
$eventBus.on(UNSTAKE, upateBalance);
$eventBus.on(ENERGY_DEPOSITED, upateBalance);

const $store = useStore();
const showTokenAmount = ref(true);
const tokenAmount = ref(0);
const dollarValue = ref(0);

const tokenBalance = computed(() => {
  return tc(tokenAmount.value, { digits: 3 });
});

const totalUsd = computed(() => {
  return tc(dollarValue.value, { digits: 3 });
});

const loggedIn = computed(() => {
  return $store.getters.address !== false;
});

onBeforeMount(() => {
  if (loggedIn.value) {
    upateBalance();
  }
});

async function upateBalance() {
  try {
    tokenAmount.value = await SpaceRiders.totalBalanceOf(
      $store.getters.address
    );

    if ($store.getters.activePlanet.freePlanet) {
      tokenAmount.value += $store.getters.activePlanet.freeTokens;
    }

  } catch (e) {
    console.log(e);
  }
}

async function toggleValue() {
  if (showTokenAmount.value) {
    showTokenAmount.value = false;
    await upateBalance();
    const price = await ApiRequest.tokenPrice();
    dollarValue.value = tokenAmount.value * price;
  } else {
    showTokenAmount.value = true;
    await upateBalance();
  }
}
</script>
