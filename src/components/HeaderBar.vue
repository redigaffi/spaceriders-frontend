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
        <span class="blue">SPACE</span>RIDERS
      </div>

      <button
        v-if="$store.getters.loggedIn"
        class="q-ml-md button q-pa-md q-mr-xs"
        style="
          border: 3px solid #2253f4;
          border-radius: 5px;
          box-shadow: 0 0 20px rgb(34 83 244 / 76%);
          color: #fff;
          font-size: 12px;
          padding: 7px 15px;
        "
      >
        <q-icon name="menu" />
        MENU
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item
              v-for="nav in essentialLinks"
              :key="nav"
              :to="nav.link"
              exact
              exact-active-class="text-positive"
            >
              <q-item-section top avatar>
                <q-avatar color="warning" text-color="white" :icon="nav.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ nav.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </button>

      <!-- <button
        class="button q-pa-md q-mr-xs"
        style="
          border: 3px solid #2253f4;
          border-radius: 5px;
          box-shadow: 0 0 20px rgb(34 83 244 / 76%);
          color: #fff;
          font-size: 12px;
          padding: 7px 15px;
        "
      >
        GAME MANUAL
      </button> -->
      <q-space />

      <WithdrawResources v-if="hasActivePlanet">
        <button
          class="button q-pa-md q-mr-xs"
          style="
            border: 3px solid #2253f4;
            border-radius: 5px;
            box-shadow: 0 0 20px rgb(34 83 244 / 76%);
            color: #fff;
            font-size: 12px;
            padding: 7px 15px;
          "
        >
          CONVERT
        </button>
      </WithdrawResources>

      <Swap v-if="$store.getters.loggedIn">
        <button
          class="button q-pa-md q-mr-xs"
          style="
            border: 3px solid #2253f4;
            border-radius: 5px;
            box-shadow: 0 0 20px rgb(34 83 244 / 76%);
            color: #fff;
            font-size: 12px;
            padding: 7px 15px;
          "
        >
          SWAP
        </button>
      </Swap>

      <Balance />
      <User />
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

<script setup>
import User from "./User.vue";
import Balance from "./Balance.vue";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import NavLinks from "components/NavLinks.vue";
import Swap from "components/Swap.vue";
import WithdrawResources from "components/WithdrawResources.vue";
import routes from "../router/routes.js";

const linksListInfo = {
  overview: {
    title: "Overview",
    link: "/overview",
    icon: "info",
  },
  planet: {
    title: "Planets",
    link: "/planet",
    icon: "fas fa-globe-europe",
  },
  resources: {
    title: "Resources",
    link: "/resources",
    icon: "widgets",
  },
  installations: {
    title: "Installations",
    link: "/installations",
    icon: "construction",
  },
  research: {
    title: "Research",
    link: "/research",
    icon: "travel_explore",
  },
  defense: {
    title: "Defense",
    link: "/defense",
    icon: "security",
  },
  gm: {
    title: "Game Manual",
    link: "/",
    icon: "auto_stories",
  },
};

const $store = useStore();

let linksList = computed(() => {
  let loggedIn = $store.getters.loggedIn;
  let hasPlanets = $store.getters.activePlanet;

  let tmplinksList = [];

  for (const routeIdx in routes) {
    const routeData = routes[routeIdx];

    if (routeData.name === "overview") {
      const requieresAuth = routeData.meta.requiresAuth;
      const requiresPlanet = routeData.meta.requiresPlanet;
      const notAdd =  (!loggedIn && requieresAuth) || (requiresPlanet && loggedIn && !hasPlanets);
      if (!notAdd) {
        tmplinksList.push(linksListInfo[routeData.name]);
      }

      for (const childIdx in routeData.children) {
        const childInfo = routeData.children[childIdx];
        if (childInfo.path === '') continue;
        
        const childRequieresAuth = childInfo.meta.requiresAuth;
        const childRequiresPlanet = childInfo.meta.requiresPlanet;

        const notAdd =  (!loggedIn && childRequieresAuth) || (childRequiresPlanet && loggedIn && !hasPlanets);
        if (!notAdd && childInfo.meta.menu) {
          tmplinksList.push(linksListInfo[childInfo.name]);
        }
      }

      tmplinksList.push(linksListInfo.gm);
      break;
    }
  }

  return tmplinksList;
});



const leftDrawerOpen = ref(false);
const essentialLinks = linksList;

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const hasActivePlanet = computed (() => {
  return $store.getters.activePlanet !== false;
});



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
  font-family: headingFont;
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
    font-size: 1em;
  }

  .q-tab__icon {
    font-size: 1.6em;
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

.button {
  outline: none;
  background: none;
  cursor: pointer;
  border: none;
}

.main__button2,
.main__button3,
.ico__button {
  margin-top: 0rem;
  font-size: 14px;
  font-weight: 900;
  padding: 0.5rem 2rem;
  color: #fff;
  background: #2253f4;
  box-shadow: 0 0 20px rgba(34, 83, 244, 0.76);
  border-radius: 5px;
}

.main__button2:hover,
.ico__button:hover,
.road__button:hover {
  background: #2d3039;
  box-shadow: 0 0 20px #2d3039;
}

.main__button3:hover {
  background: #2253f4;
  box-shadow: 0 0 20px rgba(34, 83, 244, 0.76);
  color: #fff;
}

.main__button3 {
  background: #fff;
  color: #2253f4;
  box-shadow: none;
}
</style>
