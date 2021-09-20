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
        <ClaimPlanet @planet-confirmed="deleteFromList" :planet="uP" :claimable="!isClaimable(uP)" />
      </q-card-actions>
    </q-card>

  </div>
  </div>
</template>

<script>
import ClaimPlanet from "../components/ClaimPlanet.vue";
import ApiRequest from "../service/http/ApiRequests";

export default {
  name: "ClaimPlanetList",
  components: {
    ClaimPlanet,
  },

  data: function () {
    return {
      unclaimedPlanets: [
        {
          claimable: 1632138522,
          claimed: false,
          claimedHash: "",
          diameter: null,
          galaxy: null,
          id: "20a1e2e5-a766-4e46-943c-e35a7c75d93b",
          image: "",
          max_temperature: null,
          min_temperature: null,
          name: "test",
          position: null,
          slots: null,
          solar_system: null,
          user: "0x86e62e8447e3CBb73E4bBa42D2aa64067FC52bE4"
        },

        {
          claimable: 1632137591,
          claimed: false,
          claimedHash: "",
          diameter: null,
          galaxy: null,
          id: "f1393ff2-cdd6-4ecb-95ca-fe23bccb60da",
          image: "",
          max_temperature: null,
          min_temperature: null,
          name: "tews",
          position: null,
          slots: null,
          solar_system: null,
          user: "0x86e62e8447e3CBb73E4bBa42D2aa64067FC52bE4"
        }
      ]
    };
  },
  created() {
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
      const minutes = diffSeconds/60;
      
      const m = Math.round(minutes % 60);
      const h = Math.round(minutes - m)/60

      let str = "";
      if (h > 0) str+= `${h}h`;
      if (m >= 0) str+= ` ${m}m`;

      if (str === "") str = "CLAIMABLE!";

      return str;
    },

    updateUnclaimedPlanets: async function () {
      //this.unclaimedPlanets = (await ApiRequest.getUnClaimPlanet()).data;
      console.log(this.unclaimedPlanets)
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
