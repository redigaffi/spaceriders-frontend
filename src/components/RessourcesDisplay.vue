<template>
  <div class="q-pt-lg container">
    <!-- RESOURCES TAB -->
    <q-card
      v-if="activePlanet !== false"
      flat
      class="bg-transparent text-secondary text-center row justify-center"
    >
      <div class="col-xs-6 col-sm-3 q-pa-sm" style="width: 140px">
        <q-btn stack flat rounded class="btn-glass-element">
          <img
            src="~assets/img/silver.jpg"
            style="width: 100px; height: 66px"
            alt=""
            srcset=""
          />
          <p>{{ this.$store.getters.activePlanet.ressources.metal }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Metal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available </q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  {{this.$store.getters.activePlanet.ressources.metal}}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-2 text-right">
                  {{ metalCapacity }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production</q-item-section>
                </q-item-section>
                <q-item-section class="col-2 text-right text-positive">
                  +{{ metalProduction }}/min
                </q-item-section>
              </q-item>
              
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-xs-6 col-sm-3 q-pa-sm" style="width: 140px">
        <q-btn stack flat rounded class="btn-glass-element">
          <img
            src="~assets/img/silver.jpg"
            style="width: 100px; height: 66px"
            alt=""
            srcset=""
          />
          <p>{{ this.$store.getters.activePlanet.ressources.crystal }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Crystal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  {{ this.$store.getters.activePlanet.ressources.crystal }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-2 text-right">
                  {{ crystalCapacity }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production</q-item-section>
                </q-item-section>
                <q-item-section class="col-2 text-right text-positive">
                  +{{ crystalProduction }}/min
                </q-item-section>
              </q-item>
              
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-xs-6 col-sm-3 q-pa-sm" style="width: 140px">
        <q-btn stack flat rounded class="btn-glass-element">
          <img
            src="~assets/img/silver.jpg"
            style="width: 100px; height: 66px"
            alt=""
            srcset=""
          />
          <p>{{ this.$store.getters.activePlanet.ressources.petrol }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Petrol</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  {{ this.$store.getters.activePlanet.ressources.petrol }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-2 text-right">
                  {{ petrolCapacity }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production</q-item-section>
                </q-item-section>
                <q-item-section class="col-2 text-right text-positive">
                  +{{ petrolProduction }}/min
                </q-item-section>
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-xs-6 col-sm-3 q-pa-sm" style="width: 140px">
        <q-btn stack flat rounded class="btn-glass-element">
          <img
            src="~assets/img/silver.jpg"
            style="width: 100px; height: 66px"
            alt=""
            srcset=""
          />
          <p>{{ energyLeft }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Energy</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production </q-item-section>
                </q-item-section>
                <q-item-section class="col-1 text-right text-positive">
                  +{{ energyProduction }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Usage</q-item-section>
                </q-item-section>
                <q-item-section class="col-1 text-right text-negative">
                  -{{ this.$store.getters.activePlanet.ressources.energy_usage }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>
import {
  RESOURCE_TYPES,
  METAL_MINE,
  PETROL_MINE,
  CRYSTAL_MINE,
  METAL,
  PETROL,
  CRYSTAL,
  METAL_WAREHOUSE,
  CRYSTAL_WAREHOUSE,
  PETROL_WAREHOUSE,
} from "../constants/ResourceType";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "RessourcesDisplay",
  setup() {
    const $store = useStore();
    
    const activePlanet = computed(() => {
      const currentPlanet = $store.getters.activePlanet;
      if (currentPlanet === false) return false;

      return currentPlanet;
    });

    const metalProduction = computed(() => {
      if ($store.getters.resourceData.metalMine === undefined) return;

      const currentLevel = $store.getters.resourceData.metalMine.level;
      return $store.getters.resourceData.metalMine.upgrades[currentLevel].production;
    });

    const petrolProduction = computed(() => {
      if ($store.getters.resourceData.petrolMine === undefined) return;

      const currentLevel = $store.getters.resourceData.petrolMine.level;
      return $store.getters.resourceData.petrolMine.upgrades[currentLevel].production;
    });

    const crystalProduction = computed(() => {
      if ($store.getters.resourceData.crystalMine === undefined) return;

      const currentLevel = $store.getters.resourceData.crystalMine.level;
      return $store.getters.resourceData.crystalMine.upgrades[currentLevel].production;
    });

    const metalCapacity = computed(() => {
      if ($store.getters.resourceData.metalWarehouse === undefined) return;

      const currentLevel = $store.getters.resourceData.metalWarehouse.level;
      return $store.getters.resourceData.metalWarehouse.upgrades[currentLevel].capacity;
    });
    
    const petrolCapacity = computed(() => {
      if ($store.getters.resourceData.petrolWarehouse === undefined) return;
      const currentLevel = $store.getters.resourceData.petrolWarehouse.level;
      return $store.getters.resourceData.petrolWarehouse.upgrades[currentLevel].capacity;
    });

    const crystalCapacity = computed(() => {
      if ($store.getters.resourceData.crystalWarehouse === undefined) return;

      const currentLevel = $store.getters.resourceData.crystalWarehouse.level;
      return $store.getters.resourceData.crystalWarehouse.upgrades[currentLevel].capacity;
    });

    const energyProduction = computed(() => {
      if ($store.getters.resourceData.solarPlant === undefined) return;
      const currentLevel = $store.getters.resourceData.solarPlant.level;
      return $store.getters.resourceData.solarPlant.upgrades[currentLevel].production;
    });
    
    const energyLeft = computed(() => {
      if ($store.getters.resourceData.solarPlant === undefined) return;

      const currentLevel = $store.getters.resourceData.solarPlant.level;
      const currentUsage = $store.getters.activePlanet.ressources.energy_usage
      return $store.getters.resourceData.solarPlant.upgrades[currentLevel].production - currentUsage;
    });

    const updateResources = (rD, resource, mine, warehouse) => {
      const upgrading = rD[mine]["upgrading"];
      const maxCapacity = rD[warehouse]["capacity"];
      const current = $store.getters.activePlanet.ressources[resource];
      
      let production = false;
      switch (mine) {
        case METAL_MINE:
          production = metalProduction.value;
          break;

        case PETROL_MINE:
          production = petrolProduction.value;
          break;

        case CRYSTAL_MINE:
          production = crystalProduction.value;
          break;
      }

      if (current < maxCapacity && !upgrading) {
        $store.commit("incrementResources", {
          ressource: resource,
          value: production,
        });
      }
    };

    setInterval(async () => {
      if ($store.getters.activePlanet === false) return;
      if ($store.getters.planets.filter((p) => p.claimed).length === 0)
        return;
      console.log("interval resource update");
      let rD = $store.getters.resourceData;
      for (let resourceTypeIndex in RESOURCE_TYPES) {
        const resourceType = RESOURCE_TYPES[resourceTypeIndex];

        switch (resourceType) {
          case METAL_MINE:
            updateResources(rD, METAL, METAL_MINE, METAL_WAREHOUSE);
            break;
          case PETROL_MINE:
            updateResources(rD, PETROL, PETROL_MINE, PETROL_WAREHOUSE);
            break;
          case CRYSTAL_MINE:
            updateResources(rD, CRYSTAL, CRYSTAL_MINE, CRYSTAL_WAREHOUSE);
            break;
        }
      }
    }, 60000);

    

    return {
      metalProduction: metalProduction,
      petrolProduction: petrolProduction,
      crystalProduction:crystalProduction,
      metalCapacity: metalCapacity,
      petrolCapacity: petrolCapacity,
      crystalCapacity:crystalCapacity,
      energyProduction: energyProduction,
      energyLeft: energyLeft,
      activePlanet: activePlanet,
    };
  },
};
</script>
<style>
.resource-div {
  width: 120px;
}
</style>
