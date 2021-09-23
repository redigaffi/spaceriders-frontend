<template>
  <router-view />
</template>
<script>
import ApiRequest from './service/http/ApiRequests'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  async created() {
    if (!this.$store.getters.loggedIn) return;

    // On page refresh reset all.
    const activePlanetId = this.$store.getters.activePlanet.id;
    
    const planets = (await ApiRequest.getPlanets()).data;
    this.$store.commit("setPlanets", { planets: planets})

    let activePlanet = planets.filter((o) => o.id === activePlanetId);
    activePlanet = activePlanet[0];
    this.$store.commit("setActivePlanet", activePlanet);
    
    const data = (await ApiRequest.getResourceData(activePlanet.id)).data
    this.$store.commit('setResourceData', data);
  }
})
</script>

<style>
.notify {
  margin-top: 80px;
}
</style>