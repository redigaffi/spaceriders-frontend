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
    this.$eventBus.on(ACTIVE_PLANET_CHANGED, this.updateAll);

    // On login, request all data.
    this.$eventBus.on(LOGGED_IN, this.updateAll);

    // On page refresh reset all.
    this.updateAll();
  },
  methods: {
    update: async function (activePlanet) {
      
      this.$store.commit("setActivePlanet", activePlanet);
      
      const allPlanetInfo = (await ApiRequest.getAllInfoPlanet(activePlanet.id))
        .data;
      
      this.$store.commit("setResourceData", allPlanetInfo.resources);      
      this.$store.commit("setInstallationData", allPlanetInfo.installation);
      this.$store.commit("setResearchData", allPlanetInfo.research);
      this.$store.commit("setDefenseData", allPlanetInfo.defense);
      this.$store.commit("setConversionRequests", allPlanetInfo.conversion);
      this.$store.commit("addEmails", {emails: allPlanetInfo.email});      
    },
    updateAll: async function () {
      //TODO: Delete all intervals ..
      //this.$store.commit("clearAllIntervalTimeouts");

      if (!this.$store.getters.loggedIn) return;

      let activePlanetId = false;
      if (this.$store.getters.activePlanet) {
        activePlanetId = this.$store.getters.activePlanet.id;
      }

      const planets = (await ApiRequest.getAllPlanets()).data;
      this.$store.commit("setPlanets", planets);

      if (activePlanetId !== false) {
        console.log("active planet")
        let activePlanet = planets.filter((o) => o.id === activePlanetId);
        await this.update(activePlanet[0]);

        // Set default planet
      } else if (!activePlanetId && planets.length > 0) {
        let activePlanets = planets.filter((o) => o.claimed);
        if (activePlanets.length > 0) {
          console.log("no active planet")
          await this.update(activePlanets[0]);
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
