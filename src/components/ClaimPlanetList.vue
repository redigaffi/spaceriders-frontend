<template>
  <div class="justify-center">

  <div v-for="uP in this.unclaimedPlanets" :key="uP.id">
    <q-card  class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Name {{ uP.name }}</div>
        <div class="text-subtitle2">Claimable in {{ this.calculateClaimDate(uP) }}</div> 
      </q-card-section>

      <q-separator />

      <q-card-actions align="center">
        <ClaimPlanet :planet="uP" :claimable="!isClaimable(uP)" />
      </q-card-actions>
    </q-card>

  </div>
  </div>
</template>

<script>
import ClaimPlanet from "../components/ClaimPlanet.vue";
import ApiRequest from "../service/http/ApiRequests";
import { NEW_PLANET_PURCHASED, PLANET_CLAIMED } from "../constants/Events";

export default {
  name: "ClaimPlanetList",
  components: {
    ClaimPlanet,
  },

  data: function () {
    return {
      unclaimedPlanets: []
    };
  },
  created() {
    this.$eventBus.on(NEW_PLANET_PURCHASED, (e) => {
      this.updateUnclaimedPlanets();
    });

    this.$eventBus.on(PLANET_CLAIMED, (e) => {
      this.deleteFromList(e);
    });

    this.updateUnclaimedPlanets();
  },
  
  methods: {
    isClaimable: function(planet) {
      const now = new Date();
      const claimDate = new Date(planet.claimable * 1000);  
      const diff = claimDate.getTime() - now.getTime();
    
      return diff <= 0;
    },

    calculateClaimDate: function (planet) {
      const now = new Date();
      const claim = new Date(planet.claimable * 1000);
      
      const diffSeconds = (claim.getTime() - now.getTime()) / 1000;
      const minutes = Math.round(diffSeconds/60);
      
      const m = Math.round(minutes % 60);
      const h = Math.round(minutes - m)/60

      let str = "";
      if (h > 0) str+= `${h}h`;
      if (m >= 0) str+= ` ${m}m`;

      if (str === "") str = "CLAIMABLE!";

      return str;
    },

    updateUnclaimedPlanets: async function () {
      this.unclaimedPlanets = (await ApiRequest.getUnClaimPlanet()).data;
    },

    deleteFromList: function (data) {
      const planetGuid = data.planetGuid;
      this.unclaimedPlanets = this.unclaimedPlanets.filter(
        (el) => el.id !== planetGuid
      );
    },
  },
};
</script>

<style lang="sass">
.my-card
  width: 100%
  float: left
  max-width: 200px
  margin-left:20px
  margin-top: 20px
</style>
