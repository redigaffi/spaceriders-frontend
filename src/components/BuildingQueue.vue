<template>
  <div v-if="this.$store.getters.activePlanet !== false" class="q-py-sm">
    <q-card class="glass-element text-white queue-buildings">
      <glass-element-heading class="text-overline"
        ><slot></slot></glass-element-heading
      >
      <div v-if="buildingsInQueue.length > 0">
        <div class="col-12 q-pa-sm text-center" v-for="bQ in buildingsInQueue" :key="`${bQ.name}`">
          <div class="text-center c-subscribe-box">
            <q-list rounded class="rainbow bg-dark q-pa-none">
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
                  <div class="text-body2">
                    Upgrade to : <span class="text-secondary text-weight-bold">{{ bQ.level+1 }}</span>
                  </div>
                  <div class="text-body2">Time left : <span class="text-secondary text-weight-bold">{{ calculateClaimDate(bQ) }}</span></div>
                  <div class="text-body2">
                    Status : <span class="text-secondary text-weight-bold">Upgrading...</span>
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
  props: {
    data: {
      type: Object,
      default: undefined,
    }
  },
  setup(props) {
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
      const data = props.data;

      let re = []
      for(let key in data) {
        const building = data[key];
        if (building.upgrading) {
          re.push(building)
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
            $store.commit("upgradeFinished", {label: b.label, type: b.type})
            upgradeBuildings[b.label] = undefined;
          }, diffSeconds);
          
          $store.commit("addTimeoutId", {id: upgradeBuildings[b.label]});
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

        $store.commit("addIntervalId", {id: timerId.value})
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
  width: 100%;
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
