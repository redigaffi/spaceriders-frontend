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
            <q-carousel
              v-model="slide"
              vertical
              transition-prev="slide-down"
              transition-next="slide-up"
              swipeable
              animated
              control-color="white"
              navigation-icon="radio_button_unchecked"
              arrows
              height="800px"
              class="bg-transparent"
            >
              <q-carousel-slide
                name="style"
                class="column no-wrap flex-center q-py-xl"
              >
                <q-tabs switch-indicator class="text-secondary" vertical>
                  <q-route-tab to="/" v-for="x in 4" :key="x">
                    <div>
                      <img
                        src="~assets/img/mercury-transparent.png"
                        style="height: 100px; width: 100px"
                      />
                    </div>
                    <q-card-section class="q-pt-none">
                      <div class="text-subtitle2">Planet Name</div>
                      <div class="text-body2">[1:400:50]</div>
                    </q-card-section>
                  </q-route-tab>
                </q-tabs>
              </q-carousel-slide>
              <q-carousel-slide
                name="stem"
                class="column no-wrap flex-center q-py-xl"
              >
                <q-tabs switch-indicator class="text-secondary" vertical>
                  <q-route-tab to="/" v-for="x in 4" :key="x">
                    <div>
                      <img
                        src="~assets/img/mercury-transparent.png"
                        style="height: 100px; width: 100px"
                      />
                    </div>
                    <q-card-section class="q-pt-none">
                      <div class="text-subtitle2">Planet Name</div>
                      <div class="text-body2">[1:400:50]</div>
                    </q-card-section>
                  </q-route-tab>
                </q-tabs>
              </q-carousel-slide>
              <q-carousel-slide
                name="stem2"
                class="column no-wrap flex-center q-py-xl"
              >
                <q-tabs switch-indicator class="text-secondary" vertical>
                  <q-route-tab to="/" v-for="x in 4" :key="x">
                    <div>
                      <img
                        src="~assets/img/mercury-transparent.png"
                        style="height: 100px; width: 100px"
                      />
                    </div>
                    <q-card-section class="q-pt-none">
                      <div class="text-subtitle2">Planet Name</div>
                      <div class="text-body2">[1:400:50]</div>
                    </q-card-section>
                  </q-route-tab>
                </q-tabs>
              </q-carousel-slide>
            </q-carousel>
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
    return {
      slide: ref("style"),
    };
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
