<template>
  <q-header elevated class="bg-navbar q-py-xs">
    <q-toolbar>
      <q-btn
        class="lt-md"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
      <div class="footer__title"><span class="blue">Space</span>riders</div>

      <q-space />
      <q-tabs
        active-color="warning"
        inline-label
        dense
        class="text-secondary absolute-center gt-sm"
      >
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
          label="Resources"
          to="/resources"
          no-caps
        />
        <q-route-tab
          class="q-py-sm"
          name="installation"
          icon="remove_red_eye"
          label="Installations"
          to="/installations"
          no-caps
        />

        <q-route-tab
          name="research"
          icon="travel_explore"
          label="Research"
          to="/research"
          no-caps
        />
        <q-route-tab
          name="defense"
          icon="security"
          label="Defense"
          no-caps
          to="/defense"
        />
        <q-route-tab
          name="convert"
          icon="security"
          label="Convert"
          no-caps
          to="/convert"
        />
      </q-tabs>

      <user />
    </q-toolbar>
    <q-drawer v-model="leftDrawerOpen" bordered overlay>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <NavLinks
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
  </q-header>
</template>

<script>
import User from "./User.vue";
import { defineComponent, ref } from "vue";
import NavLinks from "components/NavLinks.vue";

const linksList = [
  {
    title: "Planets",
    link: "/planet",
  },
  {
    title: "General Vision",
    link: "/",
  },
  {
    title: "Infrastructure",
    link: "/infrastructure",
  },
  {
    title: "Research",
    link: "/research",
  },
  {
    title: "Defense",
    link: "/defense",
  },
];
export default {
  name: "HeaderBar",
  components: {
    User,
    NavLinks,
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
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
<style lang="scss">
.bg-navbar {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
  background: inherit;
  overflow: hidden;
}

.bg-navbar:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(0, 0, 0, 1);
}
</style>
