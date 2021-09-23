<template>
  <div v-if="this.activePlanet != false" class="row justify-center text-center" >
      <div style="border: 1px solid white">
        METAL: {{ this.$store.getters.activePlanet.ressources.metal }}
      </div>
      <div style="border: 1px solid white">
        PETROL {{ this.$store.getters.activePlanet.ressources.petrol }}
      </div>
      <div style="border: 1px solid white">
        CRYSTAL {{ this.$store.getters.activePlanet.ressources.crystal }}
      </div>
      <div style="border: 1px solid white">
        ENERGY {{ this.$store.getters.activePlanet.ressources.energy_usage }}/{{ this.$store.getters.activePlanet.ressources.total_energy }}
      </div>
  </div>
</template>

<script>
import ApiRequests from 'src/service/http/ApiRequests'
import { ACTIVE_PLANET_CHANGED } from "../constants/Events";
import { RESOURCE_TYPES, METAL_MINE, CRYSTAL_MINE, PETROL_MINE } from "../constants/ResourceType";

export default {
  name: 'RessourcesDisplay',
  data() {
    return {
      activePlanet: false,
    }
  },

  created() {
    //TODO: clean this??
    this.activePlanet = this.$store.getters.activePlanet;
    
    this.$eventBus.on(ACTIVE_PLANET_CHANGED, (p) => {
      this.activePlanet = p;
    });

    //TODO: Insted of API calls, get production/hour and make sum on frontend.
    setInterval(async () => {
      if (!this.activePlanet) return;
      
      
      let rD = this.$store.getters.resourceData;
      for (let resourceTypeIndex in RESOURCE_TYPES) {
        const resourceType = RESOURCE_TYPES[resourceTypeIndex];
        
        switch (resourceType) {
          //TODO: Check for max capacity
          case METAL_MINE:
              this.$store.commit('incrementResources', {ressource: 'metal', value: rD[METAL_MINE]['production']})    
            break;
          case PETROL_MINE:
              this.$store.commit('incrementResources', {ressource: 'petrol', value: rD[PETROL_MINE]['production']})    
            break;
          case CRYSTAL_MINE:
              this.$store.commit('incrementResources', {ressource: 'crystal', value: rD[CRYSTAL_MINE]['production']})    
            break;
        }
      } 
    }, 60000);
  }
}
</script>
