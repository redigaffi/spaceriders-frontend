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
      <div v-if="buildingsInQueue.length > 0">
        <div class="col-12 q-pa-sm text-center" v-for="bQ in buildingsInQueue" :key="`${bQ.name}`">
          <div class="text-center c-subscribe-box">
            <div class="rainbow"><span></span><span></span></div>

            <q-list
              bordered
              rounded
              class="c-subscribe-box__wrapper bg-dark q-pa-none"
            >
              <div class="text-warning q-pa-sm text-subtitle2">
                {{ bQ.name }}
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
                    Upgrade to : <span class="text-secondary">{{ bQ.level+1 }}</span>
                  </div>
                  <div>Time left : <span class="text-secondary">{{ calculateClaimDate(bQ) }}</span></div>
                  <div>
                    Status : <span class="text-secondary">Upgrading...</span>
                  </div>
                </q-item-label>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <div>
          <img
            src="~assets/img/stack-svgrepo-com.svg"
            alt=""
            style="height: 70px"
          />
        </div>
        <p class="q-py-sm">No buildings in construction</p>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, getCurrentInstance } from "vue";
import GlassElementHeading from "components/GlassElementHeading";
import { useStore } from "vuex";
import { BUILDING_UPGRADED } from "../constants/Events";

export default defineComponent({
  name: "BuildingQueue",
  components: {
    GlassElementHeading,
  },
  setup() {
    const $store = useStore();
    const $eventBus =
      getCurrentInstance().appContext.config.globalProperties.$eventBus;

    let timerId = ref(-1);
    let upgradeBuildings = reactive({});

    function calculateClaimDate (building) {
      const now = new Date();
      const claim = new Date(building.current_upgrade_time_left * 1000);

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
    };

    const buildingsInQueue = computed(() => {
      const data = {
        ...$store.getters.resourceData,
        ...$store.getters.installationData
      }

      let re = []
      for(let key in data) {
        const building = data[key];
        if (building.upgrading) {
          re.push(building)
          //upgradeBuildings[building.label] = setTimeout(() => { }, 3000);
        }
      }
      return re;
    });

    function startTimers() {
      let data = buildingsInQueue.value;
      for (let d in data) {
        const b = data[d];
        if (upgradeBuildings[b.label] === undefined) {
          const now = new Date();
          const claim = new Date(b.current_upgrade_time_left * 1000);
          const diffSeconds = (claim.getTime() - now.getTime());

          upgradeBuildings[b.label] = setTimeout(() => { 
            $store.commit("upgradeBuildingFinish", {label: b.label, type: b.type})
            upgradeBuildings[b.label] = undefined;
          }, diffSeconds);
        }
      }

      if (data.length > 0) {
        timerId.value = setInterval(() => {
          console.log("buildin queue interval")
          $store.commit("refreshBuildingData");
          if (buildingsInQueue.value.length === 0 ) {
            clearInterval(timerId.value);
          } 
        }, 1000);
      }
    }

    $eventBus.on(BUILDING_UPGRADED, () => {
      startTimers();
    });

    startTimers(); 

    return {
      buildingsInQueue: buildingsInQueue,
      calculateClaimDate: calculateClaimDate,
    };
  },
});
</script>
<style lang="scss">
.queue-buildings {
  width: 300px;
}

// Global Variables

:root {
  --color-first: #373945;
  --color-second: #5c5769;
  --color-third: #86778d;
  --color-forth: #b598b0;
  --block-width: 100%;
  --block-height: 140px;
  --border-width: 2px;
  --border-radius-outer: 8px;
  --border-radius-inner: calc(var(--border-radius-outer) / 1);
}

.rainbow {
  width: 100%;
  height: 100%;
  animation: o-rotate-360 linear 3s infinite;

  span {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    transform: translate(-50%, -50%);

    &:after {
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 100%;
    }

    &:first-child {
      background: var(--color-first);
      &:after {
        background: var(--color-second);
      }
    }

    &:last-child {
      background: var(--color-third);
      &:after {
        background: var(--color-forth);
      }
    }
  }
}

// Components

.c-subscribe-box {
  width: var(--block-width);
  height: var(--block-height);
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);
  border-radius: var(--border-radius-outer);

  &__wrapper {
    width: calc(100% - var(--border-width));
    height: calc(100% - var(--border-width));
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius-inner);
  }
}

// Objects

@keyframes o-rotate-360 {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: $breakpoint-sm-min) {
  .queue-buildings {
    width: 100%;
  }
}
</style>
