<template>

  <div style="margin-top: -10px; width: 700px; height: 50px;">
    <q-input 
      v-model.number="galaxy"
      outlined
      dense
      autofocus
      stack-label
      type="number"
      color="warning"
      width="50px"
      label="Galaxy"
      style="float: left; width: 90px;"
      @change="galaxyChange"
    />

    <q-input 
      v-model.number="fromSolarSystem"
      outlined
      dense
      autofocus
      stack-label
      type="number"
      color="warning"
      width="100px"
      label="From Solar System"
      style="float: left; margin-left: 20px; width: 190px;"
      :step="7"
      @change="fromChange"
    />

    <q-input 
      v-model.number="toSolarSystem"
      outlined
      dense
      autofocus
      stack-label
      type="number"
      color="warning"
      width="50px"
      label="To Solar System"
      style="float: left; margin-left: 20px; width: 170px;"
      :step="7"
      @change="toChange" 
    />
  </div>

  <div style="margin-bottom: 25px">
    <q-page-sticky v-if="toSolarSystem<100 " style="z-index: 1;" position="right" :offset="[18, 0]">
      <q-btn @click="rightPage" round color="accent" icon="arrow_upward" class="rotate-90" />
    </q-page-sticky>
    
    <q-page-sticky v-if="galaxy<100" style="z-index: 1;" position="top" :offset="[0, 18]">
      <q-btn @click="upPage" round color="accent" icon="arrow_back" class="rotate-90" />
    </q-page-sticky>

    <q-page-sticky v-if="fromSolarSystem>0 " style="z-index: 1;" position="left" :offset="[18, 0]">
      <q-btn @click="leftPage" round color="accent" icon="arrow_back" />
    </q-page-sticky>

    <q-page-sticky v-if="galaxy>0"  style="z-index: 1;" position="bottom" :offset="[0, 18]">
      <q-btn @click="downPage" round color="accent" icon="arrow_forward" class="rotate-90" />
    </q-page-sticky>

    <q-drawer v-model="openPlanetInfo" :width="400" :breakpoint="500" overlay side="right" class="bg-dark-3">
      <q-card>
        <img :src="selectedPlanetInfo.image_url_bg" style="height: 240px; width: 100%; z-index: 2" />

        <q-btn flat round size="sm" color="red" icon="close"
          @click="openPlanetInfo = false; selectedPlanetInfo = false">
          <q-tooltip>
            Close planet information
          </q-tooltip>
        </q-btn>
        <q-btn flat round size="sm" color="red" icon="email" @click="sendPlanetEmail">
          <q-tooltip>
            Send email to planet
          </q-tooltip>
        </q-btn>

        <q-btn flat round size="sm" color="red" icon="share" @click="copyPlanetUrlClipBoard">
          <q-tooltip>
            Copy planet permalink
          </q-tooltip>
        </q-btn>

        <q-card-section class="q-pa-sm q-mt-sm">
          <div class="text-h9">
            <q-item-label>Name</q-item-label>
            <q-item-label caption style="color: white;">
              {{ selectedPlanetInfo.name }}
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-sm q-mt-sm">
          <div class="text-h9">
            <q-item-label>Position</q-item-label>
            <q-item-label caption style="color: white;">
              [{{ selectedPlanetInfo.galaxy }}:{{ selectedPlanetInfo.solar_system }}:{{ selectedPlanetInfo.position }}]
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-sm q-mt-sm">
          <div class="text-h9">
            <q-item-label>Rarity</q-item-label>
            <q-item-label caption style="color: white;">
              {{ selectedPlanetInfo.rarity }}
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-sm q-mt-sm">
          <div class="text-h9">
            <q-item-label>Level</q-item-label>
            <q-item-label caption style="color: white;">
              {{ selectedPlanetInfo.level }}
            </q-item-label>
          </div>
        </q-card-section>

      </q-card>
    </q-drawer>
  </div>

  <div v-if="loaded">
    <div v-for="(_, a) in 7" :key="`${galaxy}-${fromSolarSystem}-${toSolarSystem}-${a}-${b}`" class="row">
      <div v-for="(_, b) in 12" :key="`${galaxy}-${fromSolarSystem}-${toSolarSystem}-${a}-${b}`" class="col-1 box" :class="{
        'no_planet': loaded && !planetsByPosition[a][b].id,
        'has_planet': loaded && planetsByPosition[a][b].id,
      }">
        <div v-if="!planetsByPosition[a][b].id">
          ({{ planetsByPosition[a][b].galaxy }}:{{ planetsByPosition[a][b].solar_system
          }}:{{ planetsByPosition[a][b].position+1 }})
          <q-tooltip anchor="center right" self="center left">
            Free spot
          </q-tooltip>
        </div>

        <div @click="openPlanetInfoCall(planetsByPosition[a][b].solar_system, planetsByPosition[a][b].position)" v-else>

          <img :src="planetsByPosition[a][b].image_url" />

          <q-tooltip anchor="center right" self="center left">
            Position: ({{ planetsByPosition[a][b].galaxy }}:{{ planetsByPosition[a][b].solar_system
            }}:{{ planetsByPosition[a][b].position }})
          </q-tooltip>
        </div>

      </div>
    </div>
  </div> 
</template>

<script setup>
import { ref, onBeforeMount, onMounted, watchEffect } from "vue";
import ApiRequests from "../service/http/ApiRequests";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";


const $quasar = useQuasar();
const $route = useRoute();
const $router = useRouter();

const openPlanetInfo = ref(false)

const galaxy = ref(0)
const fromSolarSystem = ref(0)
const toSolarSystem = ref(7)

let planetsByPosition = ref([
  [
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
  ],
  [
        {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
  ],
  [
        {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
  ],
  [
        {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
  ],
  [
        {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
  ],
  [
        {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
  ],
  [
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
    {id: false},
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
    else fromSolarSystem.value = 0
    
    toSolarSystem.value = fromSolarSystem.value+7;
  }

  // Dont call api if cascade updating models is still going on
  if (Math.abs(toSolarSystem.value - fromSolarSystem.value) !== 7) {
    $quasar.loading.hide();
    return;
  }

  const req = {
    galaxy: galaxy.value,
    fromSolarSystem: fromSolarSystem.value,
    toSolarSystem: toSolarSystem.value
  }

  loaded.value = false;

  const data = await ApiRequests.getPlanetsByPositionRange(req);
  planetsByPosition.value = data.data.planets;
  
  loaded.value = true;
  
  if ($route.name === "explorer-exact-position") {
    let pos = parseInt($route.params.position)
    if (pos >= 1 && pos <= 12 ) {
      openPlanetInfoCall(fromSolarSystem.value, pos);
    } else {
      alert("Wrong planet position")
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
    toSolarSystem: toSolarSystem.value
  }

  loaded.value = false;
  const data = await ApiRequests.getPlanetsByPositionRange(req);
  planetsByPosition.value = data.data.planets;
  loaded.value = true;

  $quasar.loading.hide();

});

function galaxyChange() {
  if (galaxy.value < 0) {
    galaxy.value = 0;
  }
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
    fromSolarSystem.value = 0
    toSolarSystem.value = 7;
  }
}

function upPage() {
  galaxy.value += 1;
}

function downPage() {
  galaxy.value -= 1;
}

const selectedPlanetInfo = ref(false)
function openPlanetInfoCall(solarSystem, position) {
  if (loaded.value) {
    openPlanetInfo.value = true;
    
    let planetByPosition = {
      id: false
    }

    for (let i = 0; i < 7; i++) {
      const solarSystemPlanets = planetsByPosition.value[i];
      const re = solarSystemPlanets.filter(
        p => 
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
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
    });
  }

  alert("Copied to clipboard");
}
</script>


<style lang="scss">
.box {
  float: left;
  height: 100px !important;
  line-height: 100px;
  box-shadow: 0 0 4px #303030;
  text-align: center;
  z-index: 0;
}

.has_planet {
  transition: 0.5s;
}

.has_planet:hover {
  transform: scale(1.1);
  box-shadow: 0 0 5px #5c5c5c;
}

.box img {
  width: 100%;
  height: 95px;
}
</style>
