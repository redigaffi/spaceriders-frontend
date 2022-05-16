<template>
  <q-card class="glass-element text-white q-pa-md">
    <q-card-section class="row fit justify-between items-center">
      <div></div>
      <div
        class="text-h6 text-center text-weight-bold text-secondary absolute-center"
      >
        Buy Planets
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
        class="q-pb-none text-secondary text-subtitle1 text-weight-bolder text-center"
      >
        No planets in queue
      </q-card-section>
      <q-card-section
        class="q-pb-none text-secondary text-subtitle1 text-weight-bolder text-center"
      >
        <BuyPlanet />
      </q-card-section>
    </div>
  </q-card>

  <q-dialog v-model="planetCongratulationsPopup">
    <q-card
      class=""
      flat
      style="width: 700px; max-width: 80vw; border-radius: 20px"
    >
        <q-btn
          round
          class="absolute-top-right"
          flat
          color="warning"
          icon="close"
          v-close-popup
        />
      <q-card-section class="q-pa-none row q-col-gutter-sm">
        <div
          class="col"
          style="background-size: cover; display: flex; justify-content: center;"
          :style="{
            background: `url(https://spaceriders-planets.s3.us-east-2.amazonaws.com/${this.newPlanetInfo.image}-${this.newPlanetInfo.rarity}.png)`,
          }"
        ></div>

        <div class="q-py-md col flex flex-center">
          <q-card
            style="
              border: 2px solid #2253f4;
              border-radius: 5px;
              box-shadow: 0 0 20px #2253f4;
              color: #fff;
            "
          >
            <q-card-section class="q-pa-none">
              <div class="text-subtitle2">
                <q-card-section class="q-pa-none">
                  <div
                    class="text-center q-pa-sm"
                    style="
                      border: 2px solid #21ba45;
                      border-radius: 5px;
                      box-shadow: 0 0 20px #21ba45;
                      color: #fff;
                    "
                  >
                    New Planet has been claimed
                  </div>
                  <div class="q-mt-md">
                    <div class="text-secondary">
                      <q-list dense class="text-left">
                        <q-item class="congratulationsDialogItem">
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            lines="1"
                            >Diameter :
                          </q-item-section>
                          <q-item-section avatar class="text-white"
                            >{{ this.newPlanetInfo.diameter }}
                          </q-item-section>
                        </q-item>

                        <q-item class="congratulationsDialogItem">
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            lines="1"
                            >Temperature :
                          </q-item-section>
                          <q-item-section avatar class="text-white"
                            >{{ this.newPlanetInfo.temperature }}
                          </q-item-section>
                        </q-item>
                        <q-item class="congratulationsDialogItem">
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            lines="1"
                            >Position :
                          </q-item-section>
                          <q-item-section avatar class="text-white"
                            >{{ this.newPlanetInfo.position }}
                          </q-item-section>
                        </q-item>

                        <q-item class="congratulationsDialogItem">
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            lines="1"
                            >Metal Reserve :
                          </q-item-section>
                          <q-item-section avatar class="text-white"
                            >{{ this.newPlanetInfo.metalReserve }}
                          </q-item-section>
                        </q-item>

                        <q-item class="congratulationsDialogItem">
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            lines="1"
                            >Crystal Reserve :
                          </q-item-section>
                          <q-item-section avatar class="text-white"
                            >{{ this.newPlanetInfo.crystalReserve }}
                          </q-item-section>
                        </q-item>
                        <q-item class="congratulationsDialogItem">
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            lines="1"
                            >Petrol Reserve :
                          </q-item-section>
                          <q-item-section avatar class="text-white"
                            >{{ this.newPlanetInfo.petrolReserve }}
                          </q-item-section>
                        </q-item>

                        <div
                          class="congratulationsDialogItem text-center q-pt-md"
                        >
                          <button class="epic-button">
                            <span>{{
                              this.newPlanetInfo.rarity.toUpperCase()
                            }}</span>
                          </button>
                        </div>

                      </q-list>
                    </div>
                  </div>

                </q-card-section>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
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
  setup() {
    return {
      // testPlanel: ref(true),
    };
  },
  data: function () {
    return {
      claimRefreshId: -1,
      planetCongratulationsPopup: false,
      newPlanetStats: false,
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

      const colorMapping = {
        common: "blue-grey-6",
        epic: "info",
        legendary: "purple-9",
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
}

.epic-button {
  cursor: pointer;
  position: relative;
  padding: 0.3rem 1.3rem;
  border-radius: 3.75rem;
  line-height: 2.5rem;
  font-size: 1rem;
  font-weight: 600;

  border: 1px solid #2253f4;
  background-image: linear-gradient(-180deg, #2253f4 0%, #2253f4 100%);
  box-shadow: 0 1rem 1.25rem 0 rgba(34, 83, 244, 0.5),
    0 -0.25rem 1.5rem rgba(110, 15, 155, 1) inset,
    0 0.75rem 0.5rem rgba(255, 255, 255, 0.4) inset,
    0 0.25rem 0.5rem 0 rgba(180, 70, 207, 1) inset;
}

.epic-button span {
  color: transparent;
  background-image: linear-gradient(0deg, #ee82da 0%, #fefafd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 2px 2px hsla(290, 100%, 20%, 1));
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
