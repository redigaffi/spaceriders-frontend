<template>
  <q-layout view="lHh Lpr lFf">
    <headerbar />

    <q-page-container id="main">
      <q-page class="container">
        <div class="q-py-xl">
          <router-view />
        </div>
      </q-page>
      
    </q-page-container>

  </q-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import Headerbar from "../components/HeaderBar.vue";

//https://quasar.dev/layout/routing-with-layouts-and-pages
export default defineComponent({
  name: "MainLayout",

  components: {
    Headerbar,
  },

  setup() {},
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
