<template>
  <q-separator />

  <q-img :src="topicImage" style="height: 200px; width: 100%" />

  <q-card-section>
    <q-item
      style="
        border: 1px solid #242930;
        border-radius: 5px;
        box-shadow: 0 0 5px #606060;
        color: #fff;
        font-size: 12px;
      "
    >
      {{ mail.body }}
    </q-item>
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

  return require(`../../assets/img/${popupImage}.webp`);
});
</script>
