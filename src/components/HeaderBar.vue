<template>
  <q-header bordered class="bg-grey-10 text-white" height-hint="98">
    <q-tabs align="left" indicator-color="blue" style="">
      <q-toolbar-title shrink style="margin-left: 20px">
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        Cryptoverse
      </q-toolbar-title>

      
      <q-route-tab to="/planet" label="Planets" icon="fas fa-globe-europe" />
      <q-route-tab
        indicator-color="orange"
        to="/"
        label="General Vision"
        icon="fas fa-home"
      />
      <q-route-tab to="" label="Infraestructure" icon="fas fa-industry" />
      <q-route-tab to="" label="Research" icon="fas fa-university" />
      <q-route-tab label="Defense" icon="fas fa-shield-alt" />

      <q-space />

      <activePlanet />
      <user />
      
    </q-tabs>
  </q-header>
</template>

<script>
import User from "./User.vue";
import ActivePlanet from "./ActivePlanet.vue";

export default {
  name: "HeaderBar",
  components: {
    User,
    ActivePlanet
  },
  setup() {
    return {};
  },
  methods: {
    al: function () {
      alert("asd");
    },
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
