<template>
  <q-btn @click="claimPlanet" color="warning" class="q-px-lg" label="Claim" />

</template>

<script setup>
import ApiRequest from "../service/http/ApiRequests";
import { PLANET_CLAIMED, ACTIVE_PLANET_CHANGED } from "../constants/Events";
import { getCurrentInstance, toRefs } from "vue";
import { useStore } from "vuex";

const $notification = getCurrentInstance().appContext.config.globalProperties.$notification;
const $eventBus = getCurrentInstance().appContext.config.globalProperties.$eventBus;
const $store = useStore();

const props = defineProps({
    planet: Object,
})

const { planet } = toRefs(props);

async function claimPlanet() {
  const closeNotification = $notification(
    "progress",
    "Waiting for transaction to complete...",
    0
  );

  const planetGuid = planet.value.id;
  try {
    const apiCall = await ApiRequest.claimPlanet(planetGuid);
    const data = apiCall.data;
    $notification("success", "Planet claimed successfully!", 6000);
    
    // First planet is set to default. (In case of first planet purchase)
    if ($store.getters.planets.filter((p) => p.claimed).length === 0) {
      $store.commit("setActivePlanet", data);
      $eventBus.emit(ACTIVE_PLANET_CHANGED, data);
    }
    
    $store.commit('updatePlanet', { planet: data, field: "claimed", value: true });
    $eventBus.emit(PLANET_CLAIMED, { planet: data });
    
    closeNotification();

  } catch(e) {
    $notification("failed", e, 6000);
    closeNotification();
  }
}
</script>
