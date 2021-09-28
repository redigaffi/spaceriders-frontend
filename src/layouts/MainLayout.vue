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

          <PlanetList />
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
import PlanetList from "../components/PlanetList.vue";

import { useQuasar } from "quasar";
import { computed, watch } from "vue";



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
    
  },
  methods: {
    
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


</style>

<style lang="sass">

</style>
