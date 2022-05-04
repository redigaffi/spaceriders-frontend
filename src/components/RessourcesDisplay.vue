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
            'btn-yellow-glass-element':
              isResourceAlert('metal') && !isStorageFull('metalWarehouse'),
            'btn-red-glass-element': isStorageFull('metalWarehouse') || energyAvailable <= 0,
          }"
        >
          <img
            src="~assets/img/resources/RES_ic_Metal.png"
            alt
            srcset
            class="q-pt-sm planet-icons"
          />
          <p class="text-weight-bold text-body2">{{ metalAvailable }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2" style="width: 350px">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Metal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right" :class="{
                    'text-negative': isStorageFull('metalWarehouse'),
                  }">{{
                  metalAvailable
                }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-5 text-right">{{
                  metalCapacityDisplay
                }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Production</q-item-section>
                </q-item-section>
                <q-item-section v-if="energyAvailable <= 0" class="col-8 text-right text-negative"
                  >0/min</q-item-section
                >
                <q-item-section v-else-if="metalReserve <= 0" class="col-8 text-right text-yellow-12"
                  >0/min</q-item-section
                >
                <q-item-section
                  v-else-if="!isStorageFull('metalWarehouse')"
                  class="col-8 text-right"
                  :class="{
                    'text-positive': isFullProduction('metalMine'),
                    'text-yellow-12': !isFullProduction('metalMine'),
                  }"
                  >+{{ metalProductionDisplay }}/min</q-item-section
                >
                <q-item-section v-else class="col-8 text-right text-negative"
                  >-{{ metalProduction }}/min</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Energy usage</q-item-section>
                </q-item-section>
                <q-item-section v-if="energyAvailable <= 0" class="col-6 text-right"
                  >0/min</q-item-section
                >
                <q-item-section v-else class="col-6 text-right"
                  >{{ metalMineEnergyUsage }}/min</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Reserve</q-item-section>
                </q-item-section>
                <q-item-section class="col-6 text-right" :class="{
                    'text-yellow-12': metalReserve <= 0,
                  }">{{metalReserveDisplay}}</q-item-section
                >
              </q-item>
              <q-item v-if="metalReserve > 0">
                <q-item-section class="text-white">
                  <q-item-section caption>Time left</q-item-section>
                </q-item-section>
                <q-item-section class="col-6 text-right">{{metalReserveTimeLeft}}</q-item-section
                >
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
            'btn-yellow-glass-element':
              isResourceAlert('crystal') && !isStorageFull('crystalWarehouse'),
            'btn-red-glass-element': isStorageFull('crystalWarehouse') || energyAvailable <= 0,
          }"
        >
          <img
            src="~assets/img/resources/RES_ic_CRYSTAL.png"
            alt
            srcset
            class="q-pt-sm planet-icons"
          />
          <p class="text-weight-bold text-body2">{{ crystalAvailable }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2" style="width: 350px">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Crystal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right" :class="{
                    'text-negative': isStorageFull('crystalWarehouse'),
                  }">{{
                  crystalAvailable
                }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-5 text-right">{{
                  crystalCapacityDisplay
                }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Production</q-item-section>
                </q-item-section>
                <q-item-section v-if="energyAvailable <= 0" class="col-8 text-right text-negative"
                  >0/min</q-item-section
                >
                <q-item-section v-else-if="crystalReserve <= 0" class="col-8 text-right text-yellow-12"
                  >0/min</q-item-section
                >
                <q-item-section
                  v-else-if="!isStorageFull('crystalWarehouse')"
                  class="col-8 text-right"
                  :class="{
                    'text-positive': isFullProduction('crystalMine'),
                    'text-yellow-12': !isFullProduction('crystalMine'),
                  }"
                  >+{{ crystalProductionDisplay }}/min</q-item-section
                >
                <q-item-section v-else class="col-8 text-right text-negative"
                  >-{{ crystalProduction }}/min</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Energy usage</q-item-section>
                </q-item-section>
                <q-item-section v-if="energyAvailable <= 0" class="col-6 text-right"
                  >0/min</q-item-section
                >
                <q-item-section v-else class="col-6 text-right"
                  >{{ crystalMineEnergyUsage }}/min</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Reserve</q-item-section>
                </q-item-section>
                <q-item-section class="col-6 text-right" :class="{
                    'text-yellow-12': crystalReserve <= 0,
                  }">{{crystalReserveDisplay}}</q-item-section
                >
              </q-item>
              <q-item v-if="crystalReserve > 0">
                <q-item-section class="text-white">
                  <q-item-section caption>Time left</q-item-section>
                </q-item-section>
                <q-item-section class="col-6 text-right">{{crystalReserveTimeLeft}}</q-item-section
                >
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
            'btn-yellow-glass-element':
              isResourceAlert('petrol') && !isStorageFull('petrolWarehouse'),
            'btn-red-glass-element': isStorageFull('petrolWarehouse') || energyAvailable <= 0,
          }"
        >
          <img
            src="~assets/img/resources/RES_ic_FUEL5.png"
            alt
            srcset
            class="q-pt-sm planet-icons"
          />
          <p class="text-weight-bold text-body2">{{ petrolAvailable }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2" style="width: 350px">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Petrol</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right" :class="{
                    'text-negative': isStorageFull('petrolWarehouse'),
                  }">{{
                  petrolAvailable
                }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-5 text-right">{{
                  petrolCapacityDisplay
                }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Production</q-item-section>
                </q-item-section>
                <q-item-section v-if="energyAvailable <= 0" class="col-8 text-right text-negative"
                  >0/min</q-item-section
                >
                <q-item-section v-else-if="petrolReserve <= 0" class="col-8 text-right text-yellow-12"
                  >0/min</q-item-section
                >
                <q-item-section
                  v-else-if="!isStorageFull('petrolWarehouse')"
                  class="col-8 text-right"
                  :class="{
                    'text-positive': isFullProduction('petrolMine'),
                    'text-yellow-12': !isFullProduction('petrolMine'),
                  }"
                  >+{{ petrolProductionDisplay }}/min</q-item-section
                >
                <q-item-section v-else class="col-8 text-right text-negative"
                  >-{{ petrolProduction }}/min</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Energy usage</q-item-section>
                </q-item-section>
                <q-item-section v-if="energyAvailable <= 0" class="col-6 text-right"
                  >0/min</q-item-section
                >
                <q-item-section v-else class="col-6 text-right"
                  >{{ petrolMineEnergyUsage }}/min</q-item-section
                >
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Reserve</q-item-section>
                </q-item-section>
                <q-item-section class="col-6 text-right" :class="{
                    'text-yellow-12': petrolReserve <= 0,
                  }">{{petrolReserveDisplay}}</q-item-section
                >
              </q-item>
              <q-item v-if="petrolReserve > 0">
                <q-item-section class="text-white">
                  <q-item-section caption>Time left</q-item-section>
                </q-item-section>
                <q-item-section class="col-6 text-right">{{petrolReserveTimeLeft}}</q-item-section
                >
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
      <div id="equal-width" class="col-xs-6 col-sm-3 q-pa-sm">
        <q-btn
          @click="energyDepositPopup = true"
          stack
          flat
          rounded
          class="btn-glass-element"
          :class="{ 'btn-red-glass-element': energyAvailable <= 0 }"
        >
          <img
            src="~assets/img/resources/RES_ic_ENERGY.png"
            alt
            srcset
            class="q-pt-sm planet-icons"
          />
          <p class="text-weight-bold text-body2">
            {{ energyAvailableDisplay }} (+)
          </p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2" style="width: 350px">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Energy</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right text-positive">{{
                  energyAvailableDisplay
                }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Consumption</q-item-section>
                </q-item-section>
                <q-item-section class="col-4 text-right text-negative">
                  -{{ energyConsumption }}/min
                </q-item-section>
              </q-item>

              <q-item v-if="energyAvailable > 0">
                <q-item-section class="text-white">
                  <q-item-section caption>Time left</q-item-section>
                </q-item-section>
                <q-item-section class="col-5 text-right">
                  {{ energyTimeLeft }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
    </q-card>
    <q-dialog v-model="energyDepositPopup">
      <q-card
        class="bg-dark text-white"
        style="width: 600px; max-width: 70vw; border-radius: 20px"
      >
        <q-card-section class="q-pa-xs text-center">
          <span class="q-ml-sm text-overline" style="font-size: 14px"
            >DEPOSIT ENERGY</span
          >
        </q-card-section>
        <q-btn
          round
          class="absolute-top-right"
          flat
          color="white"
          icon="close"
          v-close-popup
        />

        <q-img
          src="~assets/img/buyplanet_footer-scaled.jpg"
          style="height: 230px"
        >
          <div class="absolute-full text-subtitle2">
            <q-card-section>
              <q-card-section class="q-pt-none text-center">
                <div class="q-mb-lg">
                  <q-badge
                    class="q-pa-sm text-weight-bold text-overline"
                    color="warning"
                  >
                    {{ energyCostBreakdown }}
                  </q-badge>
                </div>
                <q-slider
                  id="depositEnergySlider"
                  v-model="depositAmount"
                  :min="0.5"
                  :max="maxEnergyDeposit"
                  :step="0.5"
                  label
                  label-always
                  color="positive"
                />
              </q-card-section>

              <q-card-section class="q-pt-none text-center">
                <IncreaseAllowance
                  v-if="!$store.getters.activePlanet.freePlanet"
                  :address="ContractAddress.getSpaceRidersGameAddress()" 
                  :amount="sprCost"
                  :tokenAddress="ContractAddress.getSpaceRidersAddress()"
                />
                <q-btn
                  label="Deposit"
                  color="warning"
                  no-caps
                  class="q-px-lg"
                  @click="depositEnergy(sprCost)"
                />
              </q-card-section>
            </q-card-section>
          </div>
        </q-img>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import ResourceType from "../constants/ResourceType";
import { ref, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import tc from "thousands-counter";
import SpaceRidersGameContract, {
  EnergyDepositAttributes,
} from "../service/contract/SpaceRidersGameContract";
import { v4 as uuidv4 } from "uuid";
import ApiRequest from "../service/http/ApiRequests";
import IncreaseAllowance from "./IncreaseAllowance";
import ContractAddress from "../service/contract/ContractAddress";
import { ACTIVE_PLANET_CHANGED, UPDATED_ALL } from "../constants/Events";


const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const $eventBus = getCurrentInstance().appContext.config.globalProperties.$eventBus;

const $store = useStore();

const activePlanet = computed(() => {
  const currentPlanet = $store.getters.activePlanet;
  if (currentPlanet === false) return false;

  return currentPlanet;
});

const energyAvailable = computed(() => {
  if ($store.getters.activePlanet === false) return false;
  return $store.getters.activePlanet.ressources.energy;
});

const energyAvailableDisplay = computed(() => {
  return tc(energyAvailable.value.toFixed(2), { digits: 2 });
});

function timeLeft(minLeft) {
  const now = new Date();
  const end = new Date((now.getTime() / 1000 + minLeft) * 1000);

  const diffSeconds = (end.getTime() - now.getTime()) / 1000;
  const s = Math.round(diffSeconds % 60);
  const minutes = Math.round((diffSeconds - s) / 60);

  const m = minutes % 60;
  const h = Math.round(minutes - m) / 60;

  let str = "";
  if (h > 0) str += `${h}h`;
  if (m > 0) str += ` ${m}m`;
  if (s >= 0) str += ` ${s}s`;

  return str;
}

const energyConsumption = computed(() => {
  if ($store.getters.activePlanet === false) return false;
  return $store.getters.activePlanet.ressources.energy_usage.toFixed(4);
});

const metalReserve = computed(() => {
  if ($store.getters.activePlanet === false) return false;
  return $store.getters.activePlanet.reserves.metal;
});

const energyTimeLeft = computed(() => {
  if ($store.getters.activePlanet === false) return false;
  const availableEnergy = $store.getters.activePlanet.ressources.energy;
  const consumption = energyConsumption.value/60;
  const minutesLeft = (availableEnergy / consumption);
  const tl = timeLeft(minutesLeft);
  if (tl === "") return "N/A";
  return tl;
});


const metalReserveDisplay = computed(() => {
  return tc($store.getters.activePlanet.reserves.metal.toFixed(1), {
    digits: 1,
  });
});

const metalAvailable = computed(() => {
  return tc($store.getters.activePlanet.ressources.metal.toFixed(1), {
    digits: 1,
  });
});

const crystalReserve = computed(() => {
  return $store.getters.activePlanet.reserves.crystal;
});

const crystalReserveDisplay = computed(() => {
  return tc($store.getters.activePlanet.reserves.crystal.toFixed(1), {
    digits: 1,
  });
});

const crystalAvailable = computed(() => {
  return tc($store.getters.activePlanet.ressources.crystal.toFixed(1), {
    digits: 1,
  });
});

const petrolReserve = computed(() => {
  return $store.getters.activePlanet.reserves.petrol;
});

const petrolReserveDisplay = computed(() => {
  return tc($store.getters.activePlanet.reserves.petrol.toFixed(1), {
    digits: 1,
  });
});

const petrolAvailable = computed(() => {
  return tc($store.getters.activePlanet.ressources.petrol.toFixed(1), {
    digits: 1,
  });
});

const metalProduction = computed(() => {
  if ($store.getters.resourceData.metalMine === undefined) return;
  const info = calculateProduction(ResourceType.METAL_MINE);
  return info.production;
});

const metalReserveTimeLeft = computed(() => {
  if ($store.getters.resourceData.metalMine === undefined) return;
  const production = metalProduction.value / 60;
  const reserve = metalReserve.value;
  return timeLeft(reserve/production);
});

const metalMineEnergyUsage = computed(() => {
  if ($store.getters.resourceData.metalMine === undefined) return;
  const mine = $store.getters.resourceData.metalMine;
  return mine.upgrades[mine.level].energy_usage;
});

const crystalMineEnergyUsage = computed(() => {
  if ($store.getters.resourceData.crystalMine === undefined) return;
  const mine = $store.getters.resourceData.crystalMine;
  return mine.upgrades[mine.level].energy_usage;
});

const petrolMineEnergyUsage = computed(() => {
  if ($store.getters.resourceData.petrolMine === undefined) return;
  const mine = $store.getters.resourceData.petrolMine;
  return mine.upgrades[mine.level].energy_usage;
});

const metalProductionDisplay = computed(() => {
  if ($store.getters.resourceData.metalMine === undefined) return;
  const info = calculateProduction(ResourceType.METAL_MINE);

  if (info.production < info.maxProduction) {
    return `${info.production.toFixed(4)} (-${(
      info.maxProduction - info.production
    ).toFixed(4)})`;
  }

  return tc(info.production, { digits: 1 });
});

const petrolProduction = computed(() => {
  if ($store.getters.resourceData.petrolMine === undefined) return;
  const info = calculateProduction(ResourceType.PETROL_MINE);
  return info.production;
});

const petrolReserveTimeLeft = computed(() => {
  if ($store.getters.resourceData.petrolMine === undefined) return;
  const production = petrolProduction.value / 60;
  const reserve = petrolReserve.value;
  return timeLeft(reserve/production);
});

const petrolProductionDisplay = computed(() => {
  if ($store.getters.resourceData.petrolMine === undefined) return;
  const info = calculateProduction(ResourceType.PETROL_MINE);

  if (info.production < info.maxProduction) {
    return `${info.production.toFixed(4)} (-${(
      info.maxProduction - info.production
    ).toFixed(4)})`;
  }

  return tc(info.production, { digits: 1 });
});

const crystalProduction = computed(() => {
  if ($store.getters.resourceData.crystalMine === undefined) return;
  const info = calculateProduction(ResourceType.CRYSTAL_MINE);
  return info.production;
});

const crystalReserveTimeLeft = computed(() => {
  if ($store.getters.resourceData.crystalMine === undefined) return;
  const production = crystalProduction.value / 60;
  const reserve = crystalReserve.value;
  return timeLeft(reserve/production);
});

const crystalProductionDisplay = computed(() => {
  if ($store.getters.resourceData.crystalMine === undefined) return;
  const info = calculateProduction(ResourceType.CRYSTAL_MINE);

  if (info.production < info.maxProduction) {
    return `${info.production.toFixed(4)} (-${(
      info.maxProduction - info.production
    ).toFixed(4)})`;
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
    return `${tc(capacity.capacity.toFixed(4), { digits: 1 })} (-${(
      capacity.maxCapacity - capacity.capacity
    ).toFixed(4)})`;
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
    return `${tc(capacity.capacity.toFixed(4), { digits: 1 })} (-${(
      capacity.maxCapacity - capacity.capacity
    ).toFixed(4)})`;
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
    return `${tc(capacity.capacity.toFixed(4), { digits: 1 })} (-${(
      capacity.maxCapacity - capacity.capacity
    ).toFixed(4)})`;
  }

  return tc(capacity.capacity, { digits: 1 });
});

const isFullProduction = (mine) => {
  const { production, maxProduction } = calculateProduction(mine);

  return production >= maxProduction;
};

const isStorageFull = (warehouse) => {
  const { capacity, maxStorage } = calculateWarehouseCapacity(warehouse);

  const mapping = {
    metalWarehouse: metalAvailable,
    petrolWarehouse: petrolAvailable,
    crystalWarehouse: crystalAvailable,
  };

  const amount = mapping[warehouse].value;
  return amount >= capacity;
};

const calculateProduction = (mine) => {
  const data = $store.getters.resourceData;

  const mineInfo = data[mine];
  const currentProduction = mineInfo["production"];
  const currentLevel = mineInfo["level"];
  const currentHealth = mineInfo["health"];
  const maxHealth = mineInfo["upgrades"][currentLevel]["health"];

  const healthPercentage = currentHealth / maxHealth;
  return {
    production: currentProduction * healthPercentage,
    maxProduction: currentProduction,
  };
};

const calculateWarehouseCapacity = (warehouse) => {
  const data = $store.getters.resourceData;
  const warehouseInfo = data[warehouse];
  if (warehouseInfo === undefined) return false;
  const currentCapacity = warehouseInfo["capacity"];
  const currentLevel = warehouseInfo["level"];
  const currentHealth = warehouseInfo["health"];
  const maxHealth = warehouseInfo["upgrades"][currentLevel]["health"];

  const healthPercentage = currentHealth / maxHealth;
  return {
    capacity: currentCapacity * healthPercentage,
    maxCapacity: currentCapacity,
  };
};

const isResourceAlert = (resourceType) => {
  const mappings = {};
  mappings[ResourceType.METAL] = {
    mine: ResourceType.METAL_MINE,
    warehouse: ResourceType.METAL_WAREHOUSE,
  };

  mappings[ResourceType.CRYSTAL] = {
    mine: ResourceType.CRYSTAL_MINE,
    warehouse: ResourceType.CRYSTAL_WAREHOUSE,
  };

  mappings[ResourceType.PETROL] = {
    mine: ResourceType.PETROL_MINE,
    warehouse: ResourceType.PETROL_WAREHOUSE,
  };

  const rD = $store.getters.resourceData;

  const mine = rD[mappings[resourceType]["mine"]];
  if (mine === undefined) return false;
  const mineCurrentHealth = mine["health"];
  const mineMaxHealth = mine["upgrades"][mine["level"]]["health"];
  const mineFullHealth = mineCurrentHealth / mineMaxHealth < 1;

  const warehouse = rD[mappings[resourceType]["warehouse"]];
  const warehouseCurrentHealth = warehouse["health"];
  const warehouseMaxHealth = warehouse["upgrades"][mine["level"]]["health"];
  const warehouseFullHealth = warehouseCurrentHealth / warehouseMaxHealth < 1;

  const reserveEmpty = $store.getters.activePlanet.reserves[resourceType] <= 0;
  
  return mineFullHealth || warehouseFullHealth || reserveEmpty;
};

const energyDepositPopup = ref(false);
const depositAmount = ref(1.0);

const sprCost = computed(() => {
  const tokenPrice = $store.getters.tokenPrice;
  const sprCost = (1 / tokenPrice) * depositAmount.value;
  return sprCost;
});

const energyCostBreakdown = computed(() => {
  if (!energyDepositPopup.value) return false;
  return `${depositAmount.value} $ENERGY (${depositAmount.value}$) - ${sprCost.value} $SPR `;
});

async function depositEnergy(amount) {
  const uuid = uuidv4();
  const energyDeposit = new EnergyDepositAttributes(
    uuid,
    amount.toString(),
    $store.getters.activePlanet.id
  );

  const closeNotification = $notification(
    "progress",
    "Waiting for transaction to complete...",
    0
  );

  if ($store.getters.activePlanet.freePlanet) {
    const req = await ApiRequest.depositEnergy({
      planetId: $store.getters.activePlanet.id,
      guid: uuid,
      amount: amount,
    });
    
    if (req.success) {
      closeNotification();
      $notification("success", "Energy deposited successfuly!", 6000);
      $store.commit("incrementEnergy", { energy: amount });
      energyDepositPopup.value = false;
    } else {
      closeNotification();
      $notification("failed", "Failed depositing energy...", 6000);
    }
    
    return;
  }

  let receipt = { status: 1 };

  try {
    const tx = await SpaceRidersGameContract.energyDeposit(energyDeposit);
    receipt = await tx.wait();
  } catch (e) {
    console.log("error");
    console.log(e);
    closeNotification();
  }

  if (receipt.status === 1) {
    const req = await ApiRequest.depositEnergy({
      planetId: $store.getters.activePlanet.id,
      guid: uuid,
    });

    if (req.success) {
      $notification("success", "Energy deposited successfuly!", 6000);
      $store.commit("incrementEnergy", { energy: amount });
      energyDepositPopup.value = false;
    } else {
      $notification("failed", "Failed depositing energy...", 6000);
    }
  } else {
    $notification("failed", "Failed depositing energy...", 6000);
    closeNotification();
  }

  closeNotification();
}

const maxEnergyDeposit = computed(() => {
  const planet = $store.getters.activePlanet;
  if (!planet) return 0;
  return planet.ressources.energy_max_deposit;
});

function startEnergyTimer() {
  if ($store.getters.activePlanet === false) return false;

  if ($store.getters.energyTimerId !== false) {
    clearInterval($store.getters.energyTimerId);
    $store.commit('setEnergyTimerId', false);
  }
  
  const intId = setInterval(() => {
    if (energyAvailable.value <= 0) {
      
      clearInterval($store.getters.energyTimerId);
      $store.commit('setEnergyTimerId', false);
      return;
    }
    
    const eC = $store.getters.activePlanet.ressources.energy_usage;
    $store.commit('decrementEnergy', {energy: eC/60})
  }, 1000);

  $store.commit('setEnergyTimerId', intId);
}

function startMetalTimer() {
  if ($store.getters.activePlanet === false) return false;

  if ($store.getters.metalTimerId !== false) {
    clearInterval($store.getters.metalTimerId);
    $store.commit('setMetalTimerId', false);
  }
  
  const intId = setInterval(() => {
    if (metalReserve.value <= 0 || energyAvailable.value <= 0) {
      clearInterval($store.getters.metalTimerId);
      $store.commit('setMetalTimerId', false);
      return;
    }
    
    const mP = metalProduction.value;
    $store.commit('decrementReserve', {
      ressource: "metal",
      value: mP/60});
  }, 1000);

  $store.commit('setMetalTimerId', intId);
}

function startCrystalTimer() {
  if ($store.getters.activePlanet === false) return false;

  if ($store.getters.crystalTimerId !== false) {
    clearInterval($store.getters.crystalTimerId);
    $store.commit('setCrystalTimerId', false);
  }
  
  const intId = setInterval(() => {
    if (crystalReserve.value <= 0 || energyAvailable.value <= 0) {
      clearInterval($store.getters.crystalTimerId);
      $store.commit('setCrystalTimerId', false);
      return;
    }
    
    const cP = crystalProduction.value;
    $store.commit('decrementReserve', {
      ressource: "crystal",
      value: cP/60});
  }, 1000);

  $store.commit('setCrystalTimerId', intId);
}

function startPetrolTimer() {
  if ($store.getters.activePlanet === false) return false;

  if ($store.getters.petrolTimerId !== false) {
    clearInterval($store.getters.petrolTimerId);
    $store.commit('setPetrolTimerId', false);
  }
  
  const intId = setInterval(() => {
    if (petrolReserve.value <= 0 || energyAvailable.value <= 0) {
      clearInterval($store.getters.petrolTimerId);
      $store.commit('setPetrolTimerId', false);
      return;
    }
    
    const pP = petrolProduction.value;
    $store.commit('decrementReserve', {
      ressource: "petrol",
      value: pP/60});
  }, 1000);

  $store.commit('setPetrolTimerId', intId);
}

const startTimers = () => {
  startEnergyTimer();
  startMetalTimer();
  startCrystalTimer();
  startPetrolTimer();
}

$eventBus.on(ACTIVE_PLANET_CHANGED, () => {
  startTimers();
});

$eventBus.on(UPDATED_ALL, () => {
  startTimers();
});
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

#depositEnergySlider .q-slider__track-container {
  height: 12px;
}

#depositEnergySlider .q-slider__thumb {
  height: 30px;
  width: 30px;
}
</style>
