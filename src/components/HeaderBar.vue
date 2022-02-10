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

      <button
        class="q-mr-md button main__button3 popup__open"
        @click="openPopup = true"
      >
        Buy $SPR
      </button>

      <q-dialog v-model="openPopup" persistent>
        <q-card style="width: 600px; max-width: 80vw; background: #0e101c">
          <q-card-section class="row justify-between">
            <div class="text-h4" style="letter-spacing: 3px">Swap</div>
            <div>
              <q-btn
                dense
                color="primary"
                round
                icon="close"
                @click="openPopup = false"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-1 flex flex-center">
                <q-icon name="print" size="30px" />
              </div>
              <div class="col-3 text-overline" style="font-size: 12px">
                <div>Swap From:</div>
                <div>
                  <q-select v-model="model" :options="options" dense />
                </div>
              </div>
              <div class="col flex flex-center">
                <q-input
                  dense
                  outlined
                  color="white"
                  class="full-width"
                  v-model="text"
                  placeholder="0.0"
                  type="number"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-sm">
              <div class="col-1 flex flex-center">
                <img
                  src="~assets/landing/img/Planet-GasGiant-Violet-transparent.png"
                  style="height: 50px"
                />
              </div>
              <div class="col-3 text-overline" style="font-size: 12px">
                <div>Swap To:</div>
                <div class="text-h4 text-weight-bold">$SPR</div>
              </div>
              <div class="col flex flex-center">
                <q-input
                  dense
                  outlined
                  class="full-width"
                  color="white"
                  v-model="text"
                  placeholder="0.0"
                  type="number"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions>
            <!-- <q-btn
            class="full-width"
            style="background: #18121e"
            label="Connect to a wallet"
            no-caps
            v-close-popup
          /> -->

            <button
              class="button bg-dark q-py-sm full-width"
              style="
                border: 2px solid #2253f4;
                border-radius: 5px;
                font-size: 14px;
                box-shadow: 0 0 20px rgb(34 83 244 / 76%);
                color: #fff;
              "
            >
              Connect to a Wallet
            </button>
          </q-card-actions>
        </q-card>
      </q-dialog>

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

<script>
import User from "./User.vue";
import { defineComponent, ref } from "vue";
import NavLinks from "components/NavLinks.vue";

const linksList = [
  {
    title: "Overview",
    link: "/overview",
    icon: "info",
  },
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
      openPopup: ref(false),
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
