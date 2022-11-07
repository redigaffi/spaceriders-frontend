<template>
  1asd1
  <div v-if="$store.getters.activePlanet !== false" class="q-py-sm">
    haha
    <q-card class="glass-element text-white queue-buildings">
      <glass-element-heading class="text-overline">Queue</glass-element-heading>

<!--      <q-btn-->
<!--        v-if="buildingsInQueue.length > 0"-->
<!--        dense-->
<!--        class="q-px-sm q-mt-sm full-width"-->
<!--        color="warning"-->
<!--        :label="`Pay ${clearQueueCost} $BKM to clear`"-->
<!--        no-caps-->
<!--        push-->
<!--        @click="clearQueue"-->
<!--      />-->

      <div
        class="col-12 q-pa-sm text-center"
        v-for="bQ in buildingsInQueue"
        :key="`${bQ.label}`"
      >
        <div class="text-center c-subscribe-box">
          <q-list rounded class="rainbow bg-dark q-pa-none">
            <div class="text-warning q-pa-sm text-subtitle2">
              {{ Types.MAPPING[bQ.type].NAME_MAPPING.get(bQ.label) }}
            </div>

            <q-item class="q-pa-none">
              <q-item-section avatar>
                <img
                  :src="`data_img/${bQ.label}.webp`"
                  style="width: 70px; height: 70px"
                  alt=""
                />
              </q-item-section>

              <q-item-label caption class="text-left">
                <div v-if="bQ.next_level !== null && bQ.action !== 'REPAIRING'" class="text-body2">
                  Upgrade to :
                  <span class="text-secondary text-weight-bold">{{
                      bQ.next_level
                    }}</span>
                </div>
                <div v-if="bQ.quantity !== null" class="text-body2">
                  Quantity:
                  <span class="text-secondary text-weight-bold">{{
                      bQ.quantity
                    }}</span>
                </div>
                <div class="text-body2">
                  <div v-if="bQ.start_at <= timestamp">
                    Time left :
                    <span class="text-secondary text-weight-bold">{{
                        calculateRelativeTime(bQ.start_at + bQ.time_to_finish)
                      }}</span>
                  </div>
                  <div v-if="bQ.start_at > timestamp">
                    Starts in :
                    <span class="text-secondary text-weight-bold">{{
                        calculateRelativeTime(bQ.start_at)
                      }}</span>
                  </div>

                </div>
                <div class="text-body2">
                  Status :
                  <span v-if="bQ.start_at <= timestamp">
                      <span class="text-weight-bold" v-if="bQ.action === 'REPAIRING'">Repairing...</span>
                      <span v-else class="text-weight-bold">Building...</span>
                    </span>
                  <span v-else>
                        <span class="text-weight-bold">In Queue...</span>
                    </span>

                </div>
              </q-item-label>
            </q-item>
          </q-list>
        </div>
      </div>

      <div v-if="buildingsInQueue.length <= 0" class="text-center">
        <div>
          <img
            src="~assets/img/stack-svgrepo-com.svg"
            alt=""
            style="height: 70px"
          />
        </div>
        <p class="q-py-sm">Queue is empty</p>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  watchEffect,
  computed,
  getCurrentInstance,
} from "vue";
import GlassElementHeading from "components/GlassElementHeading";
import {useStore} from "vuex";
import Types from "src/constants/Types";
import ApiRequests from "src/service/http/ApiRequests";
import {useQuasar} from "quasar";

const $store = useStore();
const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;
const $q = useQuasar();

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

let refreshTimerId = ref(-1);
let queueTimeoutIds = reactive({});

function calculateRelativeTime(finishTimestamp) {
  const now = new Date();

  let finish = new Date(finishTimestamp * 1000);
  const diffSeconds = (finish.getTime() - now.getTime()) / 1000;
  const s = Math.round(diffSeconds % 60);
  const minutes = Math.round((diffSeconds - s) / 60);

  const m = minutes % 60;
  const h = Math.round(minutes - m) / 60;

  let str = "";

  if (h > 0) str += `${h} (h)`;
  if (m > 0) str += ` ${m} (m)`;
  if (s >= 0) str += ` ${s} (s)`;

  if (str === "") {
    str = "Finishing...";
  }

  return str;
}

function startTimers(data) {

  for (let d in data) {
    const b = data[d];
    if (queueTimeoutIds[b.label] === undefined) {
      const now = new Date();
      let finish = new Date((b.start_at + b.time_to_finish) * 1000);
      const diffSeconds = finish.getTime() - now.getTime();

      queueTimeoutIds[b.label] = setTimeout(() => {
        if (b.action === "BUILDING") {
          $store.commit("upgradeFinished", {
            label: b.label,
            type: b.type,
          });
        } else if (b.action === "REPAIRING") {
          $store.commit("repairFinished", {
            label: b.label,
            type: b.type
          });
        }
        queueTimeoutIds[b.label] = undefined;
      }, diffSeconds);
    }
  }
}

let timestamp = ref(Date.now() / 1000);

const buildingsInQueue = computed(() => {
  return $store.getters.buildingQueue.items;
});

function refreshAll() {
  if (refreshTimerId.value !== -1) {
    return;
  }

  refreshTimerId.value = setInterval(() => {
    timestamp.value = Date.now() / 1000;
    $store.commit("refreshAllData");
    if (buildingsInQueue.value.length === 0) {
      clearInterval(refreshTimerId.value);
      refreshTimerId.value = -1;
    }
  }, 1000);
}

watchEffect(() => {
  if (buildingsInQueue.value.length > 0) {
    startTimers(buildingsInQueue.value);
    refreshAll();
  }
});

const clearQueueCost = computed(() => {
  let totalCost = 0;

  buildingsInQueue.value.forEach((bQ) => {
    let diffSeconds = bQ.start_at + bQ.time_to_finish - timestamp.value;
    let minutes = diffSeconds / 60;

    totalCost += minutes * 2;
  });

  return totalCost.toFixed(2);
});

async function clearQueue() {
  let totalCost = 0;

  if ($store.getters.activePlanet.resources.bkm <= clearQueueCost.value) {
    $q.notify($notification("failed", "Not enough $BKM to clear queue"));
    return;
  }

  try {
    const re = await ApiRequests.payQueue({
      planetGuid: $store.getters.activePlanet.id,
    });

    const paid = re.data.total_cost;

    for (let idx in buildingsInQueue.value) {
      const item = buildingsInQueue.value[idx];

      if (item.action === "BUILDING") {
        $store.commit("upgradeFinished", {
          label: item.label,
          type: item.type,
        });
      } else if (item.action === "REPAIRING") {
        $store.commit("repairFinished", {
          label: item.label,
          type: item.type
        });
      }

      clearTimeout(queueTimeoutIds[item.label]);
      queueTimeoutIds[item.label] = undefined;
    }

    $store.commit("decrementBkm", {bkm: paid});
    $q.notify($notification("success", "Cleared queue successfully"));
  } catch (e) {
    $q.notify($notification("failed", e));
  }


}
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
