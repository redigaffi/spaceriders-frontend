<template>
  <q-media-player
    class="glossy glass-element bg-dark"
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

const musicPlayer = ref(null);
let sourceIndex = ref(0);

const sources = [
  {
    src: "https://opengameart.org/sites/default/files/through%20space.ogg",
    type: "audio/ogg",
  },
  {
    src: "https://opengameart.org/sites/default/files/Space%20Sprinkles_0.mp3",
    type: "audio/mp3",
  },
  {
    src: "https://opengameart.org/sites/default/files/terradorian%27s%20theme%20song.mp3",
    type: "audio/mp3",
  },
];

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
