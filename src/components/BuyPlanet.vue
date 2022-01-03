<template>
  <div>
    <q-btn
      icon="add"
      label="Buy Planet"
      color="warning"
      v-if="!$q.screen.xs"
      @click="buyPlanetPopup = true"
    />

    <q-btn
      icon="add"
      v-if="$q.screen.xs"
      color="warning"
      @click="buyPlanetPopup = true"
    />

    <q-dialog v-model="buyPlanetPopup">
      <q-card
        class="bg-dark text-white"
        style="width: 600px; max-width: 70vw; border-radius: 20px"
      >
        <q-btn
          round
          class="absolute-top-right"
          flat
          color="warning"
          icon="close"
          v-close-popup
        />
        <img src="~assets/img/buyplanet_footer-scaled.jpg" alt="" srcset="" />
        <q-card-section class="text-center">
          <div class="text-h6">BUY A PLANET</div>
          <div class="text-subtitle1">
            Buying a planet costs ${{ planetCost.usd_cost }} ({{planetCost.token_cost}} $SPR), also, you can choose a planet name
            (which can be changed later).
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            label-color="info"
            v-model="planetName"
            label="Planet Name"
            standout="bg-secondary"
          />
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <q-btn
            label="Buy Planet"
            color="warning"
            @click="buyPlanet"
            no-caps
            class="q-px-lg"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import ApiRequest from "../service/http/ApiRequests";

import PlanetManagementContract, {
  SignatureData,
} from "../service/contract/PlanetManagementContract";

import { NEW_PLANET_PURCHASED } from "../constants/Events";
import { ref, watchEffect, getCurrentInstance } from "vue";
import { useStore } from "vuex";

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const $store = useStore();

const planetName = ref("");
const buyPlanetPopup = ref(false);
const planetCost = ref({});

watchEffect(async () => {
  if (buyPlanetPopup.value) {
    planetCost.value = (await ApiRequest.fetchPlanetCost());
  }
})

async function buyPlanet () {
  const planetGuid = uuidv4();

  const closeNotification = $notification(
    "progress",
    "Waiting for transaction to complete...",
    0
  );

  let receipt = { status: 0 };

  const planetCostData = await ApiRequest.fetchPlanetCostData(planetGuid);
  const sD = new SignatureData(planetCostData.v, planetCostData.r, planetCostData.s);
  
  try {
    const tx = await PlanetManagementContract.buyPlanet(planetGuid, planetCostData.price, sD);
    receipt = await tx.wait();
    console.log(receipt);
  } catch (e) {
    console.log("error");
    console.log(e);
  }

  if (receipt.status === 1) {
    const txHash = receipt.transactionHash;
    const re = await ApiRequest.buyPlanet(
      txHash,
      planetGuid,
      planetName.value
    );

    if (re.success) {
      $notification("success", "Planet purchases successfully!", 6000);
    } else {
      $notification("failed", re.error, 6000);
      console.error(`${planetGuid}`);
    }

    $eventBus.emit(NEW_PLANET_PURCHASED, { planet: re.data });
    $store.commit("addPlanet", re.data);
  } else {
    $notification(
      "failed",
      "Something failed, please try again!",
      1500
    );
  }

  closeNotification();
}

</script>
