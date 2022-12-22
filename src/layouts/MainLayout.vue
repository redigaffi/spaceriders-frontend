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
                value_area: 1200,
              },
            },
            color: {
              value: '#ffffff',
            },
            shape: {
              type: 'star',
              stroke: {
                width: 0,
                color: '#000000',
              },
              polygon: {
                nb_sides: 4,
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
              speed: 0.1,
              direction: 'top',
              random: true,
              straight: true,
              out_mode: 'out',
              bounce: false,
            },
            array: [],
          },
          detectRetina: true,
        }"
      />

      <q-page class="container">
        <router-view />

        <q-page-sticky
          :style="
            !$store.getters.drawerLeft && !$store.getters.drawerRight
              ? 'z-index: 1'
              : ''
          "
          position="bottom-right"
          :offset="[24, 120]"
        >
          <q-btn
            :class="{ shake: buildingsInQueue.length }"
            size="sm"
            fab
            icon="handyman"
            color="info"
            @click="changeTabPanel('queue')"
          >
          </q-btn>

          <q-badge
            class="animation absolute-top-right"
            v-if="buildingsInQueue.length"
            color="negative"
            rounded
          />
        </q-page-sticky>

        <q-page-sticky
          :style="
            !$store.getters.drawerLeft && !$store.getters.drawerRight
              ? 'z-index: 1'
              : ''
          "
          position="bottom-right"
          :offset="[24, 48]"
        >
          <q-btn
            :class="{ shake: anyUnreadMessage }"
            size="sm"
            fab
            icon="mail"
            color="info"
            @click="changeTabPanel('inbox')"
          >
          </q-btn>

          <q-badge
            class="animation absolute-top-right"
            v-if="anyUnreadMessage"
            color="negative"
            rounded
          />
        </q-page-sticky>

        <q-drawer
          v-model="drawer"
          :width="$quasar.screen.lt.sm ? $quasar.screen.width : 400"
          :breakpoint="500"
          elevated
          overlay
          side="right"
          class="bg-dark-3"
        >
          <q-tab-panels
            v-model="tabPanel"
            class="full-height"
            :animated="false"
          >
            <q-tab-panel name="queue" class="q-pa-none">
              <q-card flat class="column full-height justify-between">
                <div>
                  <q-card-section class="text-h6 text-weight-bold">
                    <div class="row justify-between">
                      <div>QUEUE</div>
                      <div>
                        <q-btn
                          flat
                          round
                          size="sm"
                          color="white"
                          icon="close"
                          @click="drawer = !drawer"
                        />
                      </div>
                    </div>
                  </q-card-section>

                  <q-separator dark />
                </div>

                <q-scroll-area class="col full-height">
                  <building-queue />
                </q-scroll-area>

                <q-card-section class="q-pa-none">
                  <q-tabs
                    v-model="tabPanel"
                    dense
                    align="justify"
                    narrow-indicator
                  >
                    <q-tab name="queue" label="Queue" />
                    <q-tab name="inbox" label="Inbox" />
                  </q-tabs>
                </q-card-section>
              </q-card>
            </q-tab-panel>

            <q-tab-panel name="inbox" class="q-pa-none">
              <q-card class="column full-height justify-between" flat>
                <div>
                  <q-card-section class="text-h6 text-weight-bold">
                    <div class="row justify-between">
                      <div>INBOX</div>
                      <div>
                        <q-btn
                          flat
                          round
                          size="sm"
                          color="white"
                          icon="close"
                          @click="drawer = !drawer"
                        />
                      </div>
                    </div>
                  </q-card-section>

                  <q-separator dark />
                </div>

                <q-scroll-area class="col full-height">
                  <q-card-section class="q-px-none">
                    <q-list>
                      <q-item v-if="emails.length === 0">
                        <q-item-section class="text-center">
                          <q-item-label>There are no messages...</q-item-label>
                        </q-item-section>
                      </q-item>
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
                    </q-list>
                  </q-card-section>
                </q-scroll-area>

                <div>
                  <q-card-section>
                    <q-btn
                      class="full-width"
                      color="red"
                      icon-right="delete"
                      label="Delete All"
                      @click="deleteAllEmails"
                      :disabled="emails.length === 0"
                    />
                  </q-card-section>

                  <q-card-section class="q-pa-none">
                    <q-tabs
                      v-model="tabPanel"
                      dense
                      align="justify"
                      narrow-indicator
                    >
                      <q-tab name="queue" label="Queue" />
                      <q-tab name="inbox" label="Inbox" />
                    </q-tabs>
                  </q-card-section>
                </div>
              </q-card>
            </q-tab-panel>
          </q-tab-panels>
        </q-drawer>

        <q-dialog v-model="openInbox">
          <q-card dark class="full-width">
            <q-card-section class="row justify-between items-center">
              <q-item class="col-8">
                <q-item-section>
                  <q-item-label overline>{{ activeEmail.sender }}</q-item-label>
                  <q-item-label>{{ activeEmail.title }}</q-item-label>
                </q-item-section>
              </q-item>

              <div class="col-4 text-right">
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
            </q-card-section>

            <component :is="templateName" :body="body"></component>
          </q-card>
        </q-dialog>

        <Profile />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
// window.location.reload();
import { getCurrentInstance, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import Headerbar from "../components/HeaderBar.vue";
import ResourcesDisplay from "../components/ResourcesDisplay.vue";
import BuildingQueue from "../components/BuildingQueue.vue";
import AsteroidCollision from "../components/email_templates/AsteroidCollision.vue";
import SpacePirates from "../components/email_templates/SpacePirates.vue";
import Plain from "../components/email_templates/Plain.vue";
import PlanetList from "../components/PlanetList.vue";
import Profile from "../components/Profile.vue";
import ApiRequest from "../service/http/ApiRequests";
import {
  ACTIVE_PLANET_CHANGED,
  LOGGED_IN,
  UPDATED_ALL,
} from "../constants/Events";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";

const $store = useStore();
const router = useRouter();
const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

onMounted(() => {
  updateAccountInfo();

  $store.commit("setProfileModal", false);
  $store.commit("setDrawerLeft", false);
  $store.commit("setDrawerRight", false);
});

let totalMail = $store.getters.emails.length;
const mailSound = new Audio(require(`../assets/sound/notification.wav`));

const tabPanel = computed({
  get: () => {
    return $store.getters.tabPanel;
  },
  set: (value) => {
    $store.commit("setTabPanel", value);
  },
});

const drawer = computed({
  get: () => {
    return $store.getters.drawerRight;
  },
  set: (value) => {
    if (value) {
      $store.commit("setDrawerLeft", false);
    }
    $store.commit("setDrawerRight", value);
  },
});

const changeTabPanel = (tab) => {
  if (drawer.value && tabPanel.value === tab) {
    drawer.value = !drawer.value;
  } else {
    tabPanel.value = tab;

    if (!drawer.value) {
      drawer.value = !drawer.value;
    }
  }
};

const buildingsInQueue = computed(() => {
  return $store.getters.buildingQueue.items;
});

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
      return { body: activeEmail.value.body, topic: activeEmail.value.topic };
  }

  return "";
});

watchEffect(() => {
  if (emails.value.length > totalMail) {
    mailSound.play();
  }

  totalMail = emails.value.length;
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

async function updateAccountInfo() {
  ApiRequest.getAccountInfo($store.getters.address).then((response) => {
    $store.commit("setAccountInfo", response.data);
  });
}

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
  animation: scaleUp 1s infinite;
}

.shake {
  animation: shakeAnimation 2s ease infinite;
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

@keyframes shakeAnimation {
  0% {
    transform: rotateZ(-45deg);
  }
  25% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(45deg);
  }
  75% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-45deg);
  }
}
</style>
