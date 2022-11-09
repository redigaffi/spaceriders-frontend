<template>
  <q-layout view="lHh Lpr lFf">
    <headerbar />
    <q-page-container id="main">
      <Particles
        id="particles-js"
        class="particles-bg"
        :options="{
          fpsLimit: 60,
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: false,
                mode: 'repulse',
              },
              resize: true,
            },
          },
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            color: {
              value: '#ffffff',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
              image: {
                src: '',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 1,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 20,
                size_min: 0,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 3,
              direction: 'bottom',
              random: false,
              straight: true,
              out_mode: 'out',
              bounce: false,
            },
            array: [],
          },
          detectRetina: true,
        }"
      />

      <q-page class="container">
        <div class="row">
          <!-- Router page Content -->
          <div class="col q-py-lg">
            <q-card class="glass-element text-white q-pa-md">
              <q-card-section class="row fit justify-between items-center">
                <div></div>
                <div
                  class="text-h6 text-center text-weight-bold text-secondary absolute-center"
                >
                  Connect with metamask
                </div>
              </q-card-section>
              <q-card-section class="text-center">
                <div>
                  <img
                    src="~assets/img/no-planet.webp"
                    alt=""
                    srcset=""
                    style="height: 230px"
                  />
                </div>
              </q-card-section>

              <q-card-section
                class="q-pb-none text-secondary text-subtitle1 text-weight-bolder text-center"
              >
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import Headerbar from "../components/HeaderBar.vue";
</script>

<style>
/*
https://codepen.io/mattmarble/pen/qBdamQz
*/
:root {
  font-size: 14px;
}
#main {
  height: 100%;
  background: radial-gradient(ellipse at bottom, #0b131d 0%, #000000 100%);
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-size: 14px;
  /* font-family: 'Orbitron', sans-serif; */
  font-family: bodyFont;
}

.unread_msg {
  border-left: 4px solid #2253f4;
}
</style>
