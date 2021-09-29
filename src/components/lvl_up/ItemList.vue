<template>
  <div class="q-pt-sm">
    <q-card class="glass-element text-white q-pa-md">
      <q-card-section class="row fit justify-between items-center">
        <div
          class="
            text-h6 text-center text-weight-bold text-secondary
            absolute-center
          "
        >
          {{ listName }}
        </div>
      </q-card-section>
      <div>
        <q-card-section class="row q-col-gutter-sm justify-start">
          <div
            class="col-xs-6 col-sm-4 col-md-2 q-pa-sm text-center"
            v-for="(value, key) in data"
            :key="key"
          >
            <q-card
              flat
              class="bg-transparent text-dark cursor-pointer"
              @click="$emit('change', value)"
            >
              <q-btn
                dense
                size="md"
                class="absolute-top"
                color="warning"
                icon="expand_less"
                style="z-index: 1"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                  class="bg-primary text-subtitle2"
                >
                  Upgrade {{ value.name }} to level {{ value.level + 1 }}
                </q-tooltip>
              </q-btn>
              <q-card-section class="q-pa-none">
                <q-card
                  flat
                  class="bg-transparent text-dark cursor-pointer"
                  
                >
                  <img src="~assets/img/planet1.jpg" style="height: 110px" />

                  <q-card-section
                    class="
                      q-pa-xs
                      text-warning
                      absolute-bottom
                      tag-glass-element
                    "
                  >
                    {{value.level}}
                  </q-card-section>
                  <!-- <q-card-section class="bg-dark">
                    <q-btn color="warning" class="q-px-lg" label="Claim" />
                  </q-card-section> -->
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    class="bg-primary text-subtitle2"
                  >
                    {{ value.name }}
                  </q-tooltip>
                </q-card>
              </q-card-section>
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
  name: "ItemList",
  props: {
    data: {
      type: Object,
      default: undefined,
    },
    listName: {
      type: String,
      default: undefined,
    },
  },
  setup() {
    return {};
  },
});
</script>
