<template>
  <q-item clickable :to="link" exact exact-active-class="bg-primary text-white">
    <q-item-section>
      <q-item-label>
        <q-icon :name="icon" />
        {{ title }}</q-item-label
      >
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavLinks",
  props: {
    title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>
