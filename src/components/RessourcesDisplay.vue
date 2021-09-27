<template>
  <div class="q-pt-lg container">
    <!-- RESOURCES TAB -->
    <q-card
      v-if="this.$store.getters.activePlanet !== false"
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
                  {{ this.$store.getters.resourceData.metalWarehouse.capacity }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production</q-item-section>
                </q-item-section>
                <q-item-section class="col-2 text-right text-positive">
                  +{{ this.$store.getters.resourceData.metalMine.production }}/min
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
                  {{ this.$store.getters.resourceData.crystalWarehouse.capacity }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production</q-item-section>
                </q-item-section>
                <q-item-section class="col-2 text-right text-positive">
                  +{{ this.$store.getters.resourceData.crystalMine.production }}/min
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
                  {{ this.$store.getters.resourceData.petrolWarehouse.capacity }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production</q-item-section>
                </q-item-section>
                <q-item-section class="col-2 text-right text-positive">
                  +{{ this.$store.getters.resourceData.petrolMine.production }}/min
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
          <p>{{ this.$store.getters.activePlanet.ressources.total_energy }}</p>

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
                <q-item-section class="col-1 text-right">
                  {{ this.$store.getters.activePlanet.ressources.total_energy }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Usage</q-item-section>
                </q-item-section>
                <q-item-section class="col-1 text-right">
                  {{ this.$store.getters.activePlanet.ressources.energy_usage }}
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

import { useStore } from "vuex";

export default {
  name: "RessourcesDisplay",
  setup() {
    const $store = useStore();
    
    const updateResources = (rD, resource, mine, warehouse) => {
      const upgrading = rD[mine]["upgrading"];
      const maxCapacity = rD[warehouse]["capacity"];
      const current = $store.getters.activePlanet.ressources[resource];

      if (current < maxCapacity && !upgrading) {
        $store.commit("incrementResources", {
          ressource: resource,
          value: rD[mine]["production"],
        });
      }
    };

    setInterval(async () => {
      if ($store.getters.activePlanet === false) return;
      if ($store.getters.planets.filter((p) => p.claimed).length === 0)
        return;

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

    return {};
  },
};
</script>
<style>
.resource-div {
  width: 120px;
}
</style>
