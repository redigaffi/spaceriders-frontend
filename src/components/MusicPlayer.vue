<template>
  <q-media-player
    class="bg-dark container"
    ref="musicPlayer"
    type="audio"
    :sources="audio"
    @ended="onEnded"
    dense
  />
</template>

<script setup>
import { ref } from "vue";
import { QMediaPlayer } from "@quasar/quasar-ui-qmediaplayer";
import "@quasar/quasar-ui-qmediaplayer/src/index.sass";

const resourcePath = "https://spaceriders-audio.s3.eu-west-1.amazonaws.com";
const playlist = [
  "a_new_beginning",
  "blind_shift",
  "dark_chillout",
  "dark_decay",
  "dark_fallout",
  "empy_space",
  "exodus",
  "great_mission",
  "lost_signal",
  "please_answer_me",
  "space_emergency",
  "terradorian",
  "through_space",
  "twists",
];
const musicPlayer = ref(null);
let sourceIndex = ref(0);

const sources = playlist.map((track) =>
  Object({
    src: `${resourcePath}/${track}.aac`,
    type: "audio/aac",
  })
);

let audio = ref(sources);

const onEnded = () => {
  if (sourceIndex.value === sources.length - 1) {
    sourceIndex.value = 0;
  } else {
    sourceIndex.value++;
  }

  audio.value = sources.slice(sourceIndex.value);

  setTimeout(() => {
    musicPlayer.value.play();
  }, 2500);
};
</script>
