<template>
  <q-card class="glass-element text-white">
    <glass-element-heading class="text-h6 text-center text-weight-bold text-secondary">
      OVERVIEW
    </glass-element-heading>

    <div class="col-12">
      <q-card flat class="bg-transparent text-dark">
        <img src="~assets/img/overview.webp" width="100%" style="height: 400px; width: 100%" />

        <q-card-section class="text-secondary absolute-bottom-right tag-glass-element">
          <q-list dense class="text-left">
            <q-item>
              <q-item-section class="text-subtitle2 text-weight-bold">Diameter :</q-item-section>
              <q-item-section avatar>
                {{ diameter }} KM ({{ slotsAvailable }})
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-subtitle2 text-weight-bold">Temperature :</q-item-section>
              <q-item-section avatar> {{ temperature }} </q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-subtitle2 text-weight-bold">Position :
              </q-item-section>
              <q-item-section avatar> [{{ position }}] </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-subtitle2 text-weight-bold">Metal Reserve :
              </q-item-section>
              <q-item-section avatar> {{ metalReserve }} </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-subtitle2 text-weight-bold">Crystal Reserve :
              </q-item-section>
              <q-item-section avatar>
                {{ crystalReserve }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-subtitle2 text-weight-bold">Petrol Reserve :
              </q-item-section>
              <q-item-section avatar>
                {{ petrolReserve }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-subtitle2 text-weight-bold">Rarity :
              </q-item-section>
              <q-item-section avatar>
                {{ rarity }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-subtitle2 text-weight-bold">Level :
              </q-item-section>
              <q-item-section avatar>
                {{ level }}
              </q-item-section>
            </q-item>

            <q-item v-if="isStaking">
              <q-item-section class="text-subtitle2 text-weight-bold">Staking Time :
              </q-item-section>
              <q-item-section avatar>
                {{ stakingHoursLeft }}
              </q-item-section>
            </q-item>

            <q-item v-if="isStaking">
              <q-item-section class="text-subtitle2 text-weight-bold">LP Value :
              </q-item-section>
              <q-item-section avatar>
                {{ lpPrice }}$
              </q-item-section>
            </q-item>


            <q-item>
              <q-btn @click="openUpdateDialog = !openUpdateDialog" color="dark" label="Update" class="q-mr-xs" />

              <q-btn v-if="hasLvlUpPendingRewardClaim" color="dark" label="Lvl Reward" class="q-mr-xs"
                @click="claimPendingLvlUpReward" />

              <q-dialog v-model="openUpdateDialog">
                <q-card class="bg-dark text-white" style="
                          width: 600px;
                          max-width: 70vw;
                          border-radius: 20px;
                        ">
                  <q-btn round class="absolute-top-right" flat color="warning" icon="close" v-close-popup />
                  <img src="~assets/img/buyplanet_footer-scaled.webp" alt="" srcset="" />
                  <q-card-section class="text-center">
                    <div class="text-h6">RENAME PLANET</div>
                    <div class="text-subtitle1">
                      Updating a planet costs 0.5BNB, also, you can choose
                      a planet name (which can be changed later).
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <q-input label-color="info" v-model="planetName" autofocus label="Planet Name"
                      standout="bg-secondary" />
                  </q-card-section>

                  <q-card-section class="q-pt-none text-center">
                    <q-btn label="Rename Planet" color="warning" no-caps class="q-px-lg" v-close-popup />
                  </q-card-section>
                </q-card>
              </q-dialog>

              <q-btn v-if="!isStaking" @click="openTierDialog" color="warning" label="Upgrade" class="full-width" />
              <q-btn v-else @click="unstake" color="negative" class="full-width text-weight-bolder"
                :loading="unstakeDisabled" :disable="unstakeDisabled">
                Withdraw
                <template v-slot:loading>
                  <q-spinner-rings size="1em" class="on-left" />
                  Staking...
                </template>
              </q-btn>
            </q-item>
          </q-list>
        </q-card-section>



        <q-dialog v-model="layout">
          <q-layout style="height: 500px" view="l l f" container class="bg-dark">
            <q-header class="bg-primary">
              <q-toolbar>
                <q-toolbar-title>Upgrade Tier</q-toolbar-title>

                <q-btn flat v-close-popup round dense icon="close" />
              </q-toolbar>
            </q-header>

            <q-page-container>
              <q-page padding v-if="!isStaking">
                <div>
                  <q-select color="info" filled v-model="selectedTier" :options="tierOptions" label="CHOOSE NEW TIER"
                    stack-label>
                    <template v-slot:label>
                      <span style="color: #2253f4" class="text-weight-bold">CHOOSE NEW TIER</span>
                    </template>
                  </q-select>
                </div>
                <table class="q-py-md full-width">
                  <tr>
                    <td>
                      <span>Price</span>
                    </td>
                    <td>
                      <span class="text-weight-bold text-overline" style="font-size: 20px">
                        ${{ selectedTierInfo.usd_cost }} ({{
                            selectedTierInfo.token_cost
                        }}
                        &nbsp;
                        <img src="~assets/img/logo.webp" alt=""
                          style="height: 20px; width: 20px; vertical-align: middle" />)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Benefits</span>
                    </td>
                    <td>
                      <ul class="text-weight-bold text-overline q-ma-none q-pa-none"
                        style="font-size: 14px; list-style-type: none">
                        <li v-for="benefit in selectedTierInfo.benefit_lines" :key="benefit">
                          {{ benefit }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Staking locked</span>
                    </td>
                    <td>
                      <span class="text-weight-bold text-overline" style="font-size: 16px">{{ stakingLockedDays }}
                      </span>
                      days
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Performance fee</span>
                    </td>
                    <td>
                      <span class="text-weight-bold text-overline" style="font-size: 16px">
                        0.5%</span>
                    </td>
                  </tr>
                </table>

                <IncreaseAllowance :address="ContractAddress.getSpaceRidersGameAddress()"
                  :amount="selectedTierInfo.token_cost" :tokenAddress="ContractAddress.getSpaceRidersAddress()" />
                <q-btn style="float: right" color="warning" label="Upgrade" @click="stake" />
              </q-page>
            </q-page-container>
          </q-layout>
        </q-dialog>
      </q-card>
    </div>
  </q-card>
</template>

<script setup>
import { computed, ref, getCurrentInstance, onUnmounted } from "vue";

import tc from "thousands-counter";
import { useStore } from "vuex";
import GlassElementHeading from "components/GlassElementHeading";
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
import { useQuasar } from 'quasar'
const $q = useQuasar()

const $eventBus = getCurrentInstance().appContext.config.globalProperties.$eventBus;

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

const hasLvlUpPendingRewardClaim = computed(() => {
  const pendingLvlUpClaims = $store.getters.activePlanet.pending_levelup_reward;
  if (!pendingLvlUpClaims) return false;
  return pendingLvlUpClaims.filter(c => !c.completed).length > 0;
});

const position = computed(() => {
  const position = $store.getters.activePlanet.position;
  const solarSystem = $store.getters.activePlanet.solar_system;
  const galaxy = $store.getters.activePlanet.galaxy;

  return `${position}:${solarSystem}:${galaxy}`;
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
  const userLpBalance = await SpaceRidersGameContract.stakedLpAmount($store.getters.activePlanet.id);

  const totalLpSupply = await pairContract.totalSupply($store.getters.address);

  const sprAddr = chainInfo.token_contract;
  const sprContract = new ERC20(sprAddr);
  const sprPairBalance = await sprContract.balanceOf(pairAddr);
  const busdAddr = chainInfo.busd_contract;
  const busdContract = new ERC20(busdAddr);
  const busdPairBalance = await busdContract.balanceOf(pairAddr);

  const sprLpValue = ((userLpBalance / totalLpSupply) * sprPairBalance) * parseFloat($store.getters.tokenPrice);
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
  console.log(stakeTime);
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
  const notif = $q.notify($notification(
    "progress",
    "Waiting for transaction to complete...",
  ))

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
      stakingRequest.time_release
    );

    const sD = new SignatureData(
      stakingRequest.v,
      stakingRequest.r,
      stakingRequest.s
    );

    const tx = await SpaceRidersGameContract.stakingRequest(sD, attributes);
    await tx.wait();

    await ApiRequest.confirmStakingRequest({
      planetId: $store.getters.activePlanet.id,
    });

    const updatedPlanet = (
      await ApiRequests.getAllInfoPlanet($store.getters.activePlanet.id)
    ).data;

    $store.commit("updateActivePlanet", { planet: updatedPlanet.planet });
    layout.value = false;

    $eventBus.emit(STAKE);
    notif($notification(
      "success",
      "Staked successfully, enjoy!",
    ))

  } catch (e) {
    console.log(e);
    notif($notification(
      "failed",
      e,
    ))
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
  const notif = $q.notify($notification(
    "progress",
    "Waiting for transaction to complete...",
  ))

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

    notif($notification(
      "success",
      "Un-staked successfully, thank you!",
    ))

  } catch (e) {
    console.log(e);
    notif($notification(
      "failed",
      e,
    ))
  }

}

async function claimPendingLvlUpReward() {

  const notif = $q.notify($notification(
    "progress",
    "Waiting for transaction to complete...",
  ))


  try {
    const req = await ApiRequests.claimPendingLvlUpReward({
      planetId: $store.getters.activePlanet.id,
      claimId: $store.getters.activePlanet.pending_levelup_reward[0].id,
    });

    const sD = new SignatureData(
      req.data.v,
      req.data.r,
      req.data.s
    );

    const tx = await SpaceRidersGameContract.addPurchasingPower(req.data.amount, req.data.claim_id, sD);
    await tx.wait();

    await ApiRequests.confirmPendingLvlUpReward({
        claimId: $store.getters.activePlanet.pending_levelup_reward[0].id,
    });

    notif($notification(
      "success",
      "Successfully claimed level up reward",
    ))
  } catch(e) {
    notif($notification(
      "failed",
      e,
    ))
  }
}
</script>
