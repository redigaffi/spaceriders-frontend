<template>
  <q-layout view="lHh Lpr lFf">
    <headerbar />
    <q-page-container id="main">
      <RessourcesDisplay />
      <q-page class="container">
        <div class="row">
          <!-- Router page Content -->
          <div class="col q-py-lg">
            <router-view />
          </div>

          <PlanetList />
        </div>

        <div class="row q-col-gutter-md">
          <BuildingQueue :data="buildingQueueData" class="col-xs-12 col-sm-6 col-md-4">Buildings</BuildingQueue>
          <BuildingQueue :data="researchQueueData" class="col-xs-12 col-sm-6 col-md-4">Research</BuildingQueue>
          <!--<BuildingQueue class="col-xs-12 col-sm-6 col-md-4">Spaceships/ Defense</BuildingQueue> -->
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import Headerbar from "../components/HeaderBar.vue";
import RessourcesDisplay from "../components/RessourcesDisplay.vue";
import BuildingQueue from "../components/BuildingQueue.vue";
import PlanetList from "../components/PlanetList.vue";

//https://quasar.dev/layout/routing-with-layouts-and-pages
export default defineComponent({
  name: "MainLayout",

  components: {
    Headerbar,
    RessourcesDisplay,
    BuildingQueue,
    PlanetList,
  },

  setup() {
    const $store  = useStore();

    let buildingQueueData = computed(() => {
      return {
        ...$store.getters.resourceData,
        ...$store.getters.installationData
      };
    });

    let researchQueueData = computed(() => {
      return $store.getters.researchData;
    });

    return {
      buildingQueueData: buildingQueueData,
      researchQueueData: researchQueueData
    }
  },
  methods: {},
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
</style>
