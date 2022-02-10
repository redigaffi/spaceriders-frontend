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
        Claimable
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
            src="~assets/img/no-planet.png"
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
        No planets in queue
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
   <q-dialog v-model="planetCongratulationsPopup" persistent>
    <q-card style="width: 410px; max-width: 80vw; border-radius: 20px">
      <q-card-section class="q-pa-xs text-center">
        <span class="q-ml-sm text-overline" style="font-size: 14px">CONGRATULATIONS</span>
      </q-card-section>
      <q-card-section class="q-pa-none row items-center">
        <div class="col">
          <q-img :src="`https://spaceriders-planets.s3.us-east-2.amazonaws.com/${this.newPlanetInfo.image}-${this.newPlanetInfo.rarity}.png`">
            <div class="absolute-full text-subtitle2 flex flex-center">
              <q-card-section>
                <div class="text-center q-pb-md">New Planet has been claimed</div>
                <div style="width: 400px">
                  <div class="text-secondary tag-glass-element">
                    <q-list dense class="text-left">
                      <q-item>
                        <q-item-section class="text-subtitle2 text-weight-bold">Diameter :</q-item-section>
                        <q-item-section avatar>{{ this.newPlanetInfo.diameter }}</q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section class="text-subtitle2 text-weight-bold">Temperature :</q-item-section>
                        <q-item-section avatar>{{ this.newPlanetInfo.temperature }}</q-item-section>
                      </q-item>
                      
                      <q-item>
                        <q-item-section class="text-subtitle2 text-weight-bold">Position :</q-item-section>
                        <q-item-section avatar>{{ this.newPlanetInfo.position }}</q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section class="text-subtitle2 text-weight-bold">Metal Reserve :</q-item-section>
                        <q-item-section avatar>{{ this.newPlanetInfo.metalReserve }}</q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section class="text-subtitle2 text-weight-bold">Crystal Reserve :</q-item-section>
                        <q-item-section avatar>{{ this.newPlanetInfo.crystalReserve }}</q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section class="text-subtitle2 text-weight-bold">Petrol Reserve :</q-item-section>
                        <q-item-section avatar>{{ this.newPlanetInfo.petrolReserve }}</q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section class="text-subtitle2 text-weight-bold">Rarity :</q-item-section>
                        <q-item-section avatar>
                          <q-badge :color="this.newPlanetInfo.rarityColor">
                            {{ this.newPlanetInfo.rarity.toUpperCase() }}
                          </q-badge>  
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
                <div class="text-center q-mr-sm q-pt-md">
                  <q-btn flat label="Close" color="secondary" v-close-popup />
                </div>
              </q-card-section>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import ClaimPlanetList from "../components/ClaimPlanetList.vue";
import BuyPlanet from "../components/BuyPlanet.vue";
import { NEW_PLANET_PURCHASED, PLANET_CLAIMED } from "../constants/Events";
import tc from "thousands-counter";

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
      planetCongratulationsPopup: false,
      newPlanetStats: false,
    };
  },
  watch: {
    planetCongratulationsPopup: function () {
      if(!this.planetCongratulationsPopup) {
        this.newPlanetStats = false;
      }
    }
  },
  methods: {
    startInterval: function () {
      this.claimRefreshId = setInterval(() => {
        this.$store.commit("refreshPlanets");
        if (this.unClaimedNotReadyPlanets.length === 0)
          clearInterval(this.claimRefreshId);
      }, 1000);

      this.$store.commit("addIntervalId", {id: this.claimRefreshId})
    },
  },
  async created() {
    this.$eventBus.on(NEW_PLANET_PURCHASED, (e) => {
      this.startInterval();
    });

    this.$eventBus.on(PLANET_CLAIMED, (e) => {
      this.newPlanetStats = e.planet;
      this.planetCongratulationsPopup = true;
    });

    if (this.unClaimedNotReadyPlanets.length > 0) this.startInterval();
  },

  computed: {
    newPlanetInfo: function () {
      if (!this.planetCongratulationsPopup) return {};
      let obj = {};

      const position = this.newPlanetStats.position;
      const solarSystem = this.newPlanetStats.solar_system;
      const galaxy = this.newPlanetStats.galaxy;

      obj.position = `${position}:${solarSystem}:${galaxy}`;
      obj.diameter = tc(this.newPlanetStats.diameter, { digits: 2 });

      obj.metalReserve = tc(this.newPlanetStats.reserves.total_metal, { digits: 2 });
      obj.crystalReserve = tc(this.newPlanetStats.reserves.total_crystal, { digits: 2 });
      obj.petrolReserve = tc(this.newPlanetStats.reserves.total_petrol, { digits: 2 });
      obj.rarity = this.newPlanetStats.rarity;

      const colorMapping = {
        common: "blue-grey-6",
        epic: "info",
        legendary: "purple-9"
      };
      
      obj.rarityColor = colorMapping[obj.rarity];

      const minTemperature = this.newPlanetStats.min_temperature;
      const maxTemperature = this.newPlanetStats.max_temperature;

      obj.temperature = "";
      obj.temperature += `${minTemperature}°C to `;
      if (maxTemperature > 0) {
        obj.temperature += `+`;
      }
      
      obj.temperature += `${maxTemperature}°C`;
      obj.image = this.newPlanetStats.image;

      return obj;
    },
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
