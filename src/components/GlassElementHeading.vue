<template>
  <q-card class="q-mb-sm">
    <q-card-section class="q-pa-xs text-center">
      <div class="text-weight-bold"><slot></slot></div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GlassElementHeading",
  setup() {
    return {};
  },
});
</script>
