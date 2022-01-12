<template>
  <q-btn @click="claimPlanet" color="warning" class="q-px-lg" label="Claim" />

</template>

<script setup>
import ApiRequest from "../service/http/ApiRequests";
import tc from "thousands-counter";
import { PLANET_CLAIMED, ACTIVE_PLANET_CHANGED } from "../constants/Events";
import { ref, getCurrentInstance, toRefs, computed } from "vue";
import { useStore } from "vuex";

import SpaceRidersGameContract, {
  PlanetAttributes,
  SignatureData,
} from "../service/contract/SpaceRidersGameContract";

const $notification = getCurrentInstance().appContext.config.globalProperties.$notification;
const $eventBus = getCurrentInstance().appContext.config.globalProperties.$eventBus;
const $store = useStore();

const props = defineProps({
    planet: Object,
})

const { planet } = toRefs(props);

const planetCongratulationsPopup = ref(false);
const planetNewStats = ref(false);

async function claimPlanet() {
  const closeNotification = $notification(
    "progress",
    "Waiting for transaction to complete...",
    0
  );

  const planetGuid = planet.value.id;
  const data = await ApiRequest.claimPlanet(planetGuid);

  if (!data.success) {
    $notification("failed", data.error, 6000);
    closeNotification();
    return;
  }

  const pA = new PlanetAttributes(
    planetGuid,
    data.diameter,
    data.slots,
    data.minTemperature,
    data.maxTemperature,
    data.galaxy,
    data.solarSystem,
    data.position
  );

  const sD = new SignatureData(data.v, data.r, data.s);
  let receipt = { status: 0 };

  try {
    const tx = await SpaceRidersGameContract.claimPlanet(
      pA,
      data.tokenURI,
      sD
    );

    console.log(tx)

    receipt = await tx.wait();
  } catch (e) {
    console.log("error");
    console.log(e);
  }

  if (receipt.status === 1) {
    const txHash = receipt.transactionHash;
    // confirm claim api call
    const confirmReq = await ApiRequest.confirmClaimPlanet(
      txHash,
      planetGuid
    );

    if (confirmReq.success === true) {
      $notification("success", "Planet claimed successfully!", 6000);

      // First planet is set to default. (In case of first planet purchase)
      if ($store.getters.planets.filter((p) => p.claimed).length === 0) {
        $store.commit("setActivePlanet", confirmReq.data);
      }
      
      $store.commit('updatePlanet', { planet: confirmReq.data, field: "claimed", value: true });
  
      $eventBus.emit(ACTIVE_PLANET_CHANGED, confirmReq.data);
      $eventBus.emit(PLANET_CLAIMED, { planet: confirmReq.data });

    } else {
      $notification("failed", confirmReq.error, 6000);
    }

  } else {
    $notification(
      "failed",
      "Transaction failed, please try again...",
      6000
    );
  }

  closeNotification();
}
</script>
