<template>
  <q-layout view="lHh Lpr lFf">
    <headerbar />
    <q-page-container id="main">
      <RessourcesDisplay />

      <q-page class="container">
        <div class="row">
          <div class="col q-py-lg">
            <router-view />
          </div>
          <div class="col-2 gt-sm q-my-lg glass-element text-secondary q-ma-sm">
            <q-card>
              <q-card-section class="q-pa-xs text-center">
                <div class="text-overline text-weight-bold">My Planets</div>
              </q-card-section>
            </q-card>
            <q-tabs switch-indicator class="text-warning" vertical>
              <q-scroll-area class="full-height">
                <q-route-tab to="/" v-for="x in 10" :key="x">
                  <div>
                    <img
                      src="~assets/img/mercury-transparent.png"
                      style="height: 100px; width: 100px"
                    />
                  </div>
                  <q-card-section class="q-pt-none" style="line-height: 1">
                    <span> Planet Name </span>
                    <br />
                    <span style="font-size: 12px">[1:400:50]</span>
                  </q-card-section>
                </q-route-tab>
              </q-scroll-area>
            </q-tabs>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import Headerbar from "../components/HeaderBar.vue";
import RessourcesDisplay from "../components/RessourcesDisplay.vue";

//https://quasar.dev/layout/routing-with-layouts-and-pages
export default defineComponent({
  name: "MainLayout",

  components: {
    Headerbar,
    RessourcesDisplay,
  },

  setup() {
    return {};
  },
});
</script>

<style>
#main {
  border: 1px solid black;
  background: url("../assets/img/bg1.jpeg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
