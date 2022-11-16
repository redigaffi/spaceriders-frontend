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
      <q-scroll-area style="height: 50vh">
        <div class="row q-col-gutter-sm">
          <template v-for="(row, index) in rows" :key="index">
            <div class="col-12 col-md-6">
              <q-card
                dark
                bordered
                flat
                :style="
                  row.active
                    ? `border: 1px solid ${getPaletteColor('info')}`
                    : ''
                "
              >
                <q-card-section horizontal>
                  <q-img
                    class="col-2"
                    :src="row.image_url"
                    style="
                      width: 100px;
                      height: 160px;
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
                      align="top"
                      color="primary"
                      class="text-caption"
                      style="padding: 5px"
                      rounded
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
                          <q-item-label>Position:</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                          <q-item-label>{{ row.position }}</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item>
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
                            :value="row.planet.experience / 100"
                            color="info"
                          >
                            <span
                              class="absolute-full flex flex-center text-white"
                              >{{ row.planet.experience }}/100</span
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
                    :icon="row.active ? 'check_box' : 'check_box_outline_blank'"
                    color="info"
                    :label="row.active ? 'Active' : 'Select'"
                    :disabled="row.active"
                    @click="changeActivatePlanet(row.planet)"
                  />
                  <q-btn
                    outline
                    icon="far fa-star"
                    color="amber"
                    label="Favourite"
                  />
                </q-card-actions>
              </q-card>
            </div>
          </template>
        </div>
      </q-scroll-area>
    </q-card-section>

    <!--
    <q-table
      grid
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      v-model:pagination="pagination"
    >
      <template v-slot:item="props">
        <div class="col-xs-12 text-center">
          <q-card class="bg-transparent">
            <q-btn
              flat
              color="white"
              text-color="warning"
              :class="[props.row.active == true ? 'active-planet' : '']"
              @click="changeActivatePlanet(props.row.planet)"
            >
              <div>
                <img
                  :src="props.row.image_url"
                  style="height: 95px; width: 100%"
                />
              </div>

              <q-card-section class="q-pt-none" style="line-height: 1">
                <div class>
                  <q-badge :color="props.row.color">{{
                    props.row.rarity
                  }}</q-badge>
                </div>
                <br />
                <div
                  style="
                    width: 120px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  "
                >
                  {{ props.row.name }}
                </div>
                <br />
                <span style="font-size: 12px">[{{ props.row.position }}]</span>
              </q-card-section>
            </q-btn>
          </q-card>
        </div>
      </template>
    </q-table>

    <div class="row justify-center q-my-md">
      <q-pagination
        v-model="pagination.page"
        color="info"
        :max="pagesNumber"
        size="sm"
      />
    </div>
    -->
  </q-card>
</template>

<script setup>
import { defineComponent, computed, watch, ref, getCurrentInstance } from "vue";
import { colors, getCssVar, useQuasar } from "quasar";
import { useStore } from "vuex";
import ResourcesDisplay from "components/ResourcesDisplay.vue";

import { ACTIVE_PLANET_CHANGED } from "../constants/Events";

//https://quasar.dev/layout/routing-with-layouts-and-pages

const $q = useQuasar();
const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const $store = useStore();
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
    position: `${activePlanet.position}:${activePlanet.solar_system}:${activePlanet.galaxy}`,
    active: true,
    planet: activePlanet,
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
      position: `${planet.position}:${planet.solar_system}:${planet.galaxy}`,
      active: false,
      planet: planet,
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
