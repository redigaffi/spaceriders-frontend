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
      <div class="footer__title_logo">
        <span class="blue">Space</span>riders
      </div>
      <q-space />
      <q-tabs
        active-color="warning"
        inline-label
        dense
        class="text-secondary absolute-center gt-sm header-tabs"
      >
        <q-route-tab
          v-for="nav in essentialLinks"
          :key="nav"
          class="q-py-sm showIconOnly"
          :icon="nav.icon"
          :label="nav.title"
          :to="nav.link"
          no-caps
          exact
          exact-active-class="showNameWithIcon"
        >
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            {{ nav.title }}
          </q-tooltip>
        </q-route-tab>
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
    icon: "fas fa-globe-europe",
  },
  {
    title: "Resources",
    link: "/resources",
    icon: "widgets",
  },
  {
    title: "Installations",
    link: "/installations",
    icon: "construction",
  },
  {
    title: "Research",
    link: "/research",
    icon: "travel_explore",
  },
  {
    title: "Defense",
    link: "/defense",
    icon: "security",
  },
  {
    title: "Convert",
    link: "/convert",
    icon: "sync_alt",
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

.footer__title_logo {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  text-align: left;
  padding-top: 0.3rem;
  position: relative;
}

.footer__title_logo:before {
  content: "";
  display: block;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background: #fff;
}

.footer__title_logo:after {
  content: "";
  display: block;
  width: 50%;
  height: 4px;
  background: #2253f4;
  position: absolute;
  top: 0;
  left: 0;
}

.header-tabs {
  .q-tab__label {
    font-size: 1.4em;
  }

  .q-tab__icon {
    font-size: 2.4em;
  }
}

.blue {
  color: #2253f4;
}

.showIconOnly {
  width: 90px;
  .q-tab__label {
    display: none;
  }
}

.showNameWithIcon {
  padding-right: 20px;
  width: 100%;
  .q-tab__label {
    display: inline;
  }
}
</style>
