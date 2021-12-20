<template>
  <div class="q-pt-lg container">
    <!-- RESOURCES TAB -->
    <q-card
      v-if="activePlanet !== false"
      flat
      class="bg-transparent text-secondary text-center row justify-center"
    >
      <div id="equal-width" class="col-xs-6 col-sm-3 q-pa-sm">
        <q-btn
          stack
          flat
          rounded
          class="btn-glass-element"
          :class="{ 
            'btn-yellow-glass-element': isResourceAlert('metal') && !isStorageFull('metalWarehouse'),
            'btn-red-glass-element': isStorageFull('metalWarehouse'),
          }"
        >
          <img
            src="~assets/img/resources/RES_ic_Metal.png"
            alt=""
            srcset=""
            class="q-pt-sm planet-icons"
          />
          <p class="text-weight-bold text-body2">
            {{ metalAvailable }}
          </p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2" style="width: 290px">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Metal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available </q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right">
                  {{ metalAvailable }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right">
                  {{ metalCapacityDisplay }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Production</q-item-section>
                </q-item-section>
                <q-item-section v-if="!isStorageFull('metalWarehouse')" class="col-6 text-right"
                :class="{
                  'text-positive': isFullProduction('metalMine'),
                  'text-yellow-12': !isFullProduction('metalMine'),
                  }">
                  +{{ metalProductionDisplay }}
                </q-item-section>
                <q-item-section v-else class="col-2 text-right text-negative">
                  -{{metalProduction}}/min
                </q-item-section>
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
      <div id="equal-width" class="col-xs-6 col-sm-3 q-pa-sm">
        <q-btn
          stack
          flat
          rounded
          class="btn-glass-element"
          :class="{
            'btn-yellow-glass-element': isResourceAlert('crystal') && !isStorageFull('crystalWarehouse'),
            'btn-red-glass-element': isStorageFull('crystalWarehouse'),

          }"
        >
          <img
            src="~assets/img/resources/RES_ic_CRYSTAL.png"
            alt=""
            srcset=""
            class="q-pt-sm planet-icons"
          />
          <p class="text-weight-bold text-body2">
            {{ crystalAvailable }}
          </p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2" style="width: 290px">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Crystal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right">
                  {{ crystalAvailable }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right">
                  {{ crystalCapacityDisplay }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Production</q-item-section>
                </q-item-section>
                <q-item-section v-if="!isStorageFull('crystalWarehouse')" class="col-6 text-right"
                :class="{
                  'text-positive': isFullProduction('crystalMine'),
                  'text-yellow-12': !isFullProduction('crystalMine'),
                  }">
                
                  +{{ crystalProductionDisplay }}
                </q-item-section>
                <q-item-section v-else class="col-2 text-right text-negative">
                  -{{crystalProduction}}/min
                </q-item-section>
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
      <div id="equal-width" class="col-xs-6 col-sm-3 q-pa-sm">
        <q-btn
          stack
          flat
          rounded
          class="btn-glass-element"
          :class="{
            'btn-yellow-glass-element': isResourceAlert('petrol') && !isStorageFull('petrolWarehouse'),
            'btn-red-glass-element': isStorageFull('petrolWarehouse'),
          }"
        >
          <img
            src="~assets/img/resources/RES_ic_FUEL5.png"
            alt=""
            srcset=""
            class="q-pt-sm planet-icons"
          />
          <p class="text-weight-bold text-body2">
            {{ petrolAvailable }}
          </p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
            
          >
            <q-list dense class="text-subtitle2" style="width: 290px">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Petrol</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right">
                  {{ petrolAvailable }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right">
                  {{ petrolCapacityDisplay }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Production</q-item-section>
                </q-item-section>
                <q-item-section v-if="!isStorageFull('petrolWarehouse')" class="col-6 text-right"
                 :class="{
                  'text-positive': isFullProduction('petrolMine'),
                  'text-yellow-12': !isFullProduction('petrolMine'),
                  }">
                  +{{ petrolProductionDisplay }}
                </q-item-section>
                <q-item-section v-else class="col-2 text-right text-negative">
                  -{{petrolProduction}}/min
                </q-item-section>
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
      <div id="equal-width" class="col-xs-6 col-sm-3 q-pa-sm">
        <q-btn
          stack
          flat
          rounded
          class="btn-glass-element"
          :class="{ 'btn-red-glass-element': energyLeft <= 0  }"
        >
          <img
            src="~assets/img/resources/RES_ic_ENERGY.png"
            alt=""
            srcset=""
            class="q-pt-sm planet-icons"
          />
          <p class="text-weight-bold text-body2">{{ energyLeft }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2" style="width: 260px">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Energy</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Production </q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right text-positive">
                  +{{ energyProduction }}
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Usage</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right text-negative">
                  -{{
                    this.$store.getters.activePlanet.ressources.energy_usage
                  }}
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
import ResourceType from "../constants/ResourceType";
import { computed } from "vue";
import { useStore } from "vuex";
import tc from "thousands-counter";

export default {
  name: "RessourcesDisplay",
  setup() {
    const $store = useStore();

    const activePlanet = computed(() => {
      const currentPlanet = $store.getters.activePlanet;
      if (currentPlanet === false) return false;

      return currentPlanet;
    });

    const metalAvailable = computed(() => {
      return tc(($store.getters.activePlanet.ressources.metal).toFixed(1), { digits: 1 });
    });

    const crystalAvailable = computed(() => {
      return tc(($store.getters.activePlanet.ressources.crystal).toFixed(1), { digits: 1 });
    });

    const petrolAvailable = computed(() => {
      return tc(($store.getters.activePlanet.ressources.petrol).toFixed(1), { digits: 1 });
    });
    
    const metalProduction = computed(() => {
      if ($store.getters.resourceData.metalMine === undefined) return;
      const info = calculateProduction(ResourceType.METAL_MINE);
      return info.production;
    });

    const metalProductionDisplay = computed(() => {
      if ($store.getters.resourceData.metalMine === undefined) return;
      const info = calculateProduction(ResourceType.METAL_MINE);

      if (info.production < info.maxProduction) {
        return `${info.production} (-${(info.maxProduction-info.production).toFixed(1)})/min`;
      }

      return tc(info.production, { digits: 1 });
    });

    const petrolProduction = computed(() => {
      if ($store.getters.resourceData.petrolMine === undefined) return;
      const info = calculateProduction(ResourceType.PETROL_MINE);
      return info.production;
    });

    const petrolProductionDisplay = computed(() => {
      if ($store.getters.resourceData.petrolMine === undefined) return;
      const info = calculateProduction(ResourceType.PETROL_MINE);

      if (info.production < info.maxProduction) {
        return `${info.production} (-${(info.maxProduction-info.production).toFixed(1)})/min`;
      }

      return tc(info.production, { digits: 1 });
    });

    const crystalProduction = computed(() => {
      if ($store.getters.resourceData.crystalMine === undefined) return;
      const info = calculateProduction(ResourceType.CRYSTAL_MINE);
      return info.production;
    });
    
    const crystalProductionDisplay = computed(() => {
      if ($store.getters.resourceData.crystalMine === undefined) return;
      const info = calculateProduction(ResourceType.CRYSTAL_MINE);

      if (info.production < info.maxProduction) {
        return `${info.production} (-${(info.maxProduction-info.production).toFixed(1)})/min`;
      }

      return tc(info.production, { digits: 1 });
    });

    const metalCapacity = computed(() => {
      if ($store.getters.resourceData.metalWarehouse === undefined) return;
      const capacity = calculateWarehouseCapacity(ResourceType.METAL_WAREHOUSE);
      return capacity.capacity;
    });

    const metalCapacityDisplay = computed(() => {
      if ($store.getters.resourceData.metalWarehouse === undefined) return;
      const capacity = calculateWarehouseCapacity(ResourceType.METAL_WAREHOUSE);

      if (capacity.capacity < capacity.maxCapacity) {
        return `${tc(capacity.capacity, { digits: 1 })} (-${capacity.maxCapacity-capacity.capacity})`;
      }

      return tc(capacity.capacity, { digits: 1 });
    });

    const petrolCapacity = computed(() => {
      if ($store.getters.resourceData.petrolWarehouse === undefined) return;
      const capacity = calculateWarehouseCapacity(ResourceType.PETROL_WAREHOUSE);
      return capacity.capacity;
    });

    const petrolCapacityDisplay = computed(() => {
      if ($store.getters.resourceData.petrolWarehouse === undefined) return;
      const capacity = calculateWarehouseCapacity(ResourceType.PETROL_WAREHOUSE);

      if (capacity.capacity < capacity.maxCapacity) {
        return `${tc(capacity.capacity, { digits: 1 })} (-${capacity.maxCapacity-capacity.capacity})`;
      }

      return tc(capacity.capacity, { digits: 1 });
    });

    const crystalCapacity = computed(() => {
      if ($store.getters.resourceData.crystalWarehouse === undefined) return;
      const capacity = calculateWarehouseCapacity(ResourceType.CRYSTAL_WAREHOUSE);
      return capacity.capacity;
    });

    const crystalCapacityDisplay = computed(() => {
      if ($store.getters.resourceData.crystalWarehouse === undefined) return;
      const capacity = calculateWarehouseCapacity(ResourceType.CRYSTAL_WAREHOUSE);

      if (capacity.capacity < capacity.maxCapacity) {
        return `${tc(capacity.capacity, { digits: 1 })} (-${capacity.maxCapacity-capacity.capacity})`;
      }

      return tc(capacity.capacity, { digits: 1 });
    });

    const isFullProduction = (mine) => {
      const {
          production,
          maxProduction
        } = calculateProduction(mine);

      return production >= maxProduction;
    }

    const isStorageFull = (warehouse) => {
      const {capacity, maxStorage} = calculateWarehouseCapacity(warehouse);
      
      const mapping = { 
        "metalWarehouse": metalAvailable,
        "petrolWarehouse": petrolAvailable,
        "crystalWarehouse": crystalAvailable,
      }

      const amount = mapping[warehouse].value;
      return amount >= capacity;
    }

    const energyProduction = computed(() => {
      if ($store.getters.resourceData.solarPlant === undefined) return;
      const currentLevel = $store.getters.resourceData.solarPlant.level;
      return $store.getters.resourceData.solarPlant.upgrades[currentLevel]
        .production;
    });

    const energyLeft = computed(() => {
      if ($store.getters.resourceData.solarPlant === undefined) return;

      const currentUsage = $store.getters.activePlanet.ressources.energy_usage;
      return energyProduction.value - currentUsage;
    });

    const calculateProduction = (mine) => {
      const data = $store.getters.resourceData;

      const mineInfo = data[mine];
      const currentProduction = mineInfo["production"]; 
      const currentLevel = mineInfo["level"]; 
      const currentHealth = mineInfo["health"];
      const maxHealth = mineInfo["upgrades"][currentLevel]["health"];

      const healthPercentage = currentHealth/maxHealth;
      return {
        production: currentProduction*healthPercentage, 
        maxProduction: currentProduction,
      };
    };

    const calculateWarehouseCapacity = (warehouse) => {
      const data = $store.getters.resourceData;
      const warehouseInfo = data[warehouse];
      const currentCapacity = warehouseInfo["capacity"]; 
      const currentLevel = warehouseInfo["level"]; 
      const currentHealth = warehouseInfo["health"];
      const maxHealth = warehouseInfo["upgrades"][currentLevel]["health"];

      const healthPercentage = currentHealth/maxHealth;
      return {
        capacity: currentCapacity*healthPercentage, 
        maxCapacity: currentCapacity,
      };
    };

    const updateResources = (rD, resource, mine, warehouse) => {
      const mineData = rD[mine];
      
      const upgrading = mineData["upgrading"];
      const repairing = mineData["repairing"];
      const maxCapacity = calculateWarehouseCapacity(warehouse);
      
      const current = $store.getters.activePlanet.ressources[resource];

      let production = false;
      switch (mine) {
        case ResourceType.METAL_MINE:
          production = metalProduction.value;
          break;

        case ResourceType.PETROL_MINE:
          production = petrolProduction.value;
          break;

        case ResourceType.CRYSTAL_MINE:
          production = crystalProduction.value;
          break;
      }

      if (current < maxCapacity.capacity && !upgrading && !repairing) {
        
        $store.commit("incrementResources", {
          ressource: resource,
          value: production,
        });
        $store.commit("decrementReserve", {
          ressource: resource,
          value: production,
        });
      }
    };

    let id = setInterval(async () => {
      if ($store.getters.activePlanet === false) return;
      if ($store.getters.planets.filter((p) => p.claimed).length === 0) return;
      console.log("interval resource update");
      let rD = $store.getters.resourceData;

      for (let resourceTypeIndex in ResourceType.RESOURCE_TYPES) {
        const resourceType = ResourceType.RESOURCE_TYPES[resourceTypeIndex];

        switch (resourceType) {
          case ResourceType.METAL_MINE:
            updateResources(
              rD,
              ResourceType.METAL,
              ResourceType.METAL_MINE,
              ResourceType.METAL_WAREHOUSE
            );
            break;
          case ResourceType.PETROL_MINE:
            updateResources(
              rD,
              ResourceType.PETROL,
              ResourceType.PETROL_MINE,
              ResourceType.PETROL_WAREHOUSE
            );
            break;
          case ResourceType.CRYSTAL_MINE:
            updateResources(
              rD,
              ResourceType.CRYSTAL,
              ResourceType.CRYSTAL_MINE,
              ResourceType.CRYSTAL_WAREHOUSE
            );
            break;
        }
      }
    }, 60000);

    $store.commit("addIntervalId", { id: id });
    
    const isResourceAlert = (resourceType) => {
      const mappings = {};
      mappings[ResourceType.METAL] = {
        "mine": ResourceType.METAL_MINE,
        "warehouse": ResourceType.METAL_WAREHOUSE,
      };

      mappings[ResourceType.CRYSTAL] = {
        "mine": ResourceType.CRYSTAL_MINE,
        "warehouse": ResourceType.CRYSTAL_WAREHOUSE,
      };

      mappings[ResourceType.PETROL] = {
        "mine": ResourceType.PETROL_MINE,
        "warehouse": ResourceType.PETROL_WAREHOUSE,
      };

      const rD = $store.getters.resourceData;
      
      const mine = rD[mappings[resourceType]["mine"]];
      const mineCurrentHealth = mine["health"];
      const mineMaxHealth = mine["upgrades"][mine["level"]]["health"];
      const mineFullHealth = (mineCurrentHealth/mineMaxHealth) < 1;

      const warehouse = rD[mappings[resourceType]["warehouse"]];
      const warehouseCurrentHealth = warehouse["health"];
      const warehouseMaxHealth = warehouse["upgrades"][mine["level"]]["health"];
      const warehouseFullHealth = (warehouseCurrentHealth/warehouseMaxHealth) < 1;
      
      return mineFullHealth || warehouseFullHealth;
    };

    return {
      metalProduction: metalProduction,
      petrolProduction: petrolProduction,
      crystalProduction: crystalProduction,
      metalCapacity: metalCapacity,
      metalCapacityDisplay: metalCapacityDisplay,
      metalProductionDisplay: metalProductionDisplay,
      petrolCapacity: petrolCapacity,
      petrolCapacityDisplay: petrolCapacityDisplay,
      petrolProductionDisplay: petrolProductionDisplay,
      crystalCapacity: crystalCapacity,
      crystalCapacityDisplay: crystalCapacityDisplay,
      crystalProductionDisplay: crystalProductionDisplay,
      energyProduction: energyProduction,
      energyLeft: energyLeft,
      activePlanet: activePlanet,
      metalAvailable: metalAvailable,
      petrolAvailable: petrolAvailable,
      crystalAvailable: crystalAvailable,
      isResourceAlert: isResourceAlert,
      isStorageFull: isStorageFull,
      isFullProduction: isFullProduction,
    };
  },
};
</script>
<style>
#equal-width {
  width: 100px;
}

.btn-red-glass-element {
  box-shadow: 0 0 1rem 0 rgba(255, 0, 0, 0.4);
  border-radius: 20px;
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
  color: red;
}

.btn-yellow-glass-element {
  box-shadow: 0 0 1rem 0 rgb(203, 212, 75);
  border-radius: 20px;
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
  color: yellow;
}

.btn-red-glass-element:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: -20px;
}

.planet-icons {
  width: 56px;
  height: 64px;
}
</style>
