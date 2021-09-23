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
import ApiRequest from "../service/http/ApiRequests";
import { PLANET_CLAIMED, ACTIVE_PLANET_CHANGED } from "../constants/Events";

export default {
  name: "ActivePlanet",
  data: function () {
    return {
      planets: [],
    };
  },
  
  async created() {
    await this.fetchPlanets();

    this.$eventBus.on(PLANET_CLAIMED, (e) => {
      this.fetchPlanets();
    });
  },

  methods: {
    changeActivePlanet: async function (p) {
      //TODO: enable this condition
      //if (p.id === this.$store.getters.activePlanet.id) return;

      this.$store.commit("setActivePlanet", p);
      this.$eventBus.emit(ACTIVE_PLANET_CHANGED, p);
    },
    fetchPlanets: async function () {
      this.planets = (await ApiRequest.getPlanets()).data;
    },
    isActivePlanet: function (p) {
      const currentActivePlanet = this.$store.getters.activePlanet;
      return p.id === currentActivePlanet.id;
    },
  },
  computed: {},
};
</script>
