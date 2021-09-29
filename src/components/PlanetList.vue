<template>
  <div class="col-2 gt-sm q-my-lg glass-element text-secondary q-ma-sm">
    <!-- style="max-height: 750px" -->
    <q-card>
      <q-card-section class="q-pa-xs text-center">
        <div class="text-overline text-weight-bold">My Planets</div>
      </q-card-section>
    </q-card>
    <q-table
      grid
      :card-container-class="cardContainerClass"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      v-model:pagination="pagination"
      rows-per-page-label=" "
      hide-bottom
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
                  src="~assets/img/mercury-transparent.png"
                  style="height: 100px; width: 100px"
                />
              </div>

              <q-card-section class="q-pt-none" style="line-height: 1">
                <span> {{ props.row.name }} </span>
                <br />
                <span style="font-size: 12px">{{ props.row.position }}</span>
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
  </div>
</template>

<script>
import { defineComponent, computed, watch, ref, getCurrentInstance } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

import { ACTIVE_PLANET_CHANGED } from "../constants/Events";


//https://quasar.dev/layout/routing-with-layouts-and-pages
export default defineComponent({
  name: "PlanetList",

  setup() {
    const $q = useQuasar();
    const $eventBus =
      getCurrentInstance().appContext.config.globalProperties.$eventBus;

    const $store = useStore();

    let rows = computed(() => {
      const activePlanet = $store.getters.activePlanet;
      
      let re = [];

      re.push({
        id: activePlanet.id,
        name: activePlanet.name,
        position: `${activePlanet.position}:${activePlanet.solar_system}:${activePlanet.galaxy}`,
        active: true,
        planet: activePlanet,
      });
  
      const planets = $store.getters.planets.filter((p) => p.id != activePlanet.id && p.claimed);
      
      for (let pId in planets) {
        const planet = planets[pId];
        re.push({
          id: planet.id,
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

    return {
      slide: ref("style"),
      rows,
      filter: ref(""),
      pagination,

      columns: [
        { name: "name", label: "Name", field: "name" },
        { name: "position", label: "Position", field: "position" },
      ],

      cardContainerClass: computed(() => {
        return $q.screen.gt.xs
          ? "grid-masonry grid-masonry--" + ($q.screen.gt.sm ? "3" : "2")
          : null;
      }),

      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
      }),

      changeActivatePlanet,

      pagesNumber: computed(() =>
        Math.ceil(rows.value.length / pagination.value.rowsPerPage)
      ),
    };
  },
  methods: {
    myTweak(offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh" };
    },
  },
});
</script>

<style>

.q-table__bottom-item {
  display: none;
}

.q-table__bottom {
  display: inline;
  padding-left: 30px;
}

.active-planet {
  border-left: 2px solid #f2c037;
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
