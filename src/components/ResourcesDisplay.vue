<template>
  <div
    class="row justify-center glossy glass-element no-border-radius"
    style="padding: 0"
  >
    <q-list class="col">
      <q-item
        clickable
        v-ripple
        class="q-px-none q-py-sm"
        @click="showMetalData = true"
      >
        <q-item-section
          class="justify-center"
          :class="$q.screen.gt.md ? 'items-end' : 'items-center'"
        >
          <q-avatar
            color="accent"
            :class="{
              'btn-yellow-glass-element':
                isResourceAlert('metal') && !isStorageFull('metalWarehouse'),
              'btn-red-glass-element':
                isStorageFull('metalWarehouse') || energyAvailable <= 0,
            }"
          >
            <q-img
              src="~assets/img/resources/RES_ic_Metal.webp"
              style="max-height: 48px; max-width: 48px"
              fit
            />
          </q-avatar>
        </q-item-section>

        <q-item-section
          class="justify-center items-start"
          v-if="$q.screen.gt.md"
        >
          <q-item-label>
            {{ metalAvailableDisplay }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-tooltip
        anchor="top middle"
        self="bottom middle"
        :offset="[10, 10]"
        class="bg-primary"
        transition-show="scale"
        transition-hide="scale"
      >
        Metal
      </q-tooltip>
    </q-list>

    <q-list class="col">
      <q-item
        clickable
        v-ripple
        class="q-px-none q-py-sm"
        @click="showCrystalData = true"
      >
        <q-item-section
          class="justify-center"
          :class="$q.screen.gt.md ? 'items-end' : 'items-center'"
        >
          <q-avatar
            color="accent"
            :class="{
              'btn-yellow-glass-element':
                isResourceAlert('crystal') &&
                !isStorageFull('crystalWarehouse'),
              'btn-red-glass-element':
                isStorageFull('crystalWarehouse') || energyAvailable <= 0,
            }"
          >
            <q-img
              src="~assets/img/resources/RES_ic_CRYSTAL.webp"
              style="max-height: 48px; max-width: 48px"
              fit
            />
          </q-avatar>
        </q-item-section>

        <q-item-section
          class="justify-center items-start"
          v-if="$q.screen.gt.md"
        >
          <q-item-label>
            {{ crystalAvailableDisplay }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-tooltip
        anchor="top middle"
        self="bottom middle"
        :offset="[10, 10]"
        class="bg-primary"
        transition-show="scale"
        transition-hide="scale"
      >
        Crystal
      </q-tooltip>
    </q-list>

    <q-list class="col">
      <q-item
        clickable
        v-ripple
        class="q-px-none q-py-sm"
        @click="showPetrolData = true"
      >
        <q-item-section
          class="justify-center"
          :class="$q.screen.gt.md ? 'items-end' : 'items-center'"
        >
          <q-avatar
            color="accent"
            :class="{
              'btn-yellow-glass-element':
                isResourceAlert('petrol') && !isStorageFull('petrolWarehouse'),
              'btn-red-glass-element':
                isStorageFull('petrolWarehouse') || energyAvailable <= 0,
            }"
          >
            <q-img
              src="~assets/img/resources/RES_ic_FUEL5.webp"
              style="max-height: 48px; max-width: 48px"
              fit
            />
          </q-avatar>
        </q-item-section>

        <q-item-section
          class="justify-center items-start"
          v-if="$q.screen.gt.md"
        >
          <q-item-label>
            {{ petrolAvailableDisplay }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-tooltip
        anchor="top middle"
        self="bottom middle"
        :offset="[10, 10]"
        class="bg-primary"
        transition-show="scale"
        transition-hide="scale"
      >
        Petrol
      </q-tooltip>
    </q-list>

    <q-list class="col">
      <q-item
        clickable
        v-ripple
        class="q-px-none q-py-sm"
        @click="showEnergyData = true"
      >
        <q-item-section
          class="justify-center"
          :class="$q.screen.gt.md ? 'items-end' : 'items-center'"
        >
          <q-avatar
            color="accent"
            :class="{ 'btn-red-glass-element': energyAvailable <= 0 }"
          >
            <q-img
              src="~assets/img/resources/RES_ic_ENERGY.webp"
              style="max-height: 48px; max-width: 48px"
              fit
            />
          </q-avatar>
        </q-item-section>

        <q-item-section
          class="justify-center items-start"
          v-if="$q.screen.gt.md"
        >
          <q-item-label> {{ energyAvailableDisplay }} (+) </q-item-label>
        </q-item-section>
      </q-item>

      <q-tooltip
        anchor="top middle"
        self="bottom middle"
        :offset="[10, 10]"
        class="bg-primary"
        transition-show="scale"
        transition-hide="scale"
      >
        Energy
      </q-tooltip>
    </q-list>

    <q-list class="col">
      <q-item
        clickable
        v-ripple
        class="q-px-none q-py-sm"
        @click="showBKMData = true"
      >
        <q-item-section
          class="justify-center"
          :class="$q.screen.gt.md ? 'items-end' : 'items-center'"
        >
          <q-avatar color="accent">
            <q-img
              src="~assets/img/bkm.webp"
              style="max-height: 48px; max-width: 48px"
              fit
            />
          </q-avatar>
        </q-item-section>

        <q-item-section
          class="justify-center items-start"
          v-if="$q.screen.gt.md"
        >
          <q-item-label> {{ bkmAvailableDisplay }} (+) </q-item-label>
        </q-item-section>
      </q-item>

      <q-tooltip
        anchor="top middle"
        self="bottom middle"
        :offset="[10, 10]"
        class="bg-primary"
        transition-show="scale"
        transition-hide="scale"
      >
        BKM
      </q-tooltip>
    </q-list>

    <q-dialog v-model="showMetalData">
      <q-card class="full-width">
        <q-card-section class="row justify-between">
          <div class="text-h6">Metal Resource</div>
          <q-btn
            flat
            round
            size="sm"
            color="white"
            icon="close"
            v-close-popup
          />
        </q-card-section>

        <q-separator />

        <q-img
          src="~assets/img/metal_resource_bg.webp"
          style="height: 200px; width: 100%"
        />

        <q-card-section class="q-px-none">
          <q-list dense>
            <q-item clickable>
              <q-item-section>
                <q-item-label> Available: </q-item-label>
              </q-item-section>

              <q-item-section
                avatar
                :class="{
                  'text-negative': isStorageFull('metalWarehouse'),
                }"
              >
                <q-item-label>
                  {{ metalAvailableDisplay }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label> Storage Capacity: </q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-item-label>
                  {{ metalCapacityDisplay }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label> Production: </q-item-label>
              </q-item-section>

              <q-item-section
                avatar
                v-if="energyAvailable <= 0"
                class="text-negative"
              >
                <q-item-label> 0/min </q-item-label>
              </q-item-section>

              <q-item-section
                avatar
                v-else-if="!isStorageFull('metalWarehouse')"
                :class="{
                  'text-positive': isFullProduction('metalMine'),
                  'text-yellow-12': !isFullProduction('metalMine'),
                }"
              >
                <q-item-label> +{{ metalProductionDisplay }}/min </q-item-label>
              </q-item-section>
              <q-item-section avatar v-else class="text-negative"
                >-{{ metalProduction }}/min</q-item-section
              >
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label> Energy usage: </q-item-label>
              </q-item-section>

              <q-item-section avatar v-if="energyAvailable <= 0">
                <q-item-label> 0/min </q-item-label>
              </q-item-section>

              <q-item-section v-else avatar>
                <q-item-label> {{ metalMineEnergyUsage }}/min </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            icon="fas fa-exchange-alt"
            color="info"
            label="Trade METAL/BKM"
            to="/trade/METAL_BKM"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showCrystalData">
      <q-card class="full-width">
        <q-card-section class="row justify-between">
          <div class="text-h6">Crystal Resource</div>
          <q-btn
            flat
            round
            size="sm"
            color="white"
            icon="close"
            v-close-popup
          />
        </q-card-section>

        <q-separator />

        <q-img
          src="~assets/img/crystal_resource_bg.webp"
          style="height: 200px; width: 100%"
        />

        <q-card-section class="q-px-none">
          <q-list dense>
            <q-item clickable>
              <q-item-section>
                <q-item-label> Available: </q-item-label>
              </q-item-section>

              <q-item-section
                avatar
                :class="{
                  'text-negative': isStorageFull('crystalWarehouse'),
                }"
              >
                <q-item-label>
                  {{ crystalAvailableDisplay }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label> Storage Capacity: </q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-item-label>
                  {{ crystalCapacityDisplay }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label> Production: </q-item-label>
              </q-item-section>

              <q-item-section
                avatar
                v-if="energyAvailable <= 0"
                class="text-negative"
              >
                <q-item-label> 0/min </q-item-label>
              </q-item-section>

              <q-item-section
                avatar
                v-else-if="!isStorageFull('crystalWarehouse')"
                :class="{
                  'text-positive': isFullProduction('crystalMine'),
                  'text-yellow-12': !isFullProduction('crystalMine'),
                }"
              >
                <q-item-label>
                  +{{ crystalProductionDisplay }}/min
                </q-item-label>
              </q-item-section>
              <q-item-section avatar v-else class="text-negative"
                >-{{ crystalProduction }}/min</q-item-section
              >
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label> Energy usage: </q-item-label>
              </q-item-section>

              <q-item-section avatar v-if="energyAvailable <= 0">
                <q-item-label> 0/min </q-item-label>
              </q-item-section>

              <q-item-section v-else avatar>
                <q-item-label> {{ crystalMineEnergyUsage }}/min </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            icon="fas fa-exchange-alt"
            color="info"
            label="Trade CRYSTAL/BKM"
            to="/trade/CRYSTAL_BKM"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showPetrolData">
      <q-card class="full-width">
        <q-card-section class="row justify-between">
          <div class="text-h6">Petrol Resource</div>
          <q-btn
            flat
            round
            size="sm"
            color="white"
            icon="close"
            v-close-popup
          />
        </q-card-section>

        <q-separator />

        <q-img
          src="~assets/img/petrol_resource_bg.webp"
          style="height: 200px; width: 100%"
        />

        <q-card-section class="q-px-none">
          <q-list dense>
            <q-item clickable>
              <q-item-section>
                <q-item-label> Available: </q-item-label>
              </q-item-section>

              <q-item-section
                avatar
                :class="{
                  'text-negative': isStorageFull('petrolWarehouse'),
                }"
              >
                <q-item-label>
                  {{ petrolAvailableDisplay }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label> Storage Capacity: </q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-item-label>
                  {{ petrolCapacityDisplay }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label> Production: </q-item-label>
              </q-item-section>

              <q-item-section
                avatar
                v-if="energyAvailable <= 0"
                class="text-negative"
              >
                <q-item-label> 0/min </q-item-label>
              </q-item-section>

              <q-item-section
                avatar
                v-else-if="!isStorageFull('petrolWarehouse')"
                :class="{
                  'text-positive': isFullProduction('petrolMine'),
                  'text-yellow-12': !isFullProduction('petrolMine'),
                }"
              >
                <q-item-label>
                  +{{ petrolProductionDisplay }}/min
                </q-item-label>
              </q-item-section>
              <q-item-section avatar v-else class="text-negative"
                >-{{ petrolProduction }}/min</q-item-section
              >
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label> Energy usage: </q-item-label>
              </q-item-section>

              <q-item-section avatar v-if="energyAvailable <= 0">
                <q-item-label> 0/min </q-item-label>
              </q-item-section>

              <q-item-section v-else avatar>
                <q-item-label> {{ petrolMineEnergyUsage }}/min </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            icon="fas fa-exchange-alt"
            color="info"
            label="Trade PETROL/BKM"
            to="/trade/PETROL_BKM"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showEnergyData">
      <q-card class="full-width">
        <q-card-section class="row justify-between">
          <div class="text-h6">Energy Resource</div>
          <q-btn
            flat
            round
            size="sm"
            color="white"
            icon="close"
            v-close-popup
          />
        </q-card-section>

        <q-separator />

        <q-img
          src="~assets/img/energy_resource_bg.webp"
          style="height: 200px; width: 100%"
        />

        <q-card-section class="q-px-none">
          <q-list dense>
            <q-item clickable>
              <q-item-section>
                <q-item-label> Available: </q-item-label>
              </q-item-section>

              <q-item-section avatar class="text-positive">
                <q-item-label>
                  {{ energyAvailableDisplay }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section>
                <q-item-label> Consumption: </q-item-label>
              </q-item-section>

              <q-item-section avatar class="text-negative">
                <q-item-label> -{{ energyConsumption }}/min </q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-if="energyAvailable > 0" clickable>
              <q-item-section>
                <q-item-label> Time left: </q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-item-label>
                  {{ energyTimeLeft }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            icon="fas fa-exchange-alt"
            color="info"
            label="Buy Energy"
            @click="energyDepositPopup = true"
            v-close-popup
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showBKMData">
      <q-card class="full-width">
        <q-card-section class="row justify-between">
          <div class="text-h6">$BKM Resource</div>
          <q-btn
            flat
            round
            size="sm"
            color="white"
            icon="close"
            v-close-popup
          />
        </q-card-section>

        <q-separator />

        <q-img
          src="~assets/img/bkm_resource_bg.webp"
          style="height: 200px; width: 100%"
        />

        <q-card-section class="q-px-none">
          <q-list dense>
            <q-item clickable>
              <q-item-section>
                <q-item-label> Available: </q-item-label>
              </q-item-section>

              <q-item-section avatar class="text-positive">
                <q-item-label>
                  {{ bkmAvailableDisplay }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            color="info"
            label="Deposit"
            icon="file_download"
            @click="bkmDepositPopup = true"
            v-close-popup
          ></q-btn>

          <q-btn
            color="negative"
            label="Withdraw"
            icon="file_upload"
            @click="bkmWithdrawPopup = true"
            v-close-popup
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="energyDepositPopup">
      <q-card dark class="full-width">
        <q-card-section class="row justify-between items-center">
          <div class="text-h6">$BKM to Energy</div>
          <q-btn
            flat
            round
            size="sm"
            color="white"
            icon="close"
            v-close-popup
          />
        </q-card-section>

        <q-separator />

        <div class="energy-popup">
          <div class="text-subtitle2">
            <q-card-section>
              <q-card-section class="q-pt-sm">
                <div class="q-mb-lg">
                  <div
                    class="q-pa-sm text-weight-bold text-overline bg-primary rounded-borders text-center"
                  >
                    {{ energyCostBreakdown }}
                  </div>
                </div>
                <q-slider
                  id="depositEnergySlider"
                  v-model="depositAmount"
                  :min="50"
                  :max="10000"
                  :step="50"
                  label
                  label-always
                  color="info"
                />
              </q-card-section>

              <q-card-actions align="center">
                <q-btn
                  label="Convert"
                  color="info"
                  icon="file_download"
                  @click="depositEnergy(depositAmount)"
                />
              </q-card-actions>
            </q-card-section>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="bkmDepositPopup">
      <q-card dark class="full-width">
        <q-card-section class="row justify-between items-center">
          <div class="text-h6">Deposit $BKM</div>
          <q-btn
            flat
            round
            size="sm"
            color="white"
            icon="close"
            v-close-popup
          />
        </q-card-section>

        <q-separator />

        <div class="bkm-popup">
          <div class="text-subtitle2">
            <q-card-section>
              <q-card-section class="q-pt-sm">
                <q-slider
                  id="depositEnergySlider"
                  v-model="bkmDepositAmount"
                  :min="50"
                  :step="50"
                  :max="10000"
                  label
                  label-always
                  color="info"
                />
              </q-card-section>

              <q-card-actions align="center" class="q-gutter-sm">
                <IncreaseAllowance
                  :address="ContractAddress.getSpaceRidersGameAddress()"
                  :amount="bkmDepositAmount"
                  :tokenAddress="ContractAddress.getSpaceRidersAddress()"
                />
                <q-btn
                  label="Deposit"
                  icon="file_download"
                  color="info"
                  @click="depositBkm(bkmDepositAmount)"
                />
              </q-card-actions>
            </q-card-section>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="bkmWithdrawPopup">
      <q-card dark class="full-width">
        <q-card-section class="row justify-between items-center">
          <div class="text-h6">Withdraw $BKM</div>
          <q-btn
            flat
            round
            size="sm"
            color="white"
            icon="close"
            v-close-popup
          />
        </q-card-section>

        <q-separator />

        <div class="bkm-popup">
          <div class="text-subtitle2">
            <q-card-section>
              <q-card-section class="q-pt-sm">
                <q-slider
                  id="depositEnergySlider"
                  v-model="bkmWithdrawAmount"
                  :min="50"
                  :step="50"
                  :max="10000"
                  label
                  label-always
                  color="negative"
                />
              </q-card-section>

              <q-card-actions align="center">
                <q-btn
                  label="Withdraw"
                  color="negative"
                  icon="file_upload"
                  @click="withdrawBkm(bkmWithdrawAmount)"
                />
              </q-card-actions>
            </q-card-section>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import ObjectID from "bson-objectid";
import ResourceType from "../constants/ResourceType";
import { ref, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import tc from "thousands-counter";
import SpaceRidersGameContract, {
  EnergyDepositAttributes,
  SignatureData,
} from "../service/contract/SpaceRidersGameContract";
import ApiRequest from "../service/http/ApiRequests";
import IncreaseAllowance from "./IncreaseAllowance";
import ContractAddress from "../service/contract/ContractAddress";
import {
  ACTIVE_PLANET_CHANGED,
  UPDATED_ALL,
  ENERGY_DEPOSITED,
} from "../constants/Events";
import { useQuasar } from "quasar";

const showMetalData = ref(false);
const showCrystalData = ref(false);
const showPetrolData = ref(false);
const showEnergyData = ref(false);
const showBKMData = ref(false);

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;
const $q = useQuasar();

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const $store = useStore();

const activePlanet = computed(() => {
  const currentPlanet = $store.getters.activePlanet;
  if (currentPlanet === false) return false;

  return currentPlanet;
});

const energyAvailable = computed(() => {
  if ($store.getters.activePlanet === false) return false;
  return $store.getters.activePlanet.resources.energy;
});

const bkmAvailableDisplay = computed(() => {
  if ($store.getters.activePlanet === false) return false;
  return tc($store.getters.activePlanet.resources.bkm.toFixed(3), {
    digits: 3,
  });
});

const bkmAvailable = computed(() => {
  if ($store.getters.activePlanet === false) return false;
  return $store.getters.activePlanet.resources.bkm;
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

  const hours = Math.round(minutes - m) / 60;
  const h = hours % 24;

  const days = Math.round(hours - h) / 24;

  let str = "";
  if (days > 0) str += `${days} (D) `;
  if (h > 0) str += `${h} (h)`;
  if (m > 0) str += ` ${m} (m)`;
  if (s >= 0) str += ` ${s} (s)`;

  return str;
}

const energyConsumption = computed(() => {
  if ($store.getters.activePlanet === false) return false;
  return $store.getters.activePlanet.resources.energy_usage.toFixed(4);
});

const energyTimeLeft = computed(() => {
  if ($store.getters.activePlanet === false) return false;
  const availableEnergy = $store.getters.activePlanet.resources.energy;
  const consumption = energyConsumption.value / 60;
  const minutesLeft = availableEnergy / consumption;
  const tl = timeLeft(minutesLeft);
  if (tl === "") return "N/A";
  return tl;
});

const metalAvailableDisplay = computed(() => {
  return tc($store.getters.activePlanet.resources.metal.toFixed(3), {
    digits: 3,
  });
});

const metalAvailable = computed(() => {
  return $store.getters.activePlanet.resources.metal;
});

const crystalAvailableDisplay = computed(() => {
  return tc($store.getters.activePlanet.resources.crystal.toFixed(3), {
    digits: 3,
  });
});

const crystalAvailable = computed(() => {
  return $store.getters.activePlanet.resources.crystal;
});

const petrolAvailableDisplay = computed(() => {
  return tc($store.getters.activePlanet.resources.petrol.toFixed(3), {
    digits: 3,
  });
});

const petrolAvailable = computed(() => {
  return $store.getters.activePlanet.resources.petrol;
});

const metalProduction = computed(() => {
  if ($store.getters.resourceData.metalMine === undefined) return;
  const info = calculateProduction(ResourceType.METAL_MINE);
  return info.production;
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

  let healthPercentage = 1;
  if (currentLevel > 0) {
    healthPercentage = currentHealth / maxHealth;
  }

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

  let mineFullHealth = true;
  let warehouseFullHealth = true;

  const mine = rD[mappings[resourceType]["mine"]];
  const warehouse = rD[mappings[resourceType]["warehouse"]];

  if (mine === undefined || mine === false) return false;
  if (warehouse === undefined || warehouse === false) return false;

  const mineLvl = mine["level"];
  const warehouseLvl = warehouse["level"];

  if (mineLvl !== 0) {
    const mineCurrentHealth = mine["health"];
    const mineMaxHealth = mine["upgrades"][mine["level"]]["health"];
    mineFullHealth = mineCurrentHealth / mineMaxHealth === 1;
  }

  if (warehouseLvl !== 0) {
    const warehouseCurrentHealth = warehouse["health"];
    const warehouseMaxHealth = warehouse["upgrades"][warehouseLvl]["health"];
    warehouseFullHealth = warehouseCurrentHealth / warehouseMaxHealth === 1;
  }

  const reserveEmpty = $store.getters.activePlanet.reserves[resourceType] <= 0;

  return !mineFullHealth || !warehouseFullHealth || reserveEmpty;
};

const energyDepositPopup = ref(false);
const bkmDepositPopup = ref(false);
const bkmWithdrawPopup = ref(false);
const bkmPopup = ref(false);
const depositAmount = ref(50);

const bkmDepositAmount = ref(50);
const bkmWithdrawAmount = ref(50);

const sprCost = computed(() => {
  const tokenPrice = $store.getters.tokenPrice;
  const sprCost = (1 / tokenPrice) * depositAmount.value;
  return sprCost;
});

const energyCostBreakdown = computed(() => {
  if (!energyDepositPopup.value) return false;
  const amount =
    depositAmount.value.toFixed(2) - depositAmount.value.toFixed(2) * 0.1;
  return `${amount} $BKM - ${amount / 10} Energy (-10% $BKM Fee)`;
});

async function depositEnergy(amount) {
  const notif = $q.notify(
    $notification("progress", "Waiting for transaction to complete...")
  );

  try {
    await ApiRequest.depositEnergy({
      planetId: $store.getters.activePlanet.id,
      amount: amount.toFixed(2),
    });

    notif($notification("success", "Energy deposited successfully!"));

    $store.commit("incrementEnergy", {
      energy: (amount - amount * 0.1) / 10,
    });
    $store.commit("decrementBkm", { bkm: amount });

    energyDepositPopup.value = false;
  } catch (ex) {
    notif($notification("failed", ex));
  }
}

async function depositBkm(amount) {
  const uuid = ObjectID().toHexString();
  const energyDeposit = new EnergyDepositAttributes(
    uuid,
    amount.toString(),
    $store.getters.activePlanet.id
  );

  const notif = $q.notify(
    $notification("progress", "Waiting for transaction to complete...")
  );

  try {
    const fee = (amount * 1) / 100;
    const tx = await SpaceRidersGameContract.bkmDeposit(energyDeposit);
    await tx.wait();

    await ApiRequest.bkmTransaction({
      planetId: $store.getters.activePlanet.id,
      guid: uuid,
      type: "deposit",
    });

    notif($notification("success", "$BKM deposited successfuly!"));

    $store.commit("incrementBkm", { bkm: amount - fee });
    bkmDepositPopup.value = false;
  } catch (ex) {
    notif($notification("failed", ex));
  }
}

async function withdrawBkm(amount) {
  const uuid = ObjectID().toHexString();

  const notif = $q.notify(
    $notification("progress", "Waiting for transaction to complete...")
  );

  try {
    const re = await ApiRequest.bkmWithdraw({
      planetId: $store.getters.activePlanet.id,
      guid: uuid,
      type: "withdraw",
      amount: amount.toString(),
    });

    const sD = new SignatureData(re.v, re.r, re.s);

    const energyDeposit = new EnergyDepositAttributes(
      uuid,
      re.amount,
      $store.getters.activePlanet.id
    );

    const tx = await SpaceRidersGameContract.bkmWithdraw(energyDeposit, sD);
    await tx.wait();

    await ApiRequest.bkmTransaction({
      planetId: $store.getters.activePlanet.id,
      guid: uuid,
      type: "withdraw",
    });

    notif($notification("success", "$BKM withdrawed successfuly!"));

    $store.commit("decrementBkm", { bkm: amount });
    bkmDepositPopup.value = false;
  } catch (ex) {
    notif($notification("failed", ex));
  }
}

function startEnergyTimer() {
  if ($store.getters.activePlanet === false) return false;

  if ($store.getters.energyTimerId !== false) {
    clearInterval($store.getters.energyTimerId);
    $store.commit("setEnergyTimerId", false);
  }

  const intId = setInterval(() => {
    if (energyAvailable.value <= 0) {
      clearInterval($store.getters.energyTimerId);
      $store.commit("setEnergyTimerId", false);
      return;
    }

    const eC = $store.getters.activePlanet.resources.energy_usage;
    $store.commit("decrementEnergy", { energy: eC / 60 });
  }, 1000);

  $store.commit("setEnergyTimerId", intId);
}

const startTimers = () => {
  startEnergyTimer();
};

$eventBus.on(ACTIVE_PLANET_CHANGED, () => {
  startTimers();
});

$eventBus.on(UPDATED_ALL, () => {
  startTimers();
});
</script>
<style lang="scss">
.energy-popup {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(~assets/img/energy_resource_bg.webp);
  background-size: cover;
  background-position: center;
}

.bkm-popup {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(~assets/img/bkm_resource_bg.webp);
  background-size: cover;
  background-position: center;
}

.resource-box {
  width: 110px;
  height: 110px;
}

.btn-red-glass-element {
  box-shadow: 0 0 2rem 0 rgba(255, 0, 0, 0.4);
  color: red;
}

.btn-yellow-glass-element {
  box-shadow: 0 0 2rem 0 rgb(203, 212, 75);
  color: yellow;
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
