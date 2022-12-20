<template>
  <PlanetList />

  <q-card dark class="q-my-md">
    <q-item>
      <q-item-section class="text-center text-h6">
        <q-item-label>Buy planets</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section
      v-if="!anyUnClaimedPlanet"
      class="column items-center q-col-gutter-y-md"
    >
      <div class="col-12">
        <img
          src="~assets/img/no-planet.webp"
          style="max-height: 200px; width: 100%"
        />
      </div>

      <div class="col-12">No planets in queue</div>
    </q-card-section>

    <q-card-section
      v-if="anyUnClaimedPlanet"
      class="row items-center q-col-gutter-y-md"
    >
      <div
        class="col-12 text-center"
        v-if="this.unClaimedNotReadyPlanets.length"
      >
        In queue
      </div>

      <div
        class="col-12 row q-col-gutter-sm"
        v-if="this.unClaimedNotReadyPlanets.length"
      >
        <ClaimPlanetList
          ref="claimPlanetList"
          :planets="this.unClaimedNotReadyPlanets"
        />
      </div>

      <div class="col-12 text-center" v-if="this.unClaimedReadyPlanets.length">
        Claimable
      </div>

      <div
        class="col-12 row q-col-gutter-sm"
        v-if="this.unClaimedReadyPlanets.length"
      >
        <ClaimPlanetList
          ref="claimPlanetList"
          :planets="this.unClaimedReadyPlanets"
          claimeable
        />
      </div>
    </q-card-section>

    <q-card-actions align="center">
      <BuyPlanet />
    </q-card-actions>
  </q-card>

  <q-dialog v-model="planetCongratulationsPopup">
    <q-card class="full-width">
      <q-card-section class="row justify-between">
        <div class="text-h6">Congratulations!</div>
        <q-btn flat round size="sm" color="white" icon="close" v-close-popup />
      </q-card-section>

      <q-separator />

      <q-img
        :src="`https://spaceriders-planet-images.s3.eu-west-1.amazonaws.com/${this.newPlanetInfo.type}-${this.newPlanetInfo.rarity}-${this.newPlanetInfo.image}-${this.newPlanetInfo.image}-bg.webp`"
        style="height: 200px; width: 100%"
      />

      <q-card-section class="q-pa-md">
        <div
          class="text-center q-py-sm"
          :style="`border: 2px solid ${getColor(
            colorMapping[this.newPlanetInfo.rarity]
          )}; \
            border-radius: 5px; \
            box-shadow: 0 0 20px ${getColor(
              colorMapping[this.newPlanetInfo.rarity]
            )}; \
            color: #fff;`"
        >
          New planet has been claimed
        </div>
      </q-card-section>

      <q-card-section class="q-px-md">
        <q-list dense separator bordered class="rounded-borders">
          <q-item>
            <q-item-section>
              <q-item-label> Type: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label
                :class="`text-${colorMapping[this.newPlanetInfo.rarity]}`"
              >
                {{ this.newPlanetInfo.type }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Diameter: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label
                :class="`text-${colorMapping[this.newPlanetInfo.rarity]}`"
              >
                {{ this.newPlanetInfo.diameter }} km
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Temperature: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label
                :class="`text-${colorMapping[this.newPlanetInfo.rarity]}`"
              >
                {{ this.newPlanetInfo.temperature }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Position: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label
                :class="`text-${colorMapping[this.newPlanetInfo.rarity]}`"
              >
                {{ this.newPlanetInfo.position }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Metal reserve: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label
                :class="`text-${colorMapping[this.newPlanetInfo.rarity]}`"
              >
                {{ this.newPlanetInfo.metalReserve }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Crystal reserve: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label
                :class="`text-${colorMapping[this.newPlanetInfo.rarity]}`"
              >
                {{ this.newPlanetInfo.crystalReserve }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Petrol reserve: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label
                :class="`text-${colorMapping[this.newPlanetInfo.rarity]}`"
              >
                {{ this.newPlanetInfo.petrolReserve }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          class="epic-button no-border"
          size="lg"
          icon="fas fa-globe"
          :color="colorMapping[this.newPlanetInfo.rarity]"
          :label="this.newPlanetInfo.rarity"
          v-close-popup
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import ClaimPlanetList from "../components/ClaimPlanetList.vue";
import BuyPlanet from "../components/BuyPlanet.vue";
import PlanetList from "components/PlanetList.vue";
import { NEW_PLANET_PURCHASED, PLANET_CLAIMED } from "../constants/Events";
import tc from "thousands-counter";
import { colors } from "quasar";

const { getPaletteColor } = colors;

export default defineComponent({
  name: "PageIndex",
  components: {
    ClaimPlanetList,
    BuyPlanet,
    PlanetList,
  },

  data: function () {
    return {
      claimRefreshId: -1,
      planetCongratulationsPopup: false,
      newPlanetStats: false,
      colorMapping: {
        common: "blue-grey",
        uncommon: "green-10",
        rare: "blue-14",
        epic: "purple-9",
        legendary: "deep-orange",
      },
    };
  },
  watch: {
    planetCongratulationsPopup: function () {
      if (!this.planetCongratulationsPopup) {
        this.newPlanetStats = false;
      }
    },
  },
  methods: {
    getColor: getPaletteColor,
    startInterval: function () {
      this.claimRefreshId = setInterval(() => {
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

      obj.metalReserve = tc(this.newPlanetStats.reserves.total_metal, {
        digits: 2,
      });
      obj.crystalReserve = tc(this.newPlanetStats.reserves.total_crystal, {
        digits: 2,
      });
      obj.petrolReserve = tc(this.newPlanetStats.reserves.total_petrol, {
        digits: 2,
      });
      obj.rarity = this.newPlanetStats.rarity;

      obj.rarityColor = this.colorMapping[obj.rarity];

      const minTemperature = this.newPlanetStats.min_temperature;
      const maxTemperature = this.newPlanetStats.max_temperature;

      obj.temperature = "";
      obj.temperature += `${minTemperature}°C to `;
      if (maxTemperature > 0) {
        obj.temperature += `+`;
      }

      obj.temperature += `${maxTemperature}°C`;
      obj.image = `${this.newPlanetStats.image}-${this.newPlanetStats.rarity}`;
      obj.type = this.newPlanetStats.type;

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
<style lang="scss">
.glass-element-dialog {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
}

.glass-element-dialog:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba($dark, 0.9);
  filter: blur(10px);
}

.neonText {
  color: white;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff;
}

.congratulationsDialogItem {
  // border: 1px solid #2253f4;
  color: #fff;
  padding: 2px 0px !important;
  border-bottom: 1px solid !important;
  margin-bottom: 6px !important;
  &:last-child {
    border-bottom: none !important;
  }
}
.planetCongratulationsPopup-card .bg-img {
  background: url(../assets/img/cardpopup.webp) center/cover;
  // background-size: cover;
  // background-position: center;
}

.epic-button {
  cursor: pointer;
  position: relative;
  /* padding: 0.3rem 1.3rem; */
  /* border-radius: 3.75rem; */
  line-height: 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid #808080;
  /* background-image: linear-gradient(-180deg, #2253f4 0%, #2253f4 100%); */
  /* box-shadow: 0 1rem 1.25rem 0 rgb(34 83 244 / 50%), 0 -0.25rem 1.5rem #6e0f9b inset, 0 0.75rem 0.5rem rgb(255 255 255 / 40%) inset, 0 0.25rem 0.5rem 0 #b446cf inset; */
  max-width: 250px;
  width: 100%;
  clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
  background: #808080;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.epic-button span {
  // color: transparent;
  // background-image: linear-gradient(0deg, #ee82da 0%, #fefafd 100%);
  // -webkit-background-clip: text;
  // background-clip: text;
  // filter: drop-shadow(0 2px 2px hsla(290, 100%, 20%, 1));
  color: #fff;
}

.epic-button::before {
  content: "";
  display: block;
  height: 0.25rem;
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 7.5rem);
  background: #fff;
  border-radius: 100%;

  opacity: 0.7;
  background-image: linear-gradient(
    -270deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 20%,
    #ffffff 80%,
    rgba(255, 255, 255, 0) 100%
  );
  display: none;
}

.epic-button::after {
  content: "";
  display: block;
  height: 0.25rem;
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 7.5rem);
  background: #fff;
  border-radius: 100%;

  filter: blur(1px);
  opacity: 0.05;
  background-image: linear-gradient(
    -270deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 20%,
    #ffffff 80%,
    rgba(255, 255, 255, 0) 100%
  );
}

.about-us-image {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden !important;
}

.about-us-image img {
  object-fit: contain;
  min-width: 100%;
  min-height: 100%;
}
</style>
