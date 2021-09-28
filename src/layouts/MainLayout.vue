<template>
  <q-layout view="lHh Lpr lFf">
    <headerbar />
    <q-page-container id="main">
      <RessourcesDisplay />

      <q-page :style-fn="myTweak" class="container">
        <div class="row">
          <!-- Router page Content -->
          <div class="col q-py-lg">
            <router-view />
          </div>

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
              :rows-per-page-options="false"
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
                      @click="activatePlanet(props.row.id)"
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
                        <span style="font-size: 12px">{{
                          props.row.position
                        }}</span>
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
        </div>
        <BuildingQueue />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import Headerbar from "../components/HeaderBar.vue";
import RessourcesDisplay from "../components/RessourcesDisplay.vue";
import BuildingQueue from "../components/BuildingQueue.vue";

import { useQuasar } from "quasar";
import { computed, watch } from "vue";

const planetsName = ["Planet Name"];
const rows = ref([]);

rows.value.push({
  name: "Current Selected Planet",
  position: "[1:400:50]",
  active: true,
});
var count = 1;
planetsName.forEach((name) => {
  for (let i = 0; i < 10; i++) {
    rows.value.push({
      id: count,
      name: name,
      position: "[1:400:50]",
      active: false,
    });
    count = count + 1;
  }
});

//https://quasar.dev/layout/routing-with-layouts-and-pages
export default defineComponent({
  name: "MainLayout",

  components: {
    Headerbar,
    RessourcesDisplay,
    BuildingQueue,
  },

  setup() {
    const $q = useQuasar();
    function getItemsPerPage() {
      if ($q.screen.lt.sm) {
        return 4;
      }
      if ($q.screen.lt.md) {
        return 4;
      }
      return 4;
    }

    const filter = ref("");
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

    const addPlanetDialog = ref(false);
    const planetName = ref(null);

    function buyPlanet() {}

    function activatePlanet(id) {
      rows.value.forEach((element) => {
        if (element.id == id) {
          element.active = true;
        } else {
          element.active = false;
        }
      });
    }

    return {
      slide: ref("style"),
      addPlanetDialog,
      planetspurchased: true,
      planetName,
      buyPlanet: buyPlanet,
      rows,

      filter,
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
      activatePlanet,
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
#main {
  border: 1px solid black;
  /* background: url("../assets/img/background.svg") no-repeat center center fixed; */
  background: url("../assets/img/bg4.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

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
