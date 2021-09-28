<template>
  <q-card class="glass-element text-white q-pa-md">
    <q-card-section class="row fit justify-between items-center">
      <div></div>
      <div
        class="
          text-h6 text-center text-weight-bold text-secondary
          absolute-center
        "
      >
        My Planets
      </div>

      <div>
        <BuyPlanet />
      </div>
    </q-card-section>

    <div v-if="anyUnClaimedPlanet">
      <q-card-section
        class="q-pb-none text-secondary text-subtitle1 text-weight-bolder"
      >
        In queue
      </q-card-section>

      <ClaimPlanetList
        ref="claimPlanetList"
        :planets="this.unClaimedNotReadyPlanets"
      />

      <q-card-section
        class="q-pb-none text-secondary text-subtitle1 text-weight-bolder"
      >
        Ready to Claim
      </q-card-section>

      <ClaimPlanetList
        ref="claimPlanetList"
        :planets="this.unClaimedReadyPlanets"
        claimeable
      />
    </div>

    <div v-if="!anyUnClaimedPlanet">
      <q-card-section class="text-center">
        <div>
          <img
            src="~assets/img/searching.svg"
            alt=""
            srcset=""
            style="height: 230px"
          />
        </div>
      </q-card-section>

      <q-card-section
        class="
          q-pb-none
          text-secondary text-subtitle1 text-weight-bolder text-center
        "
      >
        No purchased planets
      </q-card-section>
      <q-card-section
        class="
          q-pb-none
          text-secondary text-subtitle1 text-weight-bolder text-center
        "
      >
        <BuyPlanet />
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import ClaimPlanetList from "../components/ClaimPlanetList.vue";
import BuyPlanet from "../components/BuyPlanet.vue";
import { NEW_PLANET_PURCHASED } from "../constants/Events";

export default defineComponent({
  name: "PageIndex",
  components: {
    ClaimPlanetList,
    BuyPlanet,
  },
  setup() {},

  data: function () {
    return {
      claimRefreshId: -1,
    };
  },
  methods: {
    startInterval: function () {
      this.claimRefreshId = setInterval(() => {
        console.log("refresh planets")
        this.$store.commit("refreshPlanets");
        if (this.unClaimedNotReadyPlanets.length === 0)
          clearInterval(this.claimRefreshId);
      }, 1000);
    },
  },
  async created() {
    this.$eventBus.on(NEW_PLANET_PURCHASED, (e) => {
      this.startInterval();
    });

    if (this.unClaimedNotReadyPlanets.length > 0) this.startInterval();
  },

  computed: {
    unClaimedNotReadyPlanets: function () {
      return this.$store.getters.planets.filter((obj) => {
        const now = new Date();
        const claimDate = new Date(obj.claimable * 1000);
        const diff = claimDate.getTime() - now.getTime();
        return !obj.claimed && diff >= 0;
      });
    },

    unClaimedReadyPlanets: function () {
      return this.$store.getters.planets.filter((obj) => {
        const now = new Date();
        const claimDate = new Date(obj.claimable * 1000);
        const diff = claimDate.getTime() - now.getTime();
        return !obj.claimed && diff <= 0;
      });
    },

    anyUnClaimedPlanet() {
      return (
        this.$store.getters.planets.filter((obj) => {
          return !obj.claimed;
        }).length > 0
      );
    },
  },
});
</script>
