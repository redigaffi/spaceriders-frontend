<template>
  <q-card-section class="row q-col-gutter-sm text-center">
    <div class="col-12 q-pa-sm">
      <q-card flat class="bg-transparent text-dark">
        <img
          :src="`data_img/${keyName}.png`"
          width="100%"
          style="height: 300px; width: 100%"
        />
        <q-card-section class="text-secondary absolute-top tag-glass-element">
          {{ name }}
        </q-card-section>
        <!-- <q-card-section class="bg-dark">
          <q-btn color="warning" class="q-px-lg" label="Resource Settings" />
        </q-card-section> -->
      </q-card>
    </div>
  </q-card-section>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DefaultSlider",
  props: {
    name: {
      type: String,
      default: undefined,
    },
    keyName: {
      type: String,
      default: undefined,
    },
  },
  setup() {
    return {};
  },
});
</script>
