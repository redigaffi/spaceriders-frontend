<template>
  <q-separator />

  <q-img :src="topicImage" style="height: 200px; width: 100%" />

  <q-card-section>
    {{ mail.body }}
  </q-card-section>
</template>
<script setup>
import { defineProps, reactive, toRefs, computed } from "vue";

const props = defineProps({
  mail: Object,
});

const { mail } = toRefs(props);

const topicImage = computed(() => {
  let popupImage;

  switch (mail.value.topic) {
    case "level_up":
      popupImage = "level_up_bg";
      break;
    default:
      popupImage = "inbound_message_bg";
      break;
  }

  return require(`../../assets/img/${popupImage}.jpg`);
});
</script>
