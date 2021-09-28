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

    //TODO: Delete all intervals ..
    
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

      const update = async (activePlanet) => {
          this.$store.commit("setActivePlanet", activePlanet);
  
          const resourceData = (await ApiRequest.getResourceData(activePlanet.id)).data;
          this.$store.commit("setResourceData", resourceData);

          const installationData = (await ApiRequest.getInstallationData(activePlanet.id)).data;
          this.$store.commit("setInstallationData", installationData);
      };

      if (activePlanetId !== false) {
        let activePlanet = planets.filter((o) => o.id === activePlanetId);
        update(activePlanet[0]);
        /* this.$store.commit("setActivePlanet", activePlanet);
  
        const resourceData = (await ApiRequest.getResourceData(activePlanet.id)).data;
        this.$store.commit("setResourceData", resourceData);

        const installationData = (await ApiRequest.getInstallationData(activePlanet.id)).data;
        this.$store.commit("setInstallationData", installationData); */

      // Set default planet
      } else if (!activePlanetId && planets.length > 0) {
        
        let activePlanets = planets.filter((o) => o.claimed);
        if (activePlanets.length > 0) {
          
          update(activePlanets[0]);
          
          /* this.$store.commit("setActivePlanet", activePlanet);
    
          const resourceData = (await ApiRequest.getResourceData(activePlanet.id)).data;
          this.$store.commit("setResourceData", resourceData);

          const installationData = (await ApiRequest.getInstallationData(activePlanet.id)).data;
          this.$store.commit("setInstallationData", installationData); */
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
