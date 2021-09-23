<template>
  <q-card class="glass-element text-white q-pa-md">
    <q-card-section class="row fit justify-between items-center">
      <div></div>
      <div class="text-h6 text-center text-weight-bold text-secondary absolute-center">
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

      <ClaimPlanetList ref="claimPlanetList" :planets="this.unClaimedNotReadyPlanets" />

      <q-card-section
        class="q-pb-none text-secondary text-subtitle1 text-weight-bolder"
      >
        Ready to Claim
      </q-card-section>

      <ClaimPlanetList ref="claimPlanetList" :planets="this.unClaimedReadyPlanets" claimeable />
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
        Looks like you haven't purchased any planet
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
import ApiRequest from "../service/http/ApiRequests";
import ClaimPlanetList from "../components/ClaimPlanetList.vue";
import BuyPlanet from "../components/BuyPlanet.vue";
import { NEW_PLANET_PURCHASED, PLANET_CLAIMED } from "../constants/Events";

export default defineComponent({
  name: "PageIndex",
  components: {
    ClaimPlanetList,
    BuyPlanet,
  },
  setup() {},

  data: function () {
    return {
      planets: [],
      claimRefreshId: -1,
    };
  },
  async created() {
    this.$eventBus.on(NEW_PLANET_PURCHASED, (e) => {
      this.getPlanets();
    });

    this.$eventBus.on(PLANET_CLAIMED, (e) => {
      this.deleteFromList(e);
    });

    await this.getPlanets();

    if(this.unClaimedNotReadyPlanets) {
      this.claimRefreshId = setInterval(() => {
        this.planets = [...this.planets];
        if(!this.anyUnClaimedPlanet) clearInterval(this.unClaimedNotReadyPlanets);  
      }, 1000);
    }
  },

  methods: {
    deleteFromList: function (data) {
      const planetGuid = data.planetGuid;
      this.planets = this.planets.filter((el) => el.id !== planetGuid);
    },

    getPlanets: async function () {
      this.planets = (await ApiRequest.getAllPlanets()).data;
    },
  },
  computed: {
    unClaimedNotReadyPlanets: function () {
      return this.planets.filter((obj) => {
        const now = new Date();
        const claimDate = new Date(obj.claimable * 1000);
        const diff = claimDate.getTime() - now.getTime();
        return !obj.claimed && diff >= 0;
      });
    },

    unClaimedReadyPlanets: function () {
      return this.planets.filter((obj) => {
        const now = new Date();
        const claimDate = new Date(obj.claimable * 1000);
        const diff = claimDate.getTime() - now.getTime();
        return !obj.claimed && diff <= 0;
      });
    },

    anyUnClaimedPlanet() {
      return this.planets.filter((obj) => {
        return !obj.claimed;
      }).length > 0;
    },
  },
});
</script>
<style lang="scss">
.tag-glass-element {
  z-index: 1;
  background: inherit;
  overflow: hidden;
}

.tag-glass-element:before {
  content: "";
  position: absolute;
  background: rgba($dark, 0.7);
  z-index: -1;
  // border-radius: 5px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.glass-element {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
}

.glass-element:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba($dark, 0.7);
  filter: blur(10px);
  margin: -20px;
}

.image {
  position: relative;
}

.image img {
  width: 100%;
  vertical-align: top;
}

.image:after {
  content: "\A";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.image:hover:after {
  content: attr(data-content);
  color: #fff;
  padding: 20px;
  opacity: 1;
}
</style>
