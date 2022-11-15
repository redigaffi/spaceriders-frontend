<template>
  <div>
    <q-btn
      icon="add"
      label="Buy Planet"
      color="warning"
      @click="buyPlanetPopup = true"
    />

    <!--
    <q-btn
      icon="add"
      v-if="$q.screen.xs"
      color="warning"
      @click="buyPlanetPopup = true"
    />
    -->

    <q-dialog v-model="freePlanetPopup">
      <q-card
        class="bg-dark text-white q-pb-md"
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
        <img src="~assets/img/buyplanet_footer-scaled.webp" alt="" srcset="" />
        <q-card-section class="text-center">
          <div class="text-h6">MINT FREE PLANET</div>
        </q-card-section>
        <q-card-section class="q-gutter-sm q-pt-none">
          <q-input
            label-color="white"
            standout="bg-secondary"
            v-model="planetName"
            label="Planet Name"
            hide-bottom-space
            :rules="[
              (val) => val.length <= 14 || 'Please use maximum 14 characters',
              (val) => val.length >= 4 || 'Please use minimum 4 characters',
            ]"
            style="
              border: 2px solid #2253f4;
              border-radius: 5px;
              font-size: 14px;
              box-shadow: 0 0 20px #2253f4;
              color: #fff;
            "
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="buyPlanetPopup">
      <q-card class="bg-dark text-white q-pb-md full-width">
        <q-card-section class="row justify-between">
          <div class="text-h6">BUY A PLANET</div>
          <q-btn
            flat
            round
            size="sm"
            color="white"
            icon="close"
            v-close-popup
          />
        </q-card-section>

        <q-separator />

        <q-img
          src="~assets/img/buy_planet_bg.jpg"
          style="height: 200px; width: 100%"
        />

        <q-card-section class="q-gutter-sm q-py-sm">
          <q-input
            label-color="white"
            v-model="planetCostDisplay"
            label="Planet Cost"
            standout="bg-secondary"
            readonly
            style="
              border: 2px solid #2253f4;
              border-radius: 5px;
              font-size: 14px;
              box-shadow: 0 0 20px #2253f4;
              color: #fff;
            "
          />
          <q-input
            label-color="white"
            v-model="bnbFeeDisplay"
            label="FEES"
            readonly
            standout="bg-secondary"
            style="
              border: 2px solid #2253f4;
              border-radius: 5px;
              font-size: 14px;
              box-shadow: 0 0 20px #2253f4;
              color: #fff;
            "
          />
          <q-input
            label-color="white"
            v-model="planetName"
            label="Planet Name"
            hide-bottom-space
            :rules="[
              (val) => val.length <= 14 || 'Please use maximum 14 characters',
              (val) => val.length >= 4 || 'Please use minimum 4 characters',
            ]"
            style="
              border: 2px solid #2253f4;
              border-radius: 5px;
              font-size: 14px;
              box-shadow: 0 0 20px #2253f4;
              color: #fff;
            "
          />
        </q-card-section>

        <q-card-actions align="center" class="q-px-md">
          <!-- <q-btn
            class="full-width"
            style="background: #18121e"
            label="Connect to a wallet"
            no-caps
            v-close-popup
          />
        </q-card-section>

          /> -->

          <IncreaseAllowance
            :address="ContractAddress.getSpaceRidersGameAddress()"
            :amount="planetCost.token_cost"
            :tokenAddress="ContractAddress.getSpaceRidersAddress()"
            :class="{ 'full-width q-mb-sm': $q.screen.lt.md }"
          />

          <q-btn
            :class="$q.screen.lt.md ? 'full-width' : 'q-ml-sm'"
            color="info"
            icon="add"
            label="Buy Planet"
            @click="buyPlanet"
            :disabled="planetName.length < 4 || planetName.length > 14"
            v-close-popup
          >
          </q-btn>

          <q-inner-loading :showing="visible">
            <q-spinner size="70px" color="warning" />
          </q-inner-loading>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import ApiRequest from "../service/http/ApiRequests";
import IncreaseAllowance from "./IncreaseAllowance";
import ContractAddress from "../service/contract/ContractAddress";
import ObjectID from "bson-objectid";
import SpaceRidersGameContract, {
  SignatureData,
} from "../service/contract/SpaceRidersGameContract";

import {
  NEW_PLANET_PURCHASED,
  PLANET_CLAIMED,
  ACTIVE_PLANET_CHANGED,
} from "../constants/Events";
import { ref, watchEffect, getCurrentInstance, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const $q = useQuasar();

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const $store = useStore();

const planetName = ref("");
const buyPlanetPopup = ref(false);
const freePlanetPopup = ref(false);

const planetCost = ref({});

const planetCostDisplay = ref();
const bnbFeeDisplay = ref();

const visible = ref(true);
watchEffect(async () => {
  if (buyPlanetPopup.value) {
    planetCost.value = "";
    bnbFeeDisplay.value = "";
    visible.value = true;
    planetCost.value = await ApiRequest.fetchPlanetCost();
    planetCostDisplay.value = `${planetCost.value.token_cost} $BKM ($${planetCost.value.usd_cost})`;
    bnbFeeDisplay.value = "0.0025 BNB";
    visible.value = false;
  }
});

async function buyPlanet() {
  const planetGuid = ObjectID().toHexString();

  const notif = $q.notify(
    $notification("progress", "Waiting for transaction to complete...")
  );

  try {
    const planetCostData = await ApiRequest.fetchPlanetCostData(planetGuid);
    const sD = new SignatureData(
      planetCostData.v,
      planetCostData.r,
      planetCostData.s
    );

    const tx = await SpaceRidersGameContract.buyPlanet(
      planetCostData.planet_id,
      planetCostData.price,
      sD,
      planetCostData.token_uri
    );

    // wait till mined
    await tx.wait();
    const re = await ApiRequest.buyPlanet(planetGuid, planetName.value);

    $store.commit("addPlanet", re.data);
    $eventBus.emit(NEW_PLANET_PURCHASED, { planet: re.data });

    notif($notification("success", "Planet purchased successfully!"));
  } catch (e) {
    notif($notification("failed", e));

    console.log("error");
    console.log(e);
  }
}
</script>
