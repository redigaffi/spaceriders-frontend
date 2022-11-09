<template>
  <q-layout view="lHh Lpr lFf">
    <headerbar />
    <q-page-container id="main">
      <Particles
        id="particles-js"
        class="particles-bg"
        :options="{
          fpsLimit: 60,
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: false,
                mode: 'repulse',
              },
              resize: true,
            },
          },
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            color: {
              value: '#ffffff',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
              image: {
                src: '',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 1,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 20,
                size_min: 0,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 3,
              direction: 'bottom',
              random: false,
              straight: true,
              out_mode: 'out',
              bounce: false,
            },
            array: [],
          },
          detectRetina: true,
        }"
      />

      <ResourcesDisplay />
      <q-page class="container">
        <div class="row">
          <!-- Router page Content -->
          <div class="col q-py-lg">
            <router-view />
          </div>

          <PlanetList />
        </div>

        <div class="row q-col-gutter-md">
          <BuildingQueue
            class="col-xs-12 col-sm-6 col-md-4"
            />
        </div>

        <q-page-sticky
          :class="!openInboxModel ? 'z-top' : ''"
          position="bottom-right"
          :offset="[24, 24]"
        >
          <q-btn
            size="sm"
            fab
            icon="mail"
            color="primary"
            @click="openInboxModel = !openInboxModel"
          >
            <q-badge
              class="animation absolute-top-right"
              v-if="anyUnreadMessage"
              color="info"
              rounded
            />
          </q-btn>
        </q-page-sticky>

        <q-drawer
          v-model="openInboxModel"
          :width="400"
          :breakpoint="500"
          overlay
          side="right"
          class="bg-dark-3"
        >
          <q-card>
            <q-card-section class="text-h6 text-weight-bold">
              <div class="row justify-between">
                <div>NOTIFICATIONS</div>
                <div>
                  <q-btn
                    flat
                    round
                    size="sm"
                    color="white"
                    icon="close"
                    @click="openInboxModel = !openInboxModel"
                  />
                </div>
              </div>
            </q-card-section>
            <q-card-section class="q-pa-none">
              <div class="text-h6 q-pa-sm">
                <!--<q-input
                  dark
                  dense
                  standout
                  v-model="text"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon v-if="text === ''" name="search" />
                    <q-icon
                      v-else
                      name="clear"
                      class="cursor-pointer"
                      @click="text = ''"
                    />
                  </template>
                </q-input>-->
              </div>
            </q-card-section>

            <q-card-section class="q-px-none">
              <q-list>
                <q-scroll-area style="height: 70vh">
                  <q-item
                    clickable
                    v-ripple
                    v-for="email in emails"
                    :key="email.id"
                    class="q-mb-xs"
                    :class="{ unread_msg: !email.read }"
                  >
                    <q-item-section @click="openEmail(email)">
                      <q-item-label>{{ email.title }}</q-item-label>
                      <q-item-label caption lines="2">{{
                        email.subTitle
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-btn
                        @click="deleteEmail(email)"
                        round
                        flat
                        size="sm"
                        color="red"
                        icon="delete"
                      >
                        <q-tooltip> Delete Message </q-tooltip>
                      </q-btn>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset />
                </q-scroll-area>
              </q-list>
            </q-card-section>
          </q-card>
          <div class="q-pa-md">
            <q-btn
              class="full-width"
              color="red"
              icon-right="delete"
              label="Delete All"
              @click="deleteAllEmails"
              :disabled="emails.length === 0"
            />
          </div>
        </q-drawer>

        <q-dialog v-model="openInbox">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section class="b">
              <div class="row justify-between">
                <div>
                  <span class="text-subtitle1 text-weight-bold"
                    >{{ activeEmail.sender }} |
                  </span>
                  {{ activeEmail.title }}
                </div>
                <div>
                  <q-btn
                    flat
                    round
                    size="sm"
                    color="red"
                    icon="delete"
                    v-close-popup
                    @click="deleteEmail(activeEmail)"
                    class="q-mr-md"
                  />
                  <q-btn
                    flat
                    round
                    size="sm"
                    color="white"
                    icon="close"
                    v-close-popup
                  />
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <component :is="templateName" :body="body"></component>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
// window.location.reload();
import { getCurrentInstance, ref, computed } from "vue";
import { useStore } from "vuex";
import Headerbar from "../components/HeaderBar.vue";
import ResourcesDisplay from "../components/ResourcesDisplay.vue";
import BuildingQueue from "../components/BuildingQueue.vue";
import AsteroidCollision from "../components/email_templates/AsteroidCollision.vue";
import SpacePirates from "../components/email_templates/SpacePirates.vue";
import Plain from "../components/email_templates/Plain.vue";
import PlanetList from "../components/PlanetList.vue";
import ApiRequest from "../service/http/ApiRequests";
import {
  ACTIVE_PLANET_CHANGED,
  LOGGED_IN,
  UPDATED_ALL,
} from "../constants/Events";
import { useQuasar } from "quasar";

const $store = useStore();
const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const anyUnreadMessage = computed(() => {
  const emails = $store.getters.emails;

  for (let id in emails) {
    if (!emails[id].read) return true;
  }

  return false;
});

const emails = computed(() => {
  return $store.getters.emails;
});

const openInbox = ref(false);
const activeEmail = ref({});

const templateName = computed(() => {
  if (!activeEmail.value.template) return;

  switch (activeEmail.value.template) {
    case "asteroid_collision":
      return AsteroidCollision;
    case "space_pirates":
      return SpacePirates;
    case "plain":
      return Plain;
  }

  return "";
});

const body = computed(() => {
  if (!activeEmail.value.template) return;

  switch (activeEmail.value.template) {
    case "asteroid_collision":
      return JSON.parse(activeEmail.value.body);
    case "space_pirates":
      return JSON.parse(activeEmail.value.body);
    case "plain":
      return activeEmail.value.body;
  }

  return "";
});

function openEmail(email) {
  const newEmail = { ...email };
  if (!email.read) {
    ApiRequest.markEmailRead($store.getters.activePlanet.id, email.id);
    newEmail.read = true;
    $store.commit("updateEmail", { email: newEmail });
  }

  openInbox.value = true;
  activeEmail.value = newEmail;
}

function deleteEmail(email) {
  $store.commit("deleteEmail", { email: email });
  ApiRequest.deleteEmail($store.getters.activePlanet.id, email.id);
}

function deleteAllEmails() {
  $store.commit("deleteAllEmails");
  ApiRequest.deleteAllEmails($store.getters.activePlanet.id);
}

const openInboxModel = ref(false);

// Main app features
const $quasar = useQuasar();

$eventBus.on(ACTIVE_PLANET_CHANGED, async () => {
  $quasar.loading.show();
  await updateAll();
  await updateInterval();
  $quasar.loading.hide();
});

$eventBus.on(LOGGED_IN, async () => {
  await updateAll();
  await updateInterval();
});

async function update(activePlanet) {
  ApiRequest.tokenPrice().then((tokenPrice) => {
    $store.commit("setTokenPrice", { tokenPrice: tokenPrice });
  });

  const allPlanetInfoReq = await ApiRequest.getAllInfoPlanet(activePlanet.id);
  const allPlanetInfo = allPlanetInfoReq.data;

  $store.commit("setActivePlanet", allPlanetInfo.planet);
  $store.commit("setResourceData", allPlanetInfo.resources);
  $store.commit("setInstallationData", allPlanetInfo.installation);
  $store.commit("setResearchData", allPlanetInfo.research);
  $store.commit("setDefenseData", allPlanetInfo.defense);
  $store.commit("setBuildingQueue", allPlanetInfo.building_queue);

  $store.commit("addEmails", { emails: allPlanetInfo.emails });
}

async function updateAll() {
  if (!$store.getters.loggedIn) return;

  let activePlanetId = false;
  if ($store.getters.activePlanet) {
    activePlanetId = $store.getters.activePlanet.id;
  }

  const planets = await ApiRequest.getAllPlanets();
  $store.commit("setPlanets", planets);

  let activePlanet = false;
  if (activePlanetId !== false) {
    activePlanet = planets.filter((o) => o.id === activePlanetId)[0];
  } else if (!activePlanetId && planets.length > 0) {
    let activePlanets = planets.filter((o) => o.claimed);
    if (activePlanets.length > 0) {
      activePlanet = activePlanets[0];
    }
  }

  if (activePlanet !== false) {
    $store.commit("setActivePlanet", activePlanet);
    update(activePlanet);
  }

  $eventBus.emit(UPDATED_ALL);
}

async function updateInterval() {
  if (!$store.getters.loggedIn) return;

  if ($store.getters.updateIntervalId !== false) {
    clearInterval($store.getters.updateIntervalId);
  }

  if ($store.getters.activePlanet) {
    const timerId = setInterval(async () => {
      update($store.getters.activePlanet);
    }, 60000);

    $store.commit("setUpdateIntervalId", { updateIntervalId: timerId });
  }
}

async function init() {
  if ($store.getters.loggedIn) {
    $quasar.loading.show();
    // On page refresh reset all.
    await updateAll();
    // Start timer
    await updateInterval();
    $quasar.loading.hide();
  }
}

init();
</script>

<style>
/*
https://codepen.io/mattmarble/pen/qBdamQz
*/
:root {
  font-size: 14px;
}
#main {
  height: 100%;
  background: radial-gradient(ellipse at bottom, #0b131d 0%, #000000 100%);
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-size: 14px;
  /* font-family: 'Orbitron', sans-serif; */
  font-family: bodyFont;
}

.unread_msg {
  border-left: 4px solid #2253f4;
}
.animation {
  animation: scaleUp 2s ease infinite;
}
@keyframes scaleUp {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}
</style>
