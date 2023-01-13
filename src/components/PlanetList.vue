<template>
  <q-card dark class="q-my-md" v-if="$store.getters.activePlanet !== false">
    <q-item>
      <q-item-section class="text-center text-h6">
        <q-item-label>My planets</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-img
      src="~assets/img/buyplanet_footer-scaled.webp"
      style="height: 350px; width: 100%"
    >
      <ResourcesDisplay class="absolute-bottom" />
    </q-img>

    <q-card-section class="q-px-none">
      <div class="row q-col-gutter-sm">
        <template v-for="(row, index) in rows" :key="index">
          <div
            class="col-12 col-md-6"
            :class="{
              'order-first': row.active,
              'order-last': !row.planet.is_favourite && !row.active,
            }"
          >
            <q-card
              dark
              bordered
              flat
              :style="
                row.active
                  ? `border: 1px solid ${getPaletteColor('info')}`
                  : row.planet.is_favourite
                  ? `border: 1px solid ${getPaletteColor('amber')}`
                  : ''
              "
            >
              <q-card-section horizontal>
                <q-img
                  class="col-2"
                  :src="row.image_url"
                  style="
                    width: 130px;
                    height: 192px;
                    object-fit: cover;
                    object-position: 50% 0%;
                  "
                  :style="{
                    background: `linear-gradient(to top, ${getPaletteColor(
                      row.color
                    )} 20% , ${getCssVar('primary') + 'ff'} 80%)`,
                  }"
                >
                  <q-badge
                    class="text-caption absolute-top justify-center no-border-radius glossy glass-element"
                    style="padding: 5px 0"
                    >lvl {{ row.planet.level }}</q-badge
                  >

                  <div
                    class="glossy glass-element absolute-bottom text-center no-border-radius ellipsis text-caption"
                    style="padding: 5px 0"
                  >
                    {{ row.name }}
                  </div>
                </q-img>

                <q-separator vertical />

                <q-card-section class="col text-body2 q-pa-none">
                  <q-list dense>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Rarity:</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-item-label :class="'text-' + row.color">{{
                          row.rarity
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section>
                        <q-item-label>Type:</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-item-label>{{ row.type }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section>
                        <q-item-label>Position:</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-item-label>{{ row.position }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item v-if="row.planet.building_queue !== null">
                      <q-item-section>
                        <q-item-label>Items in queue:</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                        <q-item-label>{{
                          row.planet.building_queue.items.length
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section>
                        <q-item-label>Slots used:</q-item-label>
                      </q-item-section>

                      <q-item-section>
                        <q-linear-progress
                          stripe
                          size="16px"
                          color="negative"
                          :value="
                            (100 * row.planet.slots_used) /
                            row.planet.slots /
                            100
                          "
                        >
                          <span
                            class="absolute-full flex flex-center text-white"
                            >{{ row.planet.slots_used }}/{{
                              row.planet.slots
                            }}</span
                          >
                        </q-linear-progress>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section>
                        <q-item-label>XP:</q-item-label>
                      </q-item-section>

                      <q-item-section>
                        <q-linear-progress
                          stripe
                          size="16px"
                          :value="
                            (100 * row.planet.experience) /
                            row.planet.experience_needed /
                            100
                          "
                          color="info"
                        >
                          <span
                            class="absolute-full flex flex-center text-white"
                            >{{ row.planet.experience }}/{{
                              row.planet.experience_needed
                            }}</span
                          >
                        </q-linear-progress>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions align="center">
                <q-btn
                  color="info"
                  label="mint nft"
                  @click="mintPlanetPopup = true; mintSelectedPlanet = row.planet.id"
                />
                <q-btn
                  :icon="row.active ? 'check_box' : 'check_box_outline_blank'"
                  color="info"
                  :label="row.active ? 'Active' : 'Select'"
                  :disabled="row.active"
                  @click="changeActivatePlanet(row.planet)"
                />
                <q-btn
                  :outline="!row.planet.is_favourite"
                  :icon="
                    row.planet.is_favourite ? 'fas fa-star' : 'far fa-star'
                  "
                  color="amber"
                  @click="planetMark(row)"
                />
              </q-card-actions>
            </q-card>
          </div>
        </template>
      </div>
    </q-card-section>
  </q-card>






  <q-dialog v-model="mintPlanetPopup">
      <q-card class="bg-dark text-white q-pb-md full-width">
        <q-card-section class="row justify-between">
          <div class="text-h6">MINT A PLANET</div>
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
          src="~assets/img/buy_planet_bg.webp"
          style="height: 200px; width: 100%"
        />

        <q-card-section class="q-pb-xs">
          <q-item-section
            style="border-radius: 5px"
            :style="{
              color: balanceColor,
              border: `1px solid ${balanceColor}`,
              'box-shadow': `0 0 5px ${balanceColor}`,
            }"
            class="q-pa-xs"
          >
            <p
              class="q-ma-none text-body2 text-center"
              :style="{ color: balanceColor }"
            >
              Your balance is {{ tokenBalance }} $BKM.
            </p>
            <p
              v-if="!canBuyPlanets"
              class="q-ma-none text-body2 text-center"
              :style="{ color: balanceColor }"
            >
              Not enough to buy a planet.
            </p>
          </q-item-section>
        </q-card-section>

        <q-card-section
          v-if="$store.getters.planets.length < 6"
          class="q-gutter-sm q-py-sm"
        >
          <q-input
            label-color="white"
            v-model="planetCostDisplay"
            label="MINT Cost"
            standout="bg-secondary"
            readonly
            style="
              border: 2px solid #2253f4;
              border-radius: 5px;
              font-size: 14px;
              box-shadow: 0 0 20px #2253f4;
              color: #fff;
            "
          />
          <q-input
            label-color="white"
            v-model="bnbFeeDisplay"
            label="FEES"
            readonly
            standout="bg-secondary"
            style="
              border: 2px solid #2253f4;
              border-radius: 5px;
              font-size: 14px;
              box-shadow: 0 0 20px #2253f4;
              color: #fff;
            "
          />

        </q-card-section>

        <q-card-actions
          align="center"
          class="q-px-md"
        >
          <IncreaseAllowance
            :address="ContractAddress.getSpaceRidersGameAddress()"
            :amount="planetCost.token_cost"
            :tokenAddress="ContractAddress.getSpaceRidersAddress()"
            :class="{ 'full-width q-mb-sm': $q.screen.lt.md }"
          />

          <q-btn
            :class="$q.screen.lt.md ? 'full-width' : 'q-ml-sm'"
            color="info"
            icon="add"
            label="Mint Planet"
            @click="mintPlanet(mintSelectedPlanet)"
            v-close-popup
          >
          </q-btn>

          <q-inner-loading :showing="visible">
            <q-spinner size="70px" color="warning" />
          </q-inner-loading>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { watchEffect, computed, watch, ref, getCurrentInstance } from "vue";
import { colors, getCssVar, useQuasar } from "quasar";
import { useStore } from "vuex";
import ResourcesDisplay from "components/ResourcesDisplay.vue";
import { ACTIVE_PLANET_CHANGED } from "../constants/Events";
import ApiRequests from "../service/http/ApiRequests";
import SpaceRidersGameContract, {
  SignatureData,
} from "../service/contract/SpaceRidersGameContract";
import SpaceRiders from "../service/contract/SpaceRiders";
import SpaceRidersNFT from "../service/contract/SpaceRidersNFT";

import ContractAddress from "../service/contract/ContractAddress";
import tc from "thousands-counter";
import IncreaseAllowance from "./IncreaseAllowance";

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;
//https://quasar.dev/layout/routing-with-layouts-and-pages
const $store = useStore();

const tokenAmount = ref(0);
const mintPlanetPopup = ref(false);
const mintSelectedPlanet = ref("");

const planetCost = ref({});
const planetCostDisplay = ref();
const bnbFeeDisplay = ref();
const visible = ref(false);

const canBuyPlanets = computed(() => {
  return tokenAmount.value > planetCost.value.token_cost;

});

const balanceColor = computed(() => {
  return canBuyPlanets.value ? getCssVar("positive") : getCssVar("negative");
});

async function getBalance() {
  try {
    tokenAmount.value = await SpaceRiders.balanceOf($store.getters.address);
  } catch (e) {
    console.log(e);
  }
}

const tokenBalance = computed(() => {
  return tc(tokenAmount.value, { digits: 3 });
});


watchEffect(async () => {
  if (mintPlanetPopup.value) {
    await getBalance();
    planetCost.value = "";
    bnbFeeDisplay.value = "";
    visible.value = true;
    planetCost.value = await ApiRequests.fetchPlanetCost();
    const fixedCost = Math.trunc(planetCost.value.token_cost * 1000) / 1000;
    planetCostDisplay.value = `${fixedCost} $BKM ($${planetCost.value.usd_cost})`;
    bnbFeeDisplay.value = "0.0025 BNB";
    visible.value = false;
  }
});
const $q = useQuasar();
const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;


const { getPaletteColor } = colors;

const colorMapping = {
  common: "blue-grey",
  uncommon: "green-10",
  rare: "blue-14",
  epic: "purple-9",
  legendary: "deep-orange",
};

let rows = computed(() => {
  const activePlanet = $store.getters.activePlanet;
  if (!activePlanet) return [];

  let re = [];

  re.push({
    id: activePlanet.id,
    name: activePlanet.name,
    image_url: activePlanet.image_url,
    rarity: activePlanet.rarity,
    color: colorMapping[activePlanet.rarity],
    position: `${activePlanet.galaxy}:${activePlanet.solar_system}:${activePlanet.position}`,
    active: true,
    planet: activePlanet,
    type: activePlanet.type,
  });

  const planets = $store.getters.planets.filter(
    (p) => p.id != activePlanet.id && p.claimed
  );

  for (let pId in planets) {
    const planet = planets[pId];
    re.push({
      id: planet.id,
      image_url: planet.image_url,
      rarity: planet.rarity,
      color: colorMapping[planet.rarity],
      name: planet.name,
      position: `${planet.galaxy}:${planet.solar_system}:${planet.position}`,
      active: false,
      planet: planet,
      type: planet.type,
    });
  }

  return re;
});

function getItemsPerPage() {
  if ($q.screen.lt.sm) {
    return 4;
  }
  if ($q.screen.lt.md) {
    return 4;
  }
  return 4;
}

const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage(),
});

watch(
  () => $q.screen.name,
  () => {
    pagination.value.rowsPerPage = getItemsPerPage();
  }
);

function changeActivatePlanet(planet) {
  $store.commit("setActivePlanet", planet);
  $eventBus.emit(ACTIVE_PLANET_CHANGED, planet);
  pagination.value.page = 1;
}

const slide = ref("style");
const filter = ref("");

let columns = [
  { name: "name", label: "Name", field: "name" },
  { name: "position", label: "Position", field: "position" },
];

const cardContainerClass = computed(() => {
  return $q.screen.gt.xs
    ? "grid-masonry grid-masonry--" + ($q.screen.gt.sm ? "3" : "2")
    : null;
});

const planetMark = async (data) => {
  if (data.planet.is_favourite) {
    await ApiRequests.planetUnmark(data.id);
  } else {
    await ApiRequests.planetMark(data.id);
  }

  $store.commit("markPlanet", data);
};

const rowsPerPageOptions = computed(() => {
  return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
});

const pagesNumber = computed(() =>
  Math.ceil(rows.value.length / pagination.value.rowsPerPage)
);

const myTweak = (offset) => {
  // "offset" is a Number (pixels) that refers to the total
  // height of header + footer that occupies on screen,
  // based on the QLayout "view" prop configuration

  // this is actually what the default style-fn does in Quasar
  return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
};

async function isPlanetMinted(planetGuid) {
  return false;
  const re = await SpaceRidersNFT.getPlanetById(planetGuid);
  console.log(re);
  return re[2];
}

async function mintPlanet(planetGuid) {
  console.log("ASD")
  console.log(mintSelectedPlanet)
  const notif = $q.notify(
    $notification("progress", "Waiting for transaction to complete...")
  );

  try {
    const planetCostData = await ApiRequests.fetchPlanetCostData(planetGuid);
    const sD = new SignatureData(
      planetCostData.v,
      planetCostData.r,
      planetCostData.s
    );

    const tx = await SpaceRidersGameContract.buyPlanet(
      planetCostData.planet_id,
      planetCostData.price,
      sD,
      planetCostData.token_uri
    );


    await tx.wait();

    notif($notification("success", "Planet minted successfully!"));
  } catch (e) {
    notif($notification("failed", e));

    console.log("error");
    console.log(e);
  }
}
</script>

<style lang="scss">
.q-table__bottom-item {
  display: none;
}

.q-table__bottom {
  display: inline;
  padding-left: 30px;
}

.active-planet {
  border-left: 2px solid $warning;
}
</style>

<style lang="sass">
.grid-masonry
  flex-direction: column
  // height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1
      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3
    > div
      &:nth-child(3n + 1)
        order: 1
      &:nth-child(3n + 2)
        order: 2
      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>
