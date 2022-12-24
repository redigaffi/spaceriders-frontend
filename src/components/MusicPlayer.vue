<template>
  <q-media-player
    class="bg-dark container"
    ref="musicPlayer"
    type="audio"
    :volume="volumeSetting"
    :autoplay="autoplayMusic"
    :sources="audio"
    @volume="(volume) => (volumeSetting = volume)"
    @ended="onEnded"
    dense
  />
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { QMediaPlayer } from "@quasar/quasar-ui-qmediaplayer";
import "@quasar/quasar-ui-qmediaplayer/src/index.sass";

const $store = useStore();

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

const autoplayMusic = computed(() => {
  return $store.getters.autoplayMusic;
});

const sources = playlist
  .map((track) =>
    Object({
      src: `${resourcePath}/${track}.aac`,
      type: "audio/aac",
    })
  )
  .sort(() => Math.random() - 0.5);

let audio = ref(sources);

const volumeSetting = computed({
  get: () => {
    return $store.getters.musicVolume;
  },
  set: (volume) => {
    $store.commit("setMusicVolume", volume);
  },
});

const onEnded = () => {
  if (sourceIndex.value === sources.length - 1) {
    sourceIndex.value = 0;
  } else {
    sourceIndex.value++;
  }

  audio.value = sources.slice(sourceIndex.value);
};
</script>
