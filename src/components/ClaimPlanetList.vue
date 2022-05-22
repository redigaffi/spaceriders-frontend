<template>
  <div>
    <q-card-section
      v-if="!claimeable"
      class="row q-col-gutter-sm text-center custom-font-style neonText"
    >
      <div
        class="col-xs-6 col-sm-4 col-md-3 q-pa-sm"
        v-for="p in planets"
        :key="p.id"
      >
        <q-card
          flat
          class="bg-transparent text-dark image"
          :data-content="calculateClaimDate(p)"
        >
          <img
            src="~assets/img/planet_queue.webp"
            style="height: 250px; width: 100%"
          />
          <q-card-section
            style="overflow: hidden; text-overflow: ellipsis"
            class="text-center text-secondary bg-dark"
            >{{ p.name }}</q-card-section
          >
        </q-card>
      </div>
    </q-card-section>

    <q-card-section v-else class="row q-col-gutter-sm text-center">
      <div
        class="col-xs-6 col-sm-4 col-md-3 q-pa-sm"
        v-for="p in planets"
        :key="p.id"
      >
        <q-card flat class="bg-transparent text-dark claimable-cards">
          <img
            src="~assets/img/planet_claimable.webp"
            style="height: 250px; width: 100%"
          />
          <q-card-section
            style="overflow: hidden; text-overflow: ellipsis"
            class="text-secondary absolute-top tag-glass-element"
            >{{ p.name }}</q-card-section
          >
          <q-card-section class="bg-dark">
            <ClaimPlanet :planet="p" />
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </div>
</template>

<script setup>
import ClaimPlanet from "../components/ClaimPlanet.vue";
import { ref, getCurrentInstance, toRefs, computed } from "vue";

const props = defineProps({
  planets: Array,
  claimeable: Boolean,
});

const { planets, claimeable } = toRefs(props);

function calculateClaimDate(planet) {
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
}
</script>
<style lang="scss">
.image {
  position: relative;
}

.image img {
  width: 100%;
  vertical-align: top;
  height: 200px;
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

.claimable-cards {
  position: relative;
}
.claimable-cards img {
  width: 100%;
  vertical-align: top;
  height: 200px;
}

@media (max-width: $breakpoint-md-min) {
  .image {
    position: relative;
    // width: 130px;
  }

  .image img {
    vertical-align: top;
    height: 100px;
    // width: 130px;
  }

  .claimable-cards {
    position: relative;
  }
  .claimable-cards img {
    width: 100%;
    vertical-align: top;
    height: 100px;
  }
}

</style>
