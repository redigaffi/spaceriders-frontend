<template>
  <div class="container">
    <div class="row justify-evenly items-center q-col-gutter-sm q-my-sm">
      <div class="col-12 col-sm-6 row justify-center">
        <q-btn
          class="col-2 col-sm-1"
          color="info"
          icon="fas fa-minus"
          style="border-top-right-radius: 0; border-bottom-right-radius: 0"
          @click="prevGalaxySector"
        />
        <q-input
          :model-value="galaxy"
          filled
          dense
          autofocus
          stack-label
          square
          type="number"
          color="info"
          label="Galaxy sector"
          class="col-8"
          min="0"
          @change="(value) => galaxyChange(value)"
        />
        <q-btn
          class="col-2 col-sm-1"
          color="info"
          icon="fas fa-plus"
          style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          @click="nextGalaxySector"
        />
      </div>

      <div class="col-12 col-sm-6 row justify-center">
        <q-btn
          class="col-2 col-sm-1"
          color="info"
          icon="fas fa-minus"
          style="border-top-right-radius: 0; border-bottom-right-radius: 0"
          @click="prevSolarSystem"
        />
        <q-input
          :model-value="solarSystemRange"
          filled
          dense
          autofocus
          stack-label
          square
          type="text"
          color="info"
          label="From - To Solar System"
          readonly
          class="col-8"
        />
        <q-btn
          class="col-2 col-sm-1"
          color="info"
          icon="fas fa-plus"
          style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          @click="nextSolarSystem"
        />
      </div>
    </div>
  </div>

  <div v-if="loaded" class="container q-mt-md">
    <div
      v-for="(_, a) in 7"
      :key="`${galaxy}-${fromSolarSystem}-${toSolarSystem}-${a}-${b}`"
    >
      <div class="text-h6">Solar System #{{ a + fromSolarSystem }}</div>
      <div class="row q-mb-md">
        <div
          class="col-4 col-sm-3 col-md-2 box text-center"
          :class="{ has_planet: loaded && planetsByPosition[a][b].id }"
          v-for="(_, b) in 12"
          :key="`${galaxy}-${fromSolarSystem}-${toSolarSystem}-${a}-${b}`"
        >
          <div
            class="glossy glass-element absolute-top text-center no-border-radius ellipsis text-caption"
            style="padding: 5px 0"
          >
            {{
              !planetsByPosition[a][b].id
                ? "Free spot"
                : planetsByPosition[a][b].name
            }}
          </div>

          <q-img
            v-if="planetsByPosition[a][b].id"
            :src="planetsByPosition[a][b].image_url"
            @click="
              openPlanetInfoCall(
                planetsByPosition[a][b].solar_system,
                planetsByPosition[a][b].position
              )
            "
            style="width: 100%; height: 160px; object-fit: fill"
            :style="{
              background: `linear-gradient(to top, ${
                getPaletteColor(colorMapping[planetsByPosition[a][b].rarity]) +
                '80'
              } 20% , ${getCssVar('dark') + 'bf'} 80%)`,
            }"
          />

          <div v-else class="bg-dark" style="height: 160px"></div>

          <div
            class="glossy glass-element absolute-bottom text-center no-border-radius ellipsis text-caption"
            style="padding: 5px 0"
          >
            ({{ planetsByPosition[a][b].galaxy }}:{{
              planetsByPosition[a][b].solar_system
            }}:{{ b + 1 }})
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="openPlanetInfo">
    <q-card class="full-width">
      <q-card-section class="row justify-between">
        <div class="text-h6">Planet info</div>
        <q-btn
          flat
          round
          size="sm"
          color="white"
          icon="close"
          @click="
            openPlanetInfo = false;
            selectedPlanetInfo = false;
          "
        />
      </q-card-section>

      <q-separator />

      <q-img
        :src="selectedPlanetInfo.image_url_bg"
        style="height: 200px; width: 100%"
      />

      <q-card-section class="q-px-none">
        <q-list dense>
          <q-item>
            <q-item-section>
              <q-item-label> Name: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label>
                {{ selectedPlanetInfo.name }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Level: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label>
                {{ selectedPlanetInfo.level }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Rarity: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label
                :class="`text-${colorMapping[selectedPlanetInfo.rarity]}`"
              >
                {{ selectedPlanetInfo.rarity }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Type: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label>
                {{ selectedPlanetInfo.type }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Position: </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label>
                [{{ selectedPlanetInfo.galaxy }}:{{
                  selectedPlanetInfo.solar_system
                }}:{{ selectedPlanetInfo.position }}]
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          icon="fas fa-copy"
          color="info"
          label="Copy planet permalink"
          @click="copyPlanetUrlClipBoard"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  watchEffect,
  getCurrentInstance,
} from "vue";
import ApiRequests from "../service/http/ApiRequests";
import { useQuasar, colors, getCssVar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { colorMapping } from "../constants/Shared";

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const $quasar = useQuasar();
const $route = useRoute();
const $router = useRouter();
const { getPaletteColor } = colors;

const openPlanetInfo = ref(false);

const galaxy = ref(0);
const fromSolarSystem = ref(0);
const toSolarSystem = ref(7);
const solarSystemRange = ref("0 - 6");

//@TODO: This sucks.
let planetsByPosition = ref([
  [
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
  ],
  [
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
  ],
  [
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
  ],
  [
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
  ],
  [
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
  ],
  [
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
  ],
  [
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
    { id: false },
  ],
]);

const loaded = ref(false);
onBeforeMount(async () => {
  loaded.value = false;
  $quasar.loading.show();

  if ($route.name === "explorer-exact-position") {
    const g = parseInt($route.params.galaxy);
    const s = parseInt($route.params.solarSystem);

    if (g > 0 && g <= 100) galaxy.value = g;
    else galaxy.value = 0;

    if (s > 0 && s <= 93) fromSolarSystem.value = s;
    else fromSolarSystem.value = 0;

    toSolarSystem.value = fromSolarSystem.value + 7;
  }

  // Dont call api if cascade updating models is still going on
  if (Math.abs(toSolarSystem.value - fromSolarSystem.value) !== 7) {
    $quasar.loading.hide();
    return;
  }

  const req = {
    galaxy: galaxy.value,
    fromSolarSystem: fromSolarSystem.value,
    toSolarSystem: toSolarSystem.value,
  };

  loaded.value = false;

  const data = await ApiRequests.getPlanetsByPositionRange(req);
  planetsByPosition.value = data.data.planets;

  loaded.value = true;

  if ($route.name === "explorer-exact-position") {
    let pos = parseInt($route.params.position);
    if (pos >= 1 && pos <= 12) {
      openPlanetInfoCall(fromSolarSystem.value, pos);
    } else {
      alert("Wrong planet position");
    }
  }

  $quasar.loading.hide();
});

watchEffect(async () => {
  loaded.value = false;
  $quasar.loading.show();

  // Dont call api if cascade updating models is still going on
  if (Math.abs(toSolarSystem.value - fromSolarSystem.value) !== 7) {
    $quasar.loading.hide();
    return;
  }

  const req = {
    galaxy: galaxy.value,
    fromSolarSystem: fromSolarSystem.value,
    toSolarSystem: toSolarSystem.value,
  };

  loaded.value = false;
  const data = await ApiRequests.getPlanetsByPositionRange(req);
  planetsByPosition.value = data.data.planets;
  loaded.value = true;

  $quasar.loading.hide();
});

function galaxyChange(value) {
  if (value >= 0) galaxy.value = value;
}

function fromChange() {
  if (fromSolarSystem.value < 0) {
    fromSolarSystem.value = 0;
    return;
  }

  if (fromSolarSystem.value >= 93) {
    fromSolarSystem.value = 93;
    toSolarSystem.value = 100;
    return;
  }

  toSolarSystem.value = fromSolarSystem.value + 7;
}

function toChange() {
  if (toSolarSystem.value < 7) {
    toSolarSystem.value = 7;
    return;
  }

  if (toSolarSystem.value >= 100) {
    toSolarSystem.value = 100;
    fromSolarSystem.value = 93;
    return;
  }

  fromSolarSystem.value = toSolarSystem.value - 7;
}

function prevGalaxySector() {
  if (galaxy.value > 0) galaxy.value--;
}

function nextGalaxySector() {
  galaxy.value++;
}

function prevSolarSystem() {
  if (toSolarSystem.value > 7) {
    if (fromSolarSystem.value - 7 < 0) {
      fromSolarSystem.value = 0;
      toSolarSystem.value = 7;
    } else {
      fromSolarSystem.value -= 7;
      toSolarSystem.value -= 7;
    }
    rangeChange();
  }
}

function nextSolarSystem() {
  if (toSolarSystem.value < 100) {
    if (toSolarSystem.value + 7 > 100) {
      fromSolarSystem.value = 93;
      toSolarSystem.value = 100;
    } else {
      fromSolarSystem.value += 7;
      toSolarSystem.value += 7;
    }
    rangeChange();
  }
}

function rangeChange() {
  solarSystemRange.value = `${fromSolarSystem.value} - ${
    toSolarSystem.value - 1
  }`;
}

function sendPlanetEmail() {
  alert("Not yet implemented");
}

function rightPage() {
  fromSolarSystem.value += 7;
  toSolarSystem.value += 7;
}

function leftPage() {
  fromSolarSystem.value -= 7;
  toSolarSystem.value -= 7;

  if (fromSolarSystem.value < 0) {
    fromSolarSystem.value = 0;
    toSolarSystem.value = 7;
  }
}

function upPage() {
  galaxy.value += 1;
}

function downPage() {
  galaxy.value -= 1;
}

const selectedPlanetInfo = ref(false);
function openPlanetInfoCall(solarSystem, position) {
  if (loaded.value) {
    openPlanetInfo.value = true;

    let planetByPosition = {
      id: false,
    };

    for (let i = 0; i < 7; i++) {
      const solarSystemPlanets = planetsByPosition.value[i];
      const re = solarSystemPlanets.filter(
        (p) =>
          p.galaxy == galaxy.value &&
          p.solar_system == solarSystem &&
          p.position == position
      );
      if (re.length > 0) {
        planetByPosition = re[0];
      }
    }

    if (!planetByPosition.id) {
      return;
    }

    selectedPlanetInfo.value = planetByPosition;
  }
}

function copyPlanetUrlClipBoard() {
  const sp = selectedPlanetInfo.value;

  let basePath = `${window.location.origin}/explorer`;
  let fullPath = `${basePath}/${sp.galaxy}/${sp.solar_system}/${sp.position}`;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(fullPath);
  } else {
    let textArea = document.createElement("textarea");
    textArea.value = fullPath;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    new Promise((res, rej) => {
      // here the magic happens
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }

  $quasar.notify($notification("success", "Copied to clipboard"));
}
</script>

<style lang="scss">
.box {
  box-shadow: 0 0 4px #303030;
}

.has_planet {
  transition: 0.25s;
  cursor: pointer;
}

.has_planet:hover {
  box-shadow: 0 0 24px #2253f4;

  img {
    filter: brightness(1.5);
  }
}
</style>
