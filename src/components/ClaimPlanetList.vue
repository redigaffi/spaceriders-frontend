<template>
  <template v-if="!claimeable">
    <div v-for="p in planets" :key="p.id" class="col-6 col-md-3">
      <q-card bordered>
        <q-img src="~assets/img/planet_queue.webp">
          <q-badge
            class="text-h5 absolute-top justify-center no-border-radius"
            style="padding: 5px 0"
            >{{ calculateClaimDate(p) }}</q-badge
          >

          <q-badge
            class="text-body2 absolute-bottom justify-center no-border-radius glossy"
            style="padding: 5px 0"
            >{{ p.name }}</q-badge
          >
        </q-img>
      </q-card>
    </div>
  </template>

  <template v-else>
    <div v-for="p in planets" :key="p.id" class="col-6 col-md-3">
      <q-card bordered>
        <q-img src="~assets/img/planet_claimable.webp">
          <q-badge
            class="text-body2 absolute-top justify-center no-border-radius glossy"
            style="padding: 5px 0"
            >{{ p.name }}</q-badge
          >
        </q-img>

        <q-card-actions class="q-pa-none">
          <ClaimPlanet
            :planet="p"
            class="full-width"
            style="border-top-left-radius: 0; border-top-right-radius: 0"
          />
        </q-card-actions>
      </q-card>
    </div>
  </template>
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
  if (h > 0) str += `${h} (h)`;
  if (m > 0) str += ` ${m} (m)`;
  if (s >= 0) str += ` ${s} (s)`;

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
