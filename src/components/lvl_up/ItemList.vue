<template>
  <q-card-section class="q-py-md">
    <div class="text-center text-h6">
      {{ listName }}
    </div>
  </q-card-section>

  <q-card-section class="row q-col-gutter-sm justify-start q-pa-none">
    <q-card
      v-for="(value, key) in data"
      :key="key"
      flat
      class="col-6 col-md-3 bg-transparent text-dark cursor-pointer"
      @click="$emit('change', value)"
    >
      <img :src="`data_img/${value.label}.webp`" />

      <q-card-section
        v-if="itemType"
        class="q-pa-xs text-weight-bold text-secondary absolute-bottom tag-glass-element text-center"
      >
        {{ value.available }}
      </q-card-section>

      <q-card-section
        v-else
        class="q-pa-xs text-weight-bold text-secondary absolute-bottom tag-glass-element text-center"
      >
        {{ value.level }}
      </q-card-section>

      <q-card-section
        class="q-pb-sm text-secondary absolute-top tag-glass-element text-center"
      >
        {{ value.name }}
      </q-card-section>

      <!--
      <q-tooltip
        anchor="top middle"
        self="center middle"
        class="bg-primary text-subtitle2"
      >
        {{ value.name }}
      </q-tooltip>
      -->
    </q-card>
  </q-card-section>
</template>

<script>
import { defineComponent } from "vue";

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
    itemType: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {};
  },
});
</script>
