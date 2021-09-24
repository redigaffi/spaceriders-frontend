<template>
  <q-header elevated class="bg-dark">
    <q-toolbar>
      <q-toolbar-title> Cryptoverse </q-toolbar-title>
      <q-space />
      <q-tabs inline-label dense class="text-secondary absolute-center">
        <q-route-tab
          class="q-py-sm"
          icon="fas fa-globe-europe"
          label="Planets"
          to="/planet"
          no-caps
          exact
        />
        <q-route-tab
          class="q-py-sm"
          name="general"
          icon="remove_red_eye"
          label="General Vision"
          to="/"
          no-caps
        />
        <q-route-tab
          name="infrastructure"
          icon="construction"
          label="Infrastructure"
          to="/"
          no-caps
        />
        <q-route-tab
          name="research"
          icon="travel_explore"
          label="Research"
          to="/"
          no-caps
        />
        <q-route-tab
          name="defense"
          icon="security"
          label="Defense"
          no-caps
          to="/"
        />
      </q-tabs>

      <user />
    </q-toolbar>
  </q-header>
</template>

<script>
import User from "./User.vue";

export default {
  name: "HeaderBar",
  components: {
    User,
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
