<template>
  <div>
    <q-btn
      icon="add"
      label="Get Free Planet"
      color="warning"
      @click="openBuyPlanetPopup()"
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
          src="~assets/img/buy_planet_bg.webp"
          style="height: 200px; width: 100%"
        />

        <q-card-section
          v-if="$store.getters.planets.length >= 6"
          class="q-pb-xs"
        >
          <q-item-section
            style="border-radius: 5px"
            :style="{
              color: getCssVar('negative'),
              border: `1px solid ${getCssVar('negative')}`,
              'box-shadow': `0 0 5px ${getCssVar('negative')}`,
            }"
            class="q-pa-xs"
          >
            <p
              class="q-ma-none text-body2 text-center"
              :style="{ color: getCssVar('negative') }"
            >
              You already own too many planets.
            </p>
          </q-item-section>
        </q-card-section>

        <q-card-section v-else class="q-pb-xs">
          <q-item-section
            v-if="isTransactionApproved"
            style="border-radius: 5px"
            :style="{
              color: balanceColor,
              border: `1px solid ${balanceColor}`,
              'box-shadow': `0 0 5px ${balanceColor}`,
            }"
            class="q-pa-xs"
          >
            <p
              class="q-ma-none text-body2 text-center"
              :style="{ color: balanceColor }"
            >
              Your balance is {{ tokenBalance }} $BKM.
            </p>
            <p
              v-if="!canBuyPlanets"
              class="q-ma-none text-body2 text-center"
              :style="{ color: balanceColor }"
            >
              Not enough to buy a planet.
            </p>
          </q-item-section>
        </q-card-section>

        <q-card-section
          v-if="$store.getters.planets.length < 6"
          class="q-gutter-sm q-py-sm"
        >
          <!--<q-input
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
          />-->
          <!--<q-input
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
          />-->
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
            "
          />
        </q-card-section>

        <q-card-actions
          v-if="$store.getters.planets.length < 6"
          align="center"
          class="q-px-md"
        >
          <!-- <q-btn
            class="full-width"
            style="background: #18121e"
            label="Connect to a wallet"
            no-caps
            v-close-popup
          />
        </q-card-section>

          /> -->

          <!--<IncreaseAllowance
            :address="ContractAddress.getSpaceRidersGameAddress()"
            :amount="planetCost.token_cost"
            :tokenAddress="ContractAddress.getSpaceRidersAddress()"
            :class="{ 'full-width q-mb-sm': $q.screen.lt.md }"
            @approveDisabled="transactionApproved"
          />-->

          <q-btn
            :class="$q.screen.lt.md ? 'full-width' : 'q-ml-sm'"
            color="info"
            icon="add"
            label="Get Planet"
            @click="buyPlanet"
            :disabled="
              planetName.length < 4 || planetName.length > 14 || !canBuyPlanets
            "
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
import ApiRequest from "../service/http/ApiRequests";
import ObjectID from "bson-objectid";

import {
  NEW_PLANET_PURCHASED,
  PLANET_PURCHASE_POPUP_OPENED,
} from "../constants/Events";
import { ref, getCurrentInstance, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar, getCssVar } from "quasar";
import SpaceRiders from "../service/contract/SpaceRiders";
import tc from "thousands-counter";
import { useGtag } from "vue-gtag-next";
const { event } = useGtag();

const $q = useQuasar();

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const $store = useStore();

const tokenAmount = ref(0);
const planetName = ref("");
const buyPlanetPopup = ref(false);
const freePlanetPopup = ref(false);

const isTransactionApproved = ref(false);

const visible = ref(false);

function openBuyPlanetPopup() {
  if (process.env.ENV !== "local") {
    event(PLANET_PURCHASE_POPUP_OPENED, {
      event_category: "planet",
      event_label: "planet popup opened",
    });
  }
  getBalance();
  planetName.value = "";
  buyPlanetPopup.value = true;
}

async function getBalance() {
  try {
    tokenAmount.value = await SpaceRiders.balanceOf($store.getters.address);
  } catch (e) {
    console.log(e);
  }
}

const tokenBalance = computed(() => {
  return tc(tokenAmount.value, { digits: 3 });
});

const canBuyPlanets = computed(() => {
  return true;
});

const balanceColor = computed(() => {
  return canBuyPlanets.value ? getCssVar("positive") : getCssVar("negative");
});

async function buyPlanet() {
  const planetGuid = ObjectID().toHexString();

  const notif = $q.notify(
    $notification("progress", "Waiting for transaction to complete...")
  );

  try {
    const re = await ApiRequest.buyPlanet(planetGuid, planetName.value);

    $store.commit("addPlanet", re.data);
    $eventBus.emit(NEW_PLANET_PURCHASED, { planet: re.data });
    if (process.env.ENV !== "local") {
      event(NEW_PLANET_PURCHASED, {
        event_category: "planet",
        event_label: "planet purchase",
      });
    }

    notif($notification("success", "Planet purchased successfully!"));
  } catch (e) {
    notif($notification("failed", e));

    console.log("error");
    console.log(e);
  }
}
</script>
