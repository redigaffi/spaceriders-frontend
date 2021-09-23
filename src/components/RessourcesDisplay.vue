<template>
  <div  class="row justify-center text-center" >
      <div style="border: 1px solid white">
        METAL: 100
      </div>
      <div style="border: 1px solid white">
        PETROL 100
      </div>
      <div style="border: 1px solid white">
        CRYSTAL 100
      </div>
      <div style="border: 1px solid white">
        ENERGY 100
      </div>
  </div>
</template>

<script>
import ApiRequests from 'src/service/http/ApiRequests'
import { ACTIVE_PLANET_CHANGED } from "../constants/Events";

export default {
  name: 'RessourcesDisplay',
  data() {
    return {
      activePlanet: false,
    }
  },

  created() {
    this.activePlanet = this.$store.getters.activePlanet;
    
    this.$eventBus.on(ACTIVE_PLANET_CHANGED, (p) => {
      this.activePlanet = p;
    });

    //TODO: Insted of API calls, get production/hour and make sum on frontend.
    setInterval(async () => {
      if (!this.activePlanet) return;
      const planetData = await ApiRequests.getActivePlanet(this.activePlanet.id);
      this.activePlanet = planetData.data;
    }, 30000);
  }
}
</script>
