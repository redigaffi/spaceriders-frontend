<template>
  <q-dialog v-model="profileModal">
    <q-card flat class="justify-between">
      <div>
        <q-card-section class="text-h6 text-weight-bold">
          <div class="row justify-between">
            <div>PROFILE</div>
            <div>
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

        <q-separator dark />
      </div>

      <q-img src="~assets/img/cardpopup.webp" height="240px">
        <q-avatar
          color="secondary"
          class="absolute-center"
          size="240px"
          rounded
        >
          <object v-html="avatar" class="absolute-center" />
          <q-badge
            color="primary"
            class="absolute-top glossy justify-center no-border-radius q-py-sm"
          >
            Lvl {{ accountLevel }}
          </q-badge>

          <q-badge
            color="primary"
            class="absolute-bottom glossy justify-center no-border-radius q-py-sm"
          >
            {{ accountTitle }}
          </q-badge>
        </q-avatar>
      </q-img>

      <q-card-section class="q-px-none justify-between">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label><q-icon name="wallet" /> Address:</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label>{{ shortAddress }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label
                ><q-icon name="fas fa-user-astronaut" /> Faction:</q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <q-item-label>Free Worlds</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label><q-icon name="savings" /> Balance:</q-item-label>
            </q-item-section>

            <q-item-section side>
              <Balance />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label
                ><q-icon name="fas fa-solar-panel" /> Dominion:</q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <q-item-label
                >{{ dominionPercentage }}% of the galaxy</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label
                ><q-icon name="fas fa-certificate" /> Badges:</q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <q-item-label
                ><q-icon name="military_tech" /> Pioneer</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section class="q-gutter-y-sm">
        <q-btn
          v-if="getProvider === 'facewallet'"
          class="full-width"
          color="info"
          icon="fas fa-wallet"
          label="My Face Wallet"
          @click="openWallet"
        />
        <q-btn
          v-if="getProvider === 'facewallet'"
          class="full-width"
          color="info"
          icon="fas fa-wifi"
          label="Wallet Connect"
          @click="openWalletConnect"
        />
        <q-btn
          class="full-width"
          color="red"
          icon="logout"
          label="Log Out"
          @click="logout()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import jdenticon from "jdenticon/standalone";
import Balance from "../components/Balance.vue";
import { useRouter } from "vue-router";

const $store = useStore();
const router = useRouter();

const openWallet = async () => {
  await window.face.wallet.home();
};

const openWalletConnect = async () => {
  await window.face.wc.connectOpensea();
};

const getProvider = computed(() => {
  return $store.getters.provider;
});

const profileModal = computed({
  get: () => {
    return $store.getters.profileModal;
  },
  set: (value) => {
    $store.commit("setProfileModal", value);
  },
});

const shortAddress = computed(() => {
  const address = $store.getters.address;
  return address
    ? `${address.substring(0, 6)}...${address.substring(address.length - 6)}`
    : "";
});

const dominionPercentage = computed(() => {
  const planetsOwned = $store.getters.planets.length;

  return (planetsOwned * 100) / 1000;
});

const logout = () => {
  $store.commit("destroySession");
  router.push({
    name: "nouser",
  });
};

const accountLevel = computed(() => {
  return $store.getters.accountInfo.level;
});

const avatar = jdenticon.toSvg($store.getters.address, 200);

const accountTitle = computed(() => {
  const level = accountLevel.value;

  if (level <= 1) return "Human";
  else if (level <= 5) return "Amateur Astronaut";
  else if (level <= 10) return "Rookie Astronaut";
  else if (level <= 15) return "Professional Astronaut";
  else if (level <= 20) return "Planet Manager";
  else if (level <= 25) return "Planet Lord";
  else if (level <= 30) return "Space Explorer";
  else if (level <= 35) return "Space Traveller";
  else if (level <= 40) return "Space Conqueror";
  else if (level <= 45) return "Space Lord";
  else return "Space Rider";
});
</script>
