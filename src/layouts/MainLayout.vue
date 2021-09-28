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

          <div class="col-2 gt-sm q-my-lg glass-element text-secondary q-ma-sm">
            <q-card>
              <q-card-section class="q-pa-xs text-center">
                <div class="text-overline text-weight-bold">My Planets</div>
              </q-card-section>
            </q-card>
            <q-carousel
              v-model="slide"
              vertical
              transition-prev="slide-down"
              transition-next="slide-up"
              swipeable
              animated
              control-color="warning"
              navigation-icon="radio_button_unchecked"
              arrows
              height="760px"
              class="bg-transparent"
            >
              <q-carousel-slide
                name="slide1"
                class="column no-wrap flex-center q-py-xl"
              >
                <q-tabs switch-indicator class="text-warning" vertical>
                  <q-route-tab to="/" v-for="x in 2" :key="x">
                    <div>
                      <img
                        src="~assets/img/mercury-transparent.png"
                        style="height: 100px; width: 100px"
                      />
                    </div>
                    <q-card-section class="q-pt-none" style="line-height: 1">
                      <span> Planet Name1 </span>
                      <br />
                      <span style="font-size: 12px">[1:400:50]</span>
                    </q-card-section>
                  </q-route-tab>
                </q-tabs>
              </q-carousel-slide>

              <q-carousel-slide
                name="slide2"
                class="column no-wrap flex-center q-py-xl"
              >
                <q-tabs switch-indicator class="text-warning" vertical>
                  <q-route-tab to="/" v-for="x in 4" :key="x">
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
                </q-tabs>
              </q-carousel-slide>
            </q-carousel>
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

//https://quasar.dev/layout/routing-with-layouts-and-pages
export default defineComponent({
  name: "MainLayout",

  components: {
    Headerbar,
    RessourcesDisplay,
    BuildingQueue,
  },

  setup() {
    return {
      slide: ref("slide1"),
    };
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
