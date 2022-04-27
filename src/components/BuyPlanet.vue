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
        </q-card-section>
        <q-card-section class="q-gutter-sm q-pt-none">
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
            standout="bg-secondary"
            v-model="planetName"
            label="Planet Name"
            hide-bottom-space
            :rules="[
              (val) => val.length <= 14 || 'Please use maximum 14 characters',
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

        <q-card-actions class="row q-col-gutter-md q-px-md">
          <!-- <q-btn
            class="full-width"
            style="background: #18121e"
            label="Connect to a wallet"
            no-caps
            v-close-popup
          />
        </q-card-section>
        
          /> -->
          <div class="col">
            <IncreaseAllowance
              :address="ContractAddress.getSpaceRidersGameAddress()"
              :amount="planetCost.token_cost"
              :tokenAddress="ContractAddress.getSpaceRidersAddress()"
            />
          </div>
          <div class="col">
            <button
              class="button q-py-sm full-width"
              style="
                border: 2px solid #2253f4;
                border-radius: 5px;
                font-size: 14px;
                box-shadow: 0 0 20px rgb(34 83 244 / 76%);
                color: #fff;
              "
              @click="buyPlanet"
              :disabled="planetName.length > 14"
              v-close-popup
            >
              Buy Planet
            </button>
          </div>
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

import SpaceRidersGameContract, {
  SignatureData,
} from "../service/contract/SpaceRidersGameContract";

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

const planetCostDisplay = ref();
const bnbFeeDisplay = ref();

const visible = ref(true);
watchEffect(async () => {
  if (buyPlanetPopup.value) {
    planetCost.value = "";
    bnbFeeDisplay.value = "";
    visible.value = true;
    planetCost.value = await ApiRequest.fetchPlanetCost();
    planetCostDisplay.value = `${planetCost.value.token_cost} $SPR ($${planetCost.value.usd_cost})`;
    bnbFeeDisplay.value = "0.0025 BNB";
    visible.value = false;
  }
});

async function buyPlanet() {
  const planetGuid = uuidv4();

  const closeNotification = $notification(
    "progress",
    "Waiting for transaction to complete...",
    0
  );

  let receipt = { status: 0 };

  const planetCostData = await ApiRequest.fetchPlanetCostData(planetGuid);
  const sD = new SignatureData(
    planetCostData.v,
    planetCostData.r,
    planetCostData.s
  );

  try {
    const tx = await SpaceRidersGameContract.buyPlanet(
      planetGuid,
      planetCostData.price,
      sD,
      planetCostData.tokenURI
    );
    receipt = await tx.wait();
    console.log(receipt);
  } catch (e) {
    console.log("error");
    console.log(e);
  }

  if (receipt.status === 1) {
    const txHash = receipt.transactionHash;
    const re = await ApiRequest.buyPlanet(txHash, planetGuid, planetName.value);

    if (re.success) {
      closeNotification();
      $notification("success", "Planet purchases successfully!", 6000);
    } else {
      closeNotification();
      $notification("failed", re.error, 6000);
      console.error(`${planetGuid}`);
    }

    $eventBus.emit(NEW_PLANET_PURCHASED, { planet: re.data });
    $store.commit("addPlanet", re.data);
  } else {
    closeNotification();
    $notification("failed", "Something failed, please try again!", 1500);
  }

  closeNotification();
}
</script>
