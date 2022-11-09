<template>
  <q-layout view="lHh Lpr lFf">
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

      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

<style scoped></style>
