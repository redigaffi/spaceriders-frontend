<template>
  <div>
    <!-- CONTENT PANEL -->
    <div>
      <q-card class="glass-element text-white">
        <glass-element-heading
          class="text-h6 text-center text-weight-bold text-secondary"
        >
          OVERVIEW
        </glass-element-heading>

        <q-card-section class="row q-col-gutter-sm text-center">
          <div class="col-12 q-pa-sm">
            <q-card flat class="bg-transparent text-dark">
              <img
                src="~assets/img/planet-info-header.jpg"
                width="100%"
                style="height: 325px; width: 100%"
              />
              <q-card-section
                class="text-secondary absolute-top tag-glass-element"
              >
                {{ this.$store.getters.activePlanet.name }}
              </q-card-section>
              <q-card-section
                class="text-secondary absolute-bottom-right tag-glass-element"
              >
                <q-list dense class="text-left">
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Diameter :</q-item-section
                    >
                    <q-item-section avatar>
                      {{ diameter }} KM ({{ slotsAvailable }})
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Temperature :</q-item-section
                    >
                    <q-item-section avatar> {{ temperature }} </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Position :
                    </q-item-section>
                    <q-item-section avatar> [{{ position }}] </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Metal Reserve :
                    </q-item-section>
                    <q-item-section avatar> {{ metalReserve }} </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Crystal Reserve :
                    </q-item-section>
                    <q-item-section avatar>
                      {{ crystalReserve }}
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Petrol Reserve :
                    </q-item-section>
                    <q-item-section avatar>
                      {{ petrolReserve }}
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Planet Tier :
                    </q-item-section>
                    <q-item-section avatar>
                      <q-btn
                        @click="openTierDialog"
                        color="warning"
                        label="Upgrade"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="layout">
      <q-layout style="height: 450px" view="l l f" container class="bg-dark">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-toolbar-title>Upgrade Tier</q-toolbar-title>

            <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding>
            <q-select
              filled
              v-model="selectedTier"
              :options="tierOptions"
              label="Label (stacked)"
              stack-label
            >
              <template v-slot:label>
                <span style="color: #2253f4" class="text-weight-bold"
                  >CHOOSE NEW TIER</span
                >
              </template>
            </q-select>
            <br />
            Price: ${{ selectedTierInfo.usd_cost }} ({{
              selectedTierInfo.token_cost
            }}
            <img
              src="~assets/img/logo.png"
              alt=""
              style="height: 20px; width: 20px; vertical-align:middle"
            />)
            <br />
            <br />
            Benefits: <br />
            <ul>
              <li v-for="benefit in selectedTierInfo.benefit_lines" :key="benefit">
                {{ benefit }}
              </li>
            </ul>
            <br />
            Staking locked: {{ stakingLockedDays }} days
            <br />
            <br />
            Performance fee: 0.5%
            <br />
            <br />

            <q-btn
              style="float: right"
              color="warning"
              label="Upgrade"
              @click="stake"
            />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, ref, getCurrentInstance } from "vue";

import tc from "thousands-counter";
import { useStore } from "vuex";
import GlassElementHeading from "components/GlassElementHeading";
import ApiRequest from "../service/http/ApiRequests";
import BenefitStakingContract, {
  Attributes,
  SignatureData,
} from "../service/contract/BenefitStakingContract";

const $store = useStore();
const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const temperature = computed(() => {
  const minTemperature = $store.getters.activePlanet.min_temperature;
  const maxTemperature = $store.getters.activePlanet.max_temperature;

  let str = "";

  str += `${minTemperature}°C to `;

  if (maxTemperature > 0) {
    str += `+`;
  }

  str += `${maxTemperature}°C`;

  return str;
});

const position = computed(() => {
  const position = $store.getters.activePlanet.position;
  const solarSystem = $store.getters.activePlanet.solar_system;
  const galaxy = $store.getters.activePlanet.galaxy;

  return `${position}:${solarSystem}:${galaxy}`;
});

const diameter = computed(() => {
  return tc($store.getters.activePlanet.diameter, { digits: 2 });
});

const metalReserve = computed(() => {
  return tc($store.getters.activePlanet.max_resources.metal, { digits: 2 });
});

const crystalReserve = computed(() => {
  return tc($store.getters.activePlanet.max_resources.crystal, { digits: 2 });
});

const petrolReserve = computed(() => {
  return tc($store.getters.activePlanet.max_resources.petrol, { digits: 2 });
});

const slotsAvailable = computed(() => {
  return `${$store.getters.activePlanet.slots_used}/${$store.getters.activePlanet.slots}`;
});

const layout = ref(false);

const selectedTier = ref({ value: "TIER_1", label: "Tier 1" });
let tierOptions = [
  { value: "TIER_1", label: "Tier 1" },
  { value: "TIER_2", label: "Tier 2" },
];

let tierInfoReq = ref("");
const selectedTierInfo = computed(() => {
  if (tierInfoReq.value === "") return;
  return tierInfoReq.value[selectedTier.value.value];
});

const stakingLockedDays = computed(() => {
  if (tierInfoReq.value === "") return;
  const selTier = tierInfoReq.value[selectedTier.value.value];
  const stakeTime = selTier['tokens_time_locked'];
  
  return Math.ceil(stakeTime/86400); // 1 day in seconds
});

async function openTierDialog() {
  const data = (await ApiRequest.getTierInfo()).data;
  tierInfoReq.value = data;
  layout.value = true;
}

async function stake() {
  const closeWaitingNotification = $notification(
    "progress",
    "Waiting for transaction to complete...",
    0
  );

  const tier = selectedTier.value.value;

  const data = {
    planetId: $store.getters.activePlanet.id,
    tier: tier,
  };

  const stakingRequest = await ApiRequest.createStakingRequest(data);
  if (!stakingRequest.success) {
    $notification("failed", stakingRequest.error, 6000);
    closeWaitingNotification();
    return;
  }

  const attributes = new Attributes(
    stakingRequest.planetId,
    String(stakingRequest.amount),
    stakingRequest.tier,
    stakingRequest.timeRelease
  );

  const sD = new SignatureData(
    stakingRequest.v,
    stakingRequest.r,
    stakingRequest.s
  );
  let receipt = { status: 0 };

  try {
    const tx = await BenefitStakingContract.stakingRequest(sD, attributes);
    receipt = await tx.wait();
  } catch (e) {
    console.log(e);
    closeWaitingNotification();
  }

  if (receipt.status === 1) {
    const req = {
      planetId: $store.getters.activePlanet.id,
    };

    const confirmStake = await ApiRequest.confirmStakingRequest(req);

    if (!confirmStake.success) {
      $notification("failed", confirmStake.error, 6000);
      closeWaitingNotification();
      return;
    }
  }

  $notification("success", "Staked successfully, enjoy!", 6000);
  closeWaitingNotification();
}
</script>
