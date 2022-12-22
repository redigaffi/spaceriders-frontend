<template>
  <q-card dark class="q-my-md">
    <q-item>
      <q-item-section class="text-center text-h6">
        <q-item-label>Leaderboard</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section class="q-px-none">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="white"
        indicator-color="info"
        align="center"
        narrow-indicator
      >
        <q-tab name="users" icon="fas fa-user" label="Players" />
        <q-tab name="planets" icon="fas fa-globe" label="Planets" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="users">
          <LeaderboardUsers :rows="rowsForUsers" :columns="columnsForUsers" />
        </q-tab-panel>

        <q-tab-panel name="planets">
          <LeaderboardPlanets
            :rows="rowsForPlanets"
            :columns="columnsForPlanets"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import ApiRequests from "src/service/http/ApiRequests";
import { onMounted } from "vue";
import LeaderboardUsers from "src/components/LeaderboardUsers.vue";
import LeaderboardPlanets from "src/components/LeaderboardPlanets.vue";

const tab = ref("users");

const columnsForUsers = [
  {
    name: "index",
    label: "#",
    field: "index",
  },
  { name: "wallet", label: "Wallet", field: "wallet" },
  { name: "username", label: "Username", field: "username" },
  { name: "experience", label: "Experience", field: "experience" },
  {
    name: "experience_needed",
    label: "Experience needed",
    field: "experience_needed",
  },
  { name: "level", label: "Level", field: "level" },
  { name: "faction", label: "Faction", field: "faction" },
  { name: "dominion", label: "Dominion", field: "dominion" },
  { name: "badges", label: "Badges", field: "badges" },
];

const columnsForPlanets = [
  { name: "planet_name", label: "Planet name", field: "planet_name" },
  { name: "experience", label: "Experience", field: "experience" },
  {
    name: "experience_needed",
    label: "Experience needed",
    field: "experience_needed",
  },
  { name: "image_url_bg", label: "Image", field: "image_url_bg" },
  { name: "level", label: "Level", field: "level" },
];

const rowsForUsers = ref([]);
const rowsForPlanets = ref([]);

onMounted(async () => {
  rowsForUsers.value = await ApiRequests.getLeaderboardUsers(0, 100);
  rowsForPlanets.value = await ApiRequests.getLeaderboardPlanets(0, 100);
});
</script>
