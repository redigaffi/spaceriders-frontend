<template>
  <div class="q-py-sm">
    <q-card class="glass-element text-white q-pa-md" style="width: 300px">
      <q-card-section class="row fit justify-between items-center">
        <div
          class="
            text-h6 text-center text-weight-bold text-secondary
            absolute-center
          "
        >
          Buildings
        </div>
      </q-card-section>
      <div v-if="underconstruction">
        <div class="col-12 q-pa-sm text-center" v-for="n in 1" :key="`sm-${n}`">
          <q-list bordered rounded>
            <div class="text-warning q-pa-sm text-subtitle2">Crystal Mine</div>

            <q-item>
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
      <div v-if="!underconstruction">
        <p class="q-py-sm">No buildings in construction (To Resources)</p>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "QueueBuildings",
  setup() {
    return {
      underconstruction: true,
    };
  },
});
</script>
