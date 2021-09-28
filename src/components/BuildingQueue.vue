<template>
  <div class="q-py-sm">
    <q-card class="glass-element text-white queue-buildings">
      <glass-element-heading class="text-overline"
        >Buildings</glass-element-heading
      >
      <!-- <q-card-section class="row fit justify-between items-center">
        <div
          class="
            text-h6 text-center text-weight-bold text-secondary
            absolute-center
          "
        >
          Buildings
        </div>
      </q-card-section> -->
      <div v-if="underconstruction">
        <div class="col-12 q-pa-sm text-center" v-for="n in 3" :key="`sm-${n}`">
          <div class="text-center c-subscribe-box">
            <q-list rounded class="rainbow bg-dark q-pa-none">
              <div class="text-warning q-pa-sm text-subtitle2">
                Crystal Mine
              </div>

              <q-item class="q-pa-none">
                <q-item-section avatar>
                  <img
                    src="~assets/img/body-backgrounds-1.jpg"
                    style="width: 70px; height: 70px"
                    alt=""
                  />
                </q-item-section>

                <q-item-label caption class="text-left">
                  <div>
                    Improve to : <span class="text-secondary">Level 1</span>
                  </div>
                  <div>Duration : <span class="text-secondary">30s</span></div>
                  <div>
                    Status : <span class="text-secondary">In Progress</span>
                  </div>
                </q-item-label>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div v-if="!underconstruction" class="text-center">
        <div>
          <img
            src="~assets/img/stack-svgrepo-com.svg"
            alt=""
            style="height: 70px"
          />
        </div>
        <p class="q-py-sm">No buildings in construction (To Resources)</p>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import GlassElementHeading from "components/GlassElementHeading";

export default defineComponent({
  name: "BuildingQueue",
  components: {
    GlassElementHeading,
  },
  setup() {
    return {
      underconstruction: true,
    };
  },
});
</script>
<style lang="scss">
.queue-buildings {
  width: 300px;
}

@media (max-width: $breakpoint-sm-min) {
  .queue-buildings {
    width: 100%;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.rainbow {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
  padding: 14px;

  &::before {
    content: "";
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#373945, #1a1923),
      linear-gradient(#223147, #2e141b), linear-gradient(#111916, #1a1923),
      linear-gradient(#280133, #2e1832);
    animation: rotate 4s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 3px;
    top: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background: $dark;
    border-radius: 8px;
  }
}
</style>
