<template>
  <q-card dark class="q-my-md">
    <q-item>
      <q-item-section class="text-center text-h6">
        <q-item-label>Overview</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-img src="~assets/img/overview.webp" style="height: 350px; width: 100%">
      <ResourcesDisplay class="absolute-bottom" />
    </q-img>

    <q-card-section
      class="q-px-none q-mt-sm"
      :style="$q.screen.lt.md ? '' : 'padding: 0 12em'"
    >
      <q-list dense separator>
        <q-item clickable>
          <q-item-section>Diameter:</q-item-section>
          <q-item-section avatar>
            {{ diameter }} KM ({{ slotsAvailable }})
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>Temperature:</q-item-section>
          <q-item-section avatar> {{ temperature }} </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>Position: </q-item-section>
          <q-item-section avatar> [{{ position }}] </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>Metal Reserve: </q-item-section>
          <q-item-section avatar> {{ metalReserve }} </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>Crystal Reserve: </q-item-section>
          <q-item-section avatar>
            {{ crystalReserve }}
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>Petrol Reserve: </q-item-section>
          <q-item-section avatar>
            {{ petrolReserve }}
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>Type: </q-item-section>
          <q-item-section avatar>
            {{ type }}
          </q-item-section>
        </q-item>


        <q-item clickable>
          <q-item-section>Rarity: </q-item-section>
          <q-item-section avatar>
            {{ rarity }}
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>Level: </q-item-section>
          <q-item-section avatar>
            {{ level }}
          </q-item-section>
        </q-item>

        <q-item v-if="isStaking" clickable>
          <q-item-section>Staking Time: </q-item-section>
          <q-item-section avatar>
            {{ stakingHoursLeft }}
          </q-item-section>
        </q-item>

        <q-item v-if="isStaking" clickable>
          <q-item-section>LP Value: </q-item-section>
          <q-item-section avatar> {{ lpPrice }}$ </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions align="center">
      <q-btn
        @click="openUpdateDialog = !openUpdateDialog"
        color="primary"
        icon="autorenew"
        label="Update"
      />

      <q-btn
        v-if="!isStaking"
        @click="openTierDialog"
        color="info"
        icon="settings"
        label="Upgrade"
      />

      <q-btn
        v-else
        @click="unstake"
        color="negative"
        :loading="unstakeDisabled"
        :disable="unstakeDisabled"
      >
        Withdraw
        <template v-slot:loading>
          <q-spinner-rings size="1em" class="on-left" />
          Staking...
        </template>
      </q-btn>
    </q-card-actions>
  </q-card>

  <q-dialog v-model="openUpdateDialog">
    <q-card class="bg-dark text-white full-width">
      <q-btn
        round
        class="absolute-top-right"
        flat
        color="white"
        icon="close"
        v-close-popup
      />

      <img
        src="~assets/img/update_planet_bg.webp"
        style="height: 200px; object-fit: cover"
      />

      <q-card-section class="text-center">
        <div class="text-h6">RENAME PLANET</div>
        <div class="text-caption">
          Updating a planet costs 0.5 BNB, also, you can choose a planet name
          (which can be changed later).
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          label-color="info"
          v-model="planetName"
          autofocus
          label="Planet Name"
          standout="bg-secondary"
        />
      </q-card-section>

      <q-card-section class="q-pt-none text-center">
        <q-btn
          label="Rename Planet"
          icon="edit"
          color="warning"
          no-caps
          class="q-px-lg"
          v-close-popup
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="layout">
    <q-card dark class="full-width">
      <q-btn
        round
        class="absolute-top-right"
        flat
        color="white"
        icon="close"
        v-close-popup
      />

      <img
        src="~assets/img/upgrade_planet_bg.webp"
        style="height: 200px; object-fit: cover"
      />

      <q-card-section class="text-center">
        <div class="text-h6">Upgrade Tier</div>
      </q-card-section>

      <q-card-section v-if="!isStaking" class="q-py-none">
        <q-select
          color="info"
          filled
          v-model="selectedTier"
          :options="tierOptions"
          label="CHOOSE NEW TIER"
          stack-label
        >
          <template v-slot:label>
            <span style="color: #2253f4" class="text-weight-bold"
              >CHOOSE NEW TIER</span
            >
          </template>
        </q-select>
      </q-card-section>

      <q-card-section>
        <q-list dense separator>
          <q-item clickable>
            <q-item-section>
              <q-item-label>Price:</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label>
                {{ selectedTierInfo.usd_cost }} USD ({{
                  selectedTierInfo.token_cost
                }}
                $BKM)
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>Staking locked:</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label> {{ stakingLockedDays }} days </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>Performance fee:</q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label> 0.5% </q-item-label>
            </q-item-section>
          </q-item>

          <q-expansion-item label="Benefits">
            <q-list dense separator>
              <q-item
                clickable
                v-for="(benefit, index) in selectedTierInfo.benefit_lines"
                :key="benefit"
              >
                <q-item-section>
                  <q-item-label> #{{ index + 1 }} </q-item-label>
                </q-item-section>

                <q-item-section avatar>
                  <q-item-label>
                    {{ benefit }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="center" class="q-gutter-x-sm">
        <IncreaseAllowance
          :address="ContractAddress.getSpaceRidersGameAddress()"
          :amount="selectedTierInfo.token_cost"
          :tokenAddress="ContractAddress.getSpaceRidersAddress()"
        />

        <q-btn color="info" icon="settings" label="Upgrade" @click="stake" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, getCurrentInstance, onUnmounted } from "vue";

import tc from "thousands-counter";
import { useStore } from "vuex";
import ResourcesDisplay from "src/components/ResourcesDisplay.vue";
import ApiRequest from "../service/http/ApiRequests";
import SpaceRidersGameContract, {
  BenefitStakingAttributes,
  SignatureData,
} from "../service/contract/SpaceRidersGameContract";

import ERC20 from "../service/contract/ERC20";
import ApiRequests from "../service/http/ApiRequests";
import IncreaseAllowance from "../components/IncreaseAllowance";
import ContractAddress from "../service/contract/ContractAddress";
import { STAKE, UNSTAKE } from "../constants/Events";
import { useQuasar } from "quasar";
const $q = useQuasar();

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const openUpdateDialog = ref(false);

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

  return `${galaxy}:${solarSystem}:${position}`;
});

const type = computed(() => {
  return $store.getters.activePlanet.type;
});

const rarity = computed(() => {
  return $store.getters.activePlanet.rarity.toUpperCase();
});

const level = computed(() => {
  return `${$store.getters.activePlanet.level} (${$store.getters.activePlanet.experience} XP)`;
});

const diameter = computed(() => {
  return tc($store.getters.activePlanet.diameter, { digits: 2 });
});

const metalReserve = computed(() => {
  return tc($store.getters.activePlanet.reserves.total_metal, { digits: 2 });
});

const crystalReserve = computed(() => {
  return tc($store.getters.activePlanet.reserves.total_crystal, { digits: 2 });
});

const petrolReserve = computed(() => {
  return tc($store.getters.activePlanet.reserves.total_petrol, { digits: 2 });
});

const slotsAvailable = computed(() => {
  return `${$store.getters.activePlanet.slots_used}/${$store.getters.activePlanet.slots}`;
});

const lpPrice = ref(0);
const isStaking = computed(() => {
  const staked = $store.getters.activePlanet.tier.staked;
  if (staked) lpValue();
  return staked;
});

const lpValue = async () => {
  if (!isStaking.value) return;
  const chainInfo = $store.getters.chainInfo;

  const pairAddr = chainInfo.pair_contract;
  const pairContract = new ERC20(pairAddr);
  const userLpBalance = await SpaceRidersGameContract.stakedLpAmount(
    $store.getters.activePlanet.id
  );

  const totalLpSupply = await pairContract.totalSupply($store.getters.address);

  const sprAddr = chainInfo.token_contract;
  const sprContract = new ERC20(sprAddr);
  const sprPairBalance = await sprContract.balanceOf(pairAddr);
  const busdAddr = chainInfo.busd_contract;
  const busdContract = new ERC20(busdAddr);
  const busdPairBalance = await busdContract.balanceOf(pairAddr);

  const sprLpValue =
    (userLpBalance / totalLpSupply) *
    sprPairBalance *
    parseFloat($store.getters.tokenPrice);
  const busdLpValue = (userLpBalance / totalLpSupply) * busdPairBalance;

  lpPrice.value = (sprLpValue + busdLpValue).toFixed(1);
};

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
  const stakeTime = selTier["tokens_time_locked"];
  return Math.ceil(stakeTime / 86400); // 1 day in seconds
});

const activeTier = computed(() => {
  if ($store.getters.activePlanet === false) return;
  if (!$store.getters.activePlanet.tier.staked) return;

  return $store.getters.activePlanet.tier.tier_name;
});

function calculateClaimDate(time) {
  const now = new Date();
  const claim = new Date(time * 1000);

  const diffSeconds = (claim.getTime() - now.getTime()) / 1000;
  if (diffSeconds <= 0) return false;
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

const stakingHoursLeft = computed(() => {
  if ($store.getters.activePlanet === false) return;
  if (!$store.getters.activePlanet.tier.staked) return;
  const stakingFinished = $store.getters.activePlanet.tier.time_release;

  let timeString = calculateClaimDate(stakingFinished);
  if (timeString === false) return "Withdraw";
  return timeString;
});

async function openTierDialog() {
  const data = (await ApiRequest.getTierInfo()).data;
  tierInfoReq.value = data;
  layout.value = true;
}

async function stake() {
  const notif = $q.notify(
    $notification("progress", "Waiting for transaction to complete...")
  );

  const tier = selectedTier.value.value;

  const data = {
    planetId: $store.getters.activePlanet.id,
    tier: tier,
  };

  try {
    const stakingRequest = (await ApiRequest.createStakingRequest(data)).data;

    const attributes = new BenefitStakingAttributes(
      stakingRequest.planet_id,
      String(stakingRequest.amount),
      stakingRequest.tier,
      stakingRequest.time_release,
      stakingRequest.router
    );

    const sD = new SignatureData(
      stakingRequest.v,
      stakingRequest.r,
      stakingRequest.s
    );

    const tx = await SpaceRidersGameContract.stakingRequest(sD, attributes);
    await tx.wait();
    await new Promise((r) => setTimeout(r, 5000));
    await ApiRequest.confirmStakingRequest({
      planetId: $store.getters.activePlanet.id,
    });

    const updatedPlanet = (
      await ApiRequests.getAllInfoPlanet($store.getters.activePlanet.id)
    ).data;

    $store.commit("updateActivePlanet", { planet: updatedPlanet.planet });
    layout.value = false;

    $eventBus.emit(STAKE);
    notif($notification("success", "Staked successfully, enjoy!"));
  } catch (e) {
    console.log(e);
    notif($notification("failed", e));
    return;
  }
}

const unstakeDisabled = computed(() => {
  if ($store.getters.activePlanet === false) return false;
  if (!$store.getters.activePlanet.tier.staked) return false;

  const timeRelease = $store.getters.activePlanet.tier.time_release;
  const now = Date.now() / 1000;

  return timeRelease - now >= 0;
});

async function unstake() {
  const notif = $q.notify(
    $notification("progress", "Waiting for transaction to complete...")
  );

  try {
    const tx = await SpaceRidersGameContract.unstakingRequest(
      $store.getters.activePlanet.id
    );
    await tx.wait();

    await ApiRequest.unstakeRequest({
      planetId: $store.getters.activePlanet.id,
    });

    const updatedPlanet = (
      await ApiRequests.getAllInfoPlanet($store.getters.activePlanet.id)
    ).data;

    $store.commit("updateActivePlanet", { planet: updatedPlanet.planet });

    layout.value = false;
    $eventBus.emit(UNSTAKE);

    notif($notification("success", "Un-staked successfully, thank you!"));
  } catch (e) {
    console.log(e);
    notif($notification("failed", e));
  }
}
</script>
<style lang="scss">
.overview-card {
  background: url(../assets/img/hologram1.webp);
  // background: #0E6D89;
  background-size: auto;
  background-position: center;
  &::before {
    display: none !important;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  top: 3px;
  left: calc(100% - 410px);
  background-position-x: center;
  width: 400px;
  border: 5px solid #08b7ed !important;
  bottom: 3px;
  border-radius: 10px !important;
}
</style>
