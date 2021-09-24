<template>
  <div class="q-py-sm">
    <q-card class="glass-element text-white q-pa-md">
      <q-card-section class="row fit justify-between items-center">
        <div
          class="
            text-h6 text-center text-weight-bold text-secondary
            absolute-center
          "
        >
          Resource Buildings
        </div>
      </q-card-section>
      <div>
        <q-card-section class="row q-col-gutter-sm justify-start">
          <div
            class="col-xs-6 col-sm-4 col-md-2 q-pa-sm text-center"
            v-for="n in 8"
            :key="`sm-${n}`"
          >
            <q-card
              flat
              class="bg-transparent text-dark cursor-pointer"
              @click="$emit('change')"
            >
              <q-btn
                dense
                size="md"
                class="absolute-top"
                color="warning"
                icon="expand_less"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                  class="bg-primary text-subtitle2"
                >
                  Expand Metal Mine on level 2
                </q-tooltip>
              </q-btn>
              <img src="~assets/img/planet1.jpg" style="height: 110px" />

              <q-card-section
                class="q-pa-xs text-warning absolute-bottom tag-glass-element"
              >
                0
              </q-card-section>
              <!-- <q-card-section class="bg-dark">
                  <q-btn color="warning" class="q-px-lg" label="Claim" />
                </q-card-section> -->
              <q-tooltip
                anchor="top middle"
                self="center middle"
                class="bg-primary text-subtitle2"
              >
                Metal mine
              </q-tooltip>
            </q-card>
          </div>
        </q-card-section>
      </div>
    </q-card>

    
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ResourceBuildings",
  setup() {
    return {};
  },
});
</script>
