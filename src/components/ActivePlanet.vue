<template>
  <q-tabs indicator-color="transparent">
    <q-btn-dropdown
      auto-close
      stretch
      flat
      dropdown-icon="far fa-caret-square-down"
    >
      <template v-slot:label>
        <div>
          <div class="row justify-around items-center no-wrap">
            <q-icon name="fas fa-user-astronaut" />
          </div>
          <div class="row items-center no-wrap">Active Planet</div>
        </div>
      </template>

      <q-list>
        <q-item v-for="p in planets" :key="p.id" clickable>
          <q-item-section align="left" @click="changeActivePlanet(p)">{{
            p.name
          }}</q-item-section>
          <q-icon
            v-if="isActivePlanet(p)"
            color="positive"
            style="margin-top: 10px"
            name="fas fa-circle"
          />
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-tabs>
</template>

<script>
import { ACTIVE_PLANET_CHANGED } from "../constants/Events";
import { useGtag } from "vue-gtag-next";
const { event } = useGtag();

export default {
  name: "ActivePlanet",

  async created() {},

  methods: {
    changeActivePlanet: async function (p) {
      this.$store.commit("setActivePlanet", p);
      this.$eventBus.emit(ACTIVE_PLANET_CHANGED, p);
      if (process.env.ENV !== "local") {
        event(ACTIVE_PLANET_CHANGED, {
          event_category: "planet",
          event_label: "active planet changed",
        });
      }
    },
    isActivePlanet: function (p) {
      const currentActivePlanet = this.$store.getters.activePlanet;
      if (currentActivePlanet !== false) {
        return p.id === currentActivePlanet.id;
      }
      return false;
    },
  },
  computed: {
    planets: function () {
      return this.$store.getters.planets.filter((p) => p.claimed);
    },
  },
};
</script>
