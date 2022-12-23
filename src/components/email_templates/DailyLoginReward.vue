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
      <div v-if="body.day == 1">
        Thanks for being here. Just for logging in and being part of the community you just got:
        <br />
        <br />
        - {{ body.metal }} Metal <br />
        - {{ body.crystal }} Crystal <br />
        - {{ body.petrol }} Petrol <br />
        - {{ body.energy }} Energy <br />
        <br />
        Enjoy!
      </div>
      <div v-else>
        Thanks for logging in {{ body.day }} days consecutively! Just for that and being part of the community you got:

        <br />
        <br />
        - {{ body.metal }} Metal <br />
        - {{ body.crystal }} Crystal <br />
        - {{ body.petrol }} Petrol <br />
        - {{ body.energy }} Energy <br />
        <br />
        Enjoy!

      </div>
    </q-item>
  </q-card-section>
</template>
<script setup>
import { defineProps, reactive, toRefs, computed } from "vue";

const props = defineProps({ body: Object });
const { body } = toRefs(props);


const topicImage = computed(() => {
  let popupImage;

  switch (body.value.topic) {
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
