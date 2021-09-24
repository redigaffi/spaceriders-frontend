<template>
  <router-view />
</template>
<script>
import ApiRequest from "./service/http/ApiRequests";
import { defineComponent } from "vue";
import { ACTIVE_PLANET_CHANGED, LOGGED_IN } from "./constants/Events";


export default defineComponent({
  name: "App",
  async created() {
    // On planet change reset all.
    this.$eventBus.on(ACTIVE_PLANET_CHANGED, (e) => {
      this.updateAll();
      
    });

    // On login, request all data.
    this.$eventBus.on(LOGGED_IN, (e) => {
      this.updateAll();
    });
    
    // On page refresh reset all.
    this.updateAll();

  },
  methods: {
    updateAll: async function () {
      if (!this.$store.getters.loggedIn) return;

      let activePlanetId = false;
      if (this.$store.getters.activePlanet) {
        activePlanetId = this.$store.getters.activePlanet.id;
      }

      const planets = (await ApiRequest.getAllPlanets()).data;
      this.$store.commit("setPlanets", planets);

      if (activePlanetId !== false) {
        let activePlanet = planets.filter((o) => o.id === activePlanetId);
        activePlanet = activePlanet[0];
        this.$store.commit("setActivePlanet", activePlanet);
  
        const data = (await ApiRequest.getResourceData(activePlanet.id)).data;
        this.$store.commit("setResourceData", data);
      } else if (!activePlanetId && planets.length > 0) {
        let activePlanet = planets.filter((o) => o.claimed);
        if (activePlanet.length > 0) {
          this.$store.commit("setActivePlanet", activePlanet[0]);
    
          const data = (await ApiRequest.getResourceData(activePlanet[0].id)).data;
          this.$store.commit("setResourceData", data);

        }
      }
    },
  },
});
</script>

<style>
.notify {
  margin-top: 80px;
}
</style>
