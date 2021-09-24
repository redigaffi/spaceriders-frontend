<template>
  <div
    v-if="this.$store.getters.activePlanet !== false"
    class="row justify-center text-center"
  >
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
      ENERGY {{ this.$store.getters.activePlanet.ressources.energy_usage }}/{{
        this.$store.getters.activePlanet.ressources.total_energy
      }}
    </div>
  </div>
</template>

<script>
import {
  RESOURCE_TYPES,
  PETROL,
  METAL,
  CRYSTAL,
  METAL_MINE,
  CRYSTAL_MINE,
  PETROL_MINE,
  METAL_WAREHOUSE,
  PETROL_WAREHOUSE,
  CRYSTAL_WAREHOUSE,
} from "../constants/ResourceType";

export default {
  name: "RessourcesDisplay",
  data() {},
  methods: {
    updateResources: function (rD, resource, mine, warehouse) {
      const upgrading = rD[mine]["upgrading"];
      const maxCapacity = rD[warehouse]["capacity"];
      const current = this.$store.getters.activePlanet.ressources[resource];
    
      if (current < maxCapacity && !upgrading) {
        this.$store.commit("incrementResources", {
          ressource: resource,
          value: rD[mine]["production"],
        });
      }
    },
  },
  created() {
    setInterval(async () => {
      if (this.$store.getters.activePlanet === false) return;
      let rD = this.$store.getters.resourceData;
      for (let resourceTypeIndex in RESOURCE_TYPES) {
        const resourceType = RESOURCE_TYPES[resourceTypeIndex];

        switch (resourceType) {
          case METAL_MINE:
            this.updateResources(rD, METAL, METAL_MINE, METAL_WAREHOUSE);
            break;
          case PETROL_MINE:
            this.updateResources(rD, PETROL, PETROL_MINE, PETROL_WAREHOUSE);
            break;
          case CRYSTAL_MINE:
            this.updateResources(rD, CRYSTAL, CRYSTAL_MINE, CRYSTAL_WAREHOUSE);
            break;
        }
      }
    }, 60000);
  },
};
</script>
