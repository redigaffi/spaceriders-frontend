<template>
  <div>
    <q-card-section v-if="!claimeable" class="row q-col-gutter-sm text-center">
      <div
        class="col-xs-6 col-sm-3 col-md-3 q-pa-sm"
        v-for="p in this.planets"
        :key="p.id"
      >
        <q-card
          flat
          class="bg-transparent text-dark image"
          :data-content="this.calculateClaimDate(p)"
        >
          <img src="~assets/img/planet1.jpg" />
          <q-card-section class="text-center text-secondary bg-dark">
            {{ p.name }}
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>

    <q-card-section v-else class="row q-col-gutter-sm text-center">
      <div class="col-3 q-pa-sm" v-for="p in this.planets" :key="p.id">
        <q-card flat class="bg-transparent text-dark" style="width: 230px">
          <img
            src="~assets/img/planet1.jpg"
            style="height: 200px; width: 230px"
          />
          <q-card-section class="text-secondary absolute-top tag-glass-element">
            {{ p.name }}
          </q-card-section>
          <q-card-section class="bg-dark">
            <ClaimPlanet :planet="p" />
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import ClaimPlanet from "../components/ClaimPlanet.vue";

export default {
  name: "ClaimPlanetList",
  components: {
    ClaimPlanet,
  },
  props: {
    planets: Array,
    claimeable: Boolean,
  },

  methods: {
    calculateClaimDate: function (planet) {
      const now = new Date();
      const claim = new Date(planet.claimable * 1000);

      const diffSeconds = (claim.getTime() - now.getTime()) / 1000;
      const s = Math.round(diffSeconds % 60);
      const minutes = Math.round((diffSeconds - s) / 60);

      const m = minutes % 60;
      const h = Math.round(minutes - m) / 60;

      let str = "";
      if (h > 0) str += `${h}h`;
      if (m > 0) str += ` ${m}m`;
      if (s >= 0) str += ` ${s}s`;

      return str;
    },
  },
};
</script>
<style lang="scss">
.image {
  position: relative;
  width: 230px;
}

.image img {
  width: 100%;
  vertical-align: top;
  height: 200px;
  width: 230px;
}

.image:after {
  content: "\A";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 1;
  transition: all 0.5s;
  content: attr(data-content);
  color: #fff;
  padding: 20px;
  font-size: 18px;
  -webkit-transition: all 0.5s;
}

@media (max-width: $breakpoint-md-min) {
  .image {
    position: relative;
    width: 130px;
  }

  .image img {
    width: 100%;
    vertical-align: top;
    height: 100px;
    width: 130px;
  }
}
</style>
