<template>
  <div @click="convertResourcesDialog = true">
    <slot></slot>
  </div>
  <q-dialog v-model="convertResourcesDialog">
    <q-card
      class="bg-dark text-white"
      style="width: 600px; max-width: 70vw; border-radius: 20px"
    >
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="text-body2 absolute-center"
          >RESOURCE CONVERSION</q-toolbar-title
        >
        <q-btn round flat icon="close" v-close-popup />
      </q-toolbar>

      <div v-if="pendingConversions.length <= 0">
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-3">
            <div class="text-center text-subtitle2">
              <div>
                <img
                  src="~assets/img/resources/RES_ic_Metal.png"
                  alt
                  srcset
                  class="resource-icon-small"
                />
                <!-- <div class="text-white">-{{ metalAmount }} Metal</div> -->
                <div class="text-weight-bold neonText">
                  Metal Price: {{ metalCostUsd }}$
                </div>
              </div>
            </div>
          </div>
          <div class="col full-height q-pt-lg">
            <q-slide-transition>
              <div>
                <q-slider
                  v-model="metalAmount"
                  :min="0"
                  :max="maxMetalConversion"
                  color="warning"
                  class="custom-slider-track"
                />
                <div class="text-white text-center">
                  -{{ metalAmount }} Metal
                </div>
              </div>
            </q-slide-transition>
          </div>
        </q-card-section>

        <q-card-section class="row q-col-gutter-sm">
          <div class="col-3">
            <div class="text-center text-subtitle2">
              <div>
                <img
                  src="~assets/img/resources/RES_ic_FUEL5.png"
                  alt
                  srcset
                  class="resource-icon-small"
                />

                <div class="text-weight-bold neonText">
                  Petrol Price: {{ petrolCostUsd }}$
                </div>
              </div>
            </div>
          </div>
          <div class="col full-height q-pt-lg">
            <q-slide-transition>
              <div>
                <q-slider
                  v-model="petrolAmount"
                  :min="0"
                  :max="maxPetrolConversion"
                  color="warning"
                  class="custom-slider-track"
                />
                <div class="text-white text-center">
                  -{{ petrolAmount }} PETROL
                </div>
              </div>
            </q-slide-transition>
          </div>
        </q-card-section>

        <q-card-section class="row q-col-gutter-sm">
          <div class="col-3">
            <div class="text-center text-subtitle2">
              <div>
                <img
                  src="~assets/img/resources/RES_ic_CRYSTAL.png"
                  alt
                  class="resource-icon-small"
                  srcset
                />
                <!-- <div class="text-white">-{{ crystalAmount }} Crystal</div> -->
                <div class="text-weight-bold neonText">
                  Crystal Price: {{ crystalCostUsd }}$
                </div>
              </div>
            </div>
          </div>
          <div class="col full-height q-pt-lg">
            <q-slide-transition>
              <div>
                <q-slider
                  v-model="crystalAmount"
                  :min="0"
                  :max="maxCrystalConversion"
                  color="warning"
                  class="custom-slider-track"
                />
                <div class="text-white text-center">
                  -{{ crystalAmount }} CRYSTAL
                </div>
              </div>
            </q-slide-transition>
          </div>
        </q-card-section>

        <q-card-section>
          <q-card flat>
            <q-card-section class="text-center">
              <q-badge
                style="
                  border: 2px solid #21ba45;
                  border-radius: 5px;
                  font-size: 14px;
                  box-shadow: 0 0 20px #21ba45;
                  color: #fff;
                "
                class="text-subtitle2 q-px-lg q-mb-md"
              >
                <span class="q-pl-md text-weight-bold"
                  >${{ totalUsdWithdraw }} - ({{
                    totalTokenWithdraw
                  }}
                  $SPR)</span
                >
              </q-badge>
              <br />
              <q-badge
                v-if="fee != false"
                style="
                  border: 2px solid red;
                  border-radius: 5px;
                  font-size: 14px;
                  box-shadow: 0 0 20px red;
                  color: #fff;
                "
                class="q-mt-xs text-subtitle2 q-px-lg"
              >
                <span class="q-pl-md text-weight-bold"
                  >Fee: {{ fee }}% - ${{ totalUsdWithdrawFee }} ({{
                    totalTokenWithdrawFee
                  }}) $SPR</span
                >
              </q-badge>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <button
            class="button q-pa-md q-mr-xs"
            style="
              border: 3px solid #2253f4;
              border-radius: 5px;
              box-shadow: 0 0 20px rgb(34 83 244 / 76%);
              color: #fff;
              font-size: 12px;
              padding: 7px 15px;
            "
            @click="convertRequest"
            :disabled="totalTokenWithdrawFee <= 0"
            v-close-popup
          >
            CONVERT
          </button>
        </q-card-section>
      </div>
      <div v-else>
        <q-card-section>
          <q-card flat>
            <q-card-section>
              <q-card
                flat
                class="bg-transparent row q-col-gutter-sm justify-between q-py-md"
              >
                <span class="text-h6">Pending Conversions</span>
                <span class="text-h8"
                  >Please confirm before creating new conversions
                </span>
              </q-card>
            </q-card-section>

            <q-card-section class="text-center">
              <div
                v-for="pendingConversion in pendingConversions"
                :key="pendingConversion.id"
              >
                <q-btn
                  color="black"
                  class="full-width"
                  @click="retryConversion(pendingConversion)"
                  :label="
                    pendingConversion.date +
                    ' - ' +
                    pendingConversion.token +
                    ' $SPR'
                  "
                />
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </div>
      <q-inner-loading :showing="visible">
        <q-spinner size="70px" color="warning" />
      </q-inner-loading>
    </q-card>
  </q-dialog>

  <q-dialog v-model="testDialog2">
    <q-card
      class="bg-dark text-white"
      style="
        width: 1000px;
        max-width: 70vw;
        border-radius: 20px;
        max-width: 70vw;
        border-radius: 20px;
      "
    >
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="text-body2 absolute-center"
          >RESOURCES CONVERSION</q-toolbar-title
        >
        <q-btn round flat icon="close" v-close-popup />
      </q-toolbar>

      <div class="row q-col-gutter-md">
        <div class="col-5 flex flex-center">
          <q-card class="bg-dark text-white" style="" flat>
            <q-toolbar class="bg-primary" style="
                  border: 2px solid white;
                  border-radius: 5px;
                  font-size: 14px;
                  box-shadow: 0 0 20px white;
                  color: #fff;
                ">
              <q-toolbar-title
                class="text-body2 text-center"
                style="color: gold"
                >RARITY MULTIPLIER</q-toolbar-title
              >
            </q-toolbar>
            <q-card-section>
              <q-list dense>
                <q-item>
                  <q-item-section class="col-6"> METAL </q-item-section>
                  <q-item-section
                    class="text-right"
                    style="border-left: 3px solid white; padding-left: 10px"
                  >
                    1.0
                  </q-item-section>
                </q-item>
                <q-item class="q-py-none">
                  <q-item-section class="col-6"> PETROL </q-item-section>
                  <q-item-section
                    class="text-right"
                    style="border-left: 3px solid white; padding-left: 10px"
                  >
                    1.0
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="col-6"> CRYSTAL </q-item-section>
                  <q-item-section
                    class="text-right"
                    style="border-left: 3px solid white; padding-left: 10px"
                  >
                    1.0
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-toolbar class="bg-primary text-white" style="
                  border: 2px solid white;
                  border-radius: 5px;
                  font-size: 14px;
                  box-shadow: 0 0 20px white;
                  color: #fff;
                ">
              <q-toolbar-title
                class="text-body2 text-center"
                style="color: gold"
                >BONUS MULTIPLIER</q-toolbar-title
              >
            </q-toolbar>
            <q-card-section>
              <q-list dense>
                <q-item>
                  <q-item-section class="col-6">
                    Level Bonus MULTIPLIER
                  </q-item-section>
                  <q-item-section
                    class="text-right"
                    style="border-left: 3px solid white; padding-left: 10px"
                  >
                    1.0
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <q-card-section class="row q-col-gutter-sm">
            <div class="col-3">
              <div class="text-center text-subtitle2">
                <div>
                  <img
                    src="~assets/img/resources/RES_ic_Metal.png"
                    alt
                    srcset
                    class="resource-icon-small"
                  />
                  <!-- <div class="text-white">-{{ metalAmount }} Metal</div> -->
                  <div class="text-weight-bold neonText">Metal Price: 1$</div>
                </div>
              </div>
            </div>
            <div class="col full-height q-pt-lg">
              <q-slide-transition>
                <div>
                  <q-slider
                    :min="0"
                    color="warning"
                    class="custom-slider-track"
                  />
                  <div class="text-white text-center">-1 Metal</div>
                </div>
              </q-slide-transition>
            </div>
          </q-card-section>

          <q-card-section class="row q-col-gutter-sm">
            <div class="col-3">
              <div class="text-center text-subtitle2">
                <div>
                  <img
                    src="~assets/img/resources/RES_ic_FUEL5.png"
                    alt
                    srcset
                    class="resource-icon-small"
                  />

                  <div class="text-weight-bold neonText">Petrol Price: 1$</div>
                </div>
              </div>
            </div>
            <div class="col full-height q-pt-lg">
              <q-slide-transition>
                <div>
                  <q-slider
                    :min="0"
                    color="warning"
                    class="custom-slider-track"
                  />
                  <div class="text-white text-center">-1 PETROL</div>
                </div>
              </q-slide-transition>
            </div>
          </q-card-section>

          <q-card-section class="row q-col-gutter-sm">
            <div class="col-3">
              <div class="text-center text-subtitle2">
                <div>
                  <img
                    src="~assets/img/resources/RES_ic_CRYSTAL.png"
                    alt
                    class="resource-icon-small"
                    srcset
                  />
                  <!-- <div class="text-white">-{{ crystalAmount }} Crystal</div> -->
                  <div class="text-weight-bold neonText">Crystal Price: 1$</div>
                </div>
              </div>
            </div>
            <div class="col full-height q-pt-lg">
              <q-slide-transition>
                <div>
                  <q-slider
                    :min="0"
                    color="warning"
                    class="custom-slider-track"
                  />
                  <div class="text-white text-center">-1 CRYSTAL</div>
                </div>
              </q-slide-transition>
            </div>
          </q-card-section>

          <q-card-section class="row q-col-gutter-md">
            <div class="col">
              <q-badge
                style="
                  border: 2px solid #21ba45;
                  border-radius: 5px;
                  font-size: 14px;
                  box-shadow: 0 0 20px #21ba45;
                  color: #fff;
                "
                class="text-subtitle2 q-px-lg q-mb-md full-width"
              >
                <span class="text-left text-weight-bold">$1 - 1 $SPR</span>
              </q-badge>
              <br />
              <q-badge
                style="
                  border: 2px solid red;
                  border-radius: 5px;
                  font-size: 14px;
                  box-shadow: 0 0 20px red;
                  color: #fff;
                "
                class="q-mt-xs text-subtitle2 q-px-lg full-width"
              >
                <span class="text-weight-bold">Fee: 1 $SPR</span>
              </q-badge>

              <div class="q-pt-md text-right">
                <button
                  class="button q-pa-md q-mr-xs"
                  style="
                    border: 3px solid #2253f4;
                    border-radius: 5px;
                    box-shadow: 0 0 20px rgb(34 83 244 / 76%);
                    color: #fff;
                    font-size: 12px;
                    padding: 7px 15px;
                  "
                  v-close-popup
                >
                  CONVERT
                </button>
              </div>
            </div>
          </q-card-section>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <q-dialog v-model="testDialog">
    <q-card
      class="bg-dark text-white"
      style="
        width: 600px;
        max-width: 70vw;
        border-radius: 20px;
        border: 3px solid gold;
        box-shadow: 0 0 20px gold;
      "
    >
      <q-toolbar class="bg-primary">
        <q-toolbar-title class="text-body2 text-center" style="color: gold"
          >RARITY MULTIPLIERº</q-toolbar-title
        >
      </q-toolbar>
      <q-card-section>
        <q-list dense>
          <q-item>
            <q-item-section class="col-6"> METAL </q-item-section>
            <q-item-section
              style="border-left: 3px solid white; padding-left: 10px"
            >
              1.0
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="col-6"> PETROL </q-item-section>
            <q-item-section
              style="border-left: 3px solid white; padding-left: 10px"
            >
              1.0
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="col-6"> CRYSTAL </q-item-section>
            <q-item-section
              style="border-left: 3px solid white; padding-left: 10px"
            >
              1.0
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="text-body2 text-center" style="color: gold"
          >BONUS MULTIPLIER</q-toolbar-title
        >
      </q-toolbar>
      <q-card-section>
        <q-list dense>
          <q-item>
            <q-item-section class="col-6">
              Level Bonus MULTIPLIER
            </q-item-section>
            <q-item-section
              style="border-left: 3px solid white; padding-left: 10px"
            >
              1.0
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { CONVERT_COMPLETED } from "../constants/Events";
import ApiRequests from "../service/http/ApiRequests";
import SpaceRidersGameContract, {
  SignatureData,
  TokenExchangeAttributes,
} from "../service/contract/SpaceRidersGameContract";

const testDialog = ref(false);
const testDialog2 = ref(false);
const $store = useStore();
const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;
const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;
const convertResourcesDialog = ref(false);
const visible = ref(true);
const maxMetalConversion = computed(() => {
  return $store.getters.activePlanet.ressources.metal;
});
const maxCrystalConversion = computed(() => {
  return $store.getters.activePlanet.ressources.crystal;
});
const maxPetrolConversion = computed(() => {
  return $store.getters.activePlanet.ressources.petrol;
});
const activePlanet = computed(() => {
  return $store.getters.activePlanet;
});
const metalAmount = ref(0);
const crystalAmount = ref(0);
const petrolAmount = ref(0);
const metalCostUsd = ref(0);
const petrolCostUsd = ref(0);
const crystalCostUsd = ref(0);
const fee = ref(false);
const pendingConversions = ref(false);
const updatePreviewData = async () => {
  metalAmount.value = 0;
  crystalAmount.value = 0;
  petrolAmount.value = 0;
  const data = (await ApiRequests.getPreviewConversion(activePlanet.value.id))
    .data;
  metalCostUsd.value = data.metalCost;
  petrolCostUsd.value = data.petrolCost;
  crystalCostUsd.value = data.crystalCost;
  fee.value = data.fee;
};
const totalUsdWithdraw = computed(() => {
  return (
    metalAmount.value * metalCostUsd.value +
    petrolAmount.value * petrolCostUsd.value +
    crystalAmount.value * crystalCostUsd.value
  ).toFixed(2);
});
const totalUsdWithdrawFee = computed(() => {
  const usd = totalUsdWithdraw.value;
  const feeMultiplier = (100 - fee.value) / 100;
  return (usd * feeMultiplier).toFixed(2);
});
const totalTokenWithdraw = computed(() => {
  const totalUsd = totalUsdWithdraw.value;
  const sprPrice = $store.getters.tokenPrice;
  return ((1 / sprPrice) * totalUsd).toFixed(2);
});
const totalTokenWithdrawFee = computed(() => {
  const tokens = totalTokenWithdraw.value;
  const feeMultiplier = (100 - fee.value) / 100;
  return (tokens * feeMultiplier).toFixed(2);
});
const getPendingConversions = async () => {
  return (await ApiRequests.getPendingConversions(activePlanet.value.id)).data;
};
const reloadDialog = async () => {
  visible.value = true;
  pendingConversions.value = await getPendingConversions();
  if (pendingConversions.value.length <= 0) {
    await updatePreviewData();
  }
  visible.value = false;
};
watch(async () => {
  if (convertResourcesDialog.value) {
    await reloadDialog();
  }
});
async function convertRequest() {
  const closeNotification = $notification(
    "progress",
    "Waiting for transaction to complete...",
    0
  );
  const body = {
    planetId: $store.getters.activePlanet.id,
    metal: metalAmount.value,
    crystal: crystalAmount.value,
    petrol: petrolAmount.value,
  };
  const re = await ApiRequests.conversionRequest(body);
  if (re.success) {    
    if ($store.getters.activePlanet.freePlanet) {
      $eventBus.emit(CONVERT_COMPLETED);
      closeNotification();
      $notification("success", "Tokens converted successfully!", 6000);
      return;
    }

    const sD = new SignatureData(re.data.v, re.data.r, re.data.s);
    const tokenRequestExchange = new TokenExchangeAttributes(
      re.data.id,
      re.data.tokens,
      re.data.forAddress
    );
    let receipt = { status: 0 };
    try {
      const tx = await SpaceRidersGameContract.convertFromPrimaryResources(
        sD,
        tokenRequestExchange
      );
      receipt = await tx.wait();
      console.log(receipt);
      const confirm = await await ApiRequests.confirmConversion({
        planetId: $store.getters.activePlanet.id,
        guid: re.data.id,
      });
      if (!confirm.success) {
        closeNotification();
        $notification("failed", "Something failed...", 6000);
        return;
      }
      $eventBus.emit(CONVERT_COMPLETED);
      closeNotification();
      $notification("success", "Tokens converted successfully!", 6000);
    } catch (e) {
      // let api know request failed
      console.log("error");
      console.log(e);
      closeNotification();
      $notification("failed", "Something failed...", 6000);
    }
  } else {
    closeNotification();
    $notification("failed", re.error, 6000);
    console.error(`error`);
  }
  closeNotification();
}
async function retryConversion(pendingConversion) {
  const closeNotification = $notification(
    "progress",
    "Waiting for transaction to complete...",
    0
  );
  const action = pendingConversion.action;
  if (action === "CALL_SMART_CONTRACT") {
    const retryApi = await ApiRequests.retryConversion({
      planetId: $store.getters.activePlanet.id,
      guid: pendingConversion.id,
    });
    if (retryApi.success) {
      try {
        const sD = new SignatureData(
          retryApi.data.v,
          retryApi.data.r,
          retryApi.data.s
        );
        const tokenRequestExchange = new TokenExchangeAttributes(
          retryApi.data.id,
          retryApi.data.tokens,
          retryApi.data.forAddress
        );
        const tx = await SpaceRidersGameContract.convertFromPrimaryResources(
          sD,
          tokenRequestExchange
        );
        const receipt = await tx.wait();
        console.log(receipt);
        const confirm = await await ApiRequests.confirmConversion({
          planetId: $store.getters.activePlanet.id,
          guid: retryApi.data.id,
        });
        if (!confirm.success) {
          closeNotification();
          $notification("failed", "Something failed...", 6000);
          return;
        }
        await reloadDialog();
        closeNotification();
        $notification("success", "Confirmation completed!", 6000);
      } catch (e) {
        // let api know request failed
        console.log("error");
        console.log(e);
        closeNotification();
        $notification("failed", "Something failed...", 6000);
      }
    } else {
      closeNotification();
      $notification("failed", retryApi.error, 6000);
      return;
    }
  } else if (action === "CONFIRM_API") {
    const confirm = await await ApiRequests.confirmConversion({
      planetId: $store.getters.activePlanet.id,
      guid: pendingConversion.id,
    });
    if (!confirm.success) {
      closeNotification();
      $notification("failed", "Something failed...", 6000);
      return;
    }
    await reloadDialog();
    closeNotification();
    $notification("success", "Confirmation completed!", 6000);
  }
  closeNotification();
}
</script>
<style lang="scss">
.custom-slider-track {
  .q-slider__track-container {
    border: 1px solid white;
    box-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff;
  }
}
</style>
