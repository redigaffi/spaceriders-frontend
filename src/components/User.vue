<template>
  <!-- <q-btn @click="login" color="blue-7" :label="logInButtonText" /> -->
  <div>
    <div class="row">
      <div class>
        <q-btn
          rounded
          v-if="!error"
          :label="logInButtonText"
          class="glossy q-mr-sm"
          color="primary"
          icon="person"
          @click="login"
        />
        <q-btn
          v-else
          label="Incorrect Network"
          color="negative"
          class="btn-glow-element"
          icon="bolt"
          @click="login"
        />
      </div>

      <div :class="tier != 'TIER 0' ? 'glitch' : 'boring'" :data-text="tier">
        {{ tier }}
      </div>
    </div>

    <q-dialog v-model="userInfoPopup">
      <q-card>
        <q-card-section>
          <div class="text-h6">Information</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-btn :label="address" color="blue-7">
            <q-tooltip>Authenticated wallet</q-tooltip>
          </q-btn>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Logout" @click="logout" color="blue-7" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import ApiRequest from "../service/http/ApiRequests";
import { ethers } from "ethers";
import { LOGGED_IN } from "../constants/Events";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, computed, onBeforeMount, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router'


const $store = useStore();
const $quasar = useQuasar();
const $eventBus = getCurrentInstance().appContext.config.globalProperties.$eventBus;

//boot order??? const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const userInfoPopup = ref(false);
const error = ref(false);
const router = useRouter();

onBeforeMount(async () => {
  if (chainData.value !== false) {
    window.ethereum.on("networkChanged", async (networkId) => {
      const chain = await checkChain();
      if (!chain) {
        error.value = true;
        $store.commit("destroySession");
      } else {
        error.value = false;
      }
    });

    window.ethereum.on("accountsChanged", async (accounts) => {
      $store.commit("destroySession");
    });

    const chain = await checkChain();

    if (!chain) {
      error.value = true;
      $store.commit("destroySession");
    } else {
      error.value = false;
    }
  }
});

const logout = () => {
  $store.commit("destroySession");
  router.push({
    name: 'nouser'
  });
};

const checkChain = async () => {
  if (window.ethereum) {
    const chainId = chainData.value.chain_id;
    const rpcUrl = chainData.value.rpc;
    const chainName = chainData.value.chain_name;

    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }], // chainId must be in hexadecimal numbers
      });

      return true;
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainId,
                chainName: chainName,
                rpcUrls: [rpcUrl],
              },
            ],
          });

          return true;
        } catch (addError) {
          return false;
        }
      }
      return false;
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
    return false;
  }
};

const login = async (e) => {
  if (loggedIn.value) {
    userInfoPopup.value = true;
    return;
  }

  $quasar.loading.show();

  const chain = await checkChain();
  if (!chain) {
    error.value = true;
    $store.commit("destroySession");
    $quasar.loading.hide();
    $notification("failed", "Checking metamask chain failed...", 6000);
    return;
  }

  error.value = false;

  let re = false;
  let address = false;

  try {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    address = await signer.getAddress();
    const signature = await signer.signMessage(`its me:${address}`);

    re = await ApiRequest.authenticate(address, signature);
  } catch (ex) {
    $quasar.loading.hide();
    $notification("failed", ex, 6000);
  }

  $store.commit("login", { jwt: re.data.jwt, address: address });
  $eventBus.emit(LOGGED_IN);
  
  router.push({
    name: 'planet'
  });
  
  $quasar.loading.hide();
};

const chainData = computed(() => {
  return $store.getters.chainInfo;
});

const tier = computed(() => {
  if ($store.getters.activePlanet === false) return;
  return $store.getters.activePlanet.tier.tier_name.toUpperCase();
});

const loggedIn = computed(() => {
  return $store.getters.loggedIn;
});

const address = computed(() => {
  return $store.getters.address;
});

const logInButtonText = computed(() => {
  if (loggedIn.value) {
    return shortAddress.value;
  }

  return "Login";
});

const shortAddress = computed(() => {
  const address = $store.getters.address;
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
});
</script>
<style lang="scss">
.boring {
  color: rgb(223, 191, 191);
  position: relative;
  font-size: 25px;
  float: left;
  margin-right: 20px;
  text-transform: uppercase;
}
.glitch {
  color: rgb(223, 191, 191);
  position: relative;
  font-size: 25px;
  float: left;
  margin-right: 20px;
  // margin: 70px 200px;
  animation: glitch 5s 5s infinite;
  text-transform: uppercase;
}

.glitch::before {
  content: attr(data-text);
  position: absolute;
  left: -2px;
  text-shadow: -5px 0 magenta;
  background: black;
  overflow: hidden;
  top: 0;
  animation: noise-1 3s linear infinite alternate-reverse, glitch 5s 5.05s infinite;
}

.glitch::after {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  text-shadow: -5px 0 lightgreen;
  background: black;
  overflow: hidden;
  top: 0;
  animation: noise-2 3s linear infinite alternate-reverse, glitch 5s 5s infinite;
}

@keyframes glitch {
  1% {
    transform: rotateX(10deg) skewX(90deg);
  }
  2% {
    transform: rotateX(0deg) skewX(0deg);
  }
}

@keyframes noise-1 {
  $steps: 30;
  @for $i from 1 through $steps {
    #{percentage($i*(1/$steps))} {
      $top: random(100);
      $bottom: random(101 - $top);
      clip-path: inset(#{$top}px 0 #{$bottom}px 0);
    }
  }
}

@keyframes noise-2 {
  $steps: 30;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      $top: random(100);
      $bottom: random(101 - $top);
      clip-path: inset(#{$top}px 0 #{$bottom}px 0);
    }
  }
}

@keyframes fudge {
  from {
    transform: translate(0px, 0px);
  }
  to {
    transform: translate(0px, 2%);
  }
}

@keyframes glitch-2 {
  1% {
    transform: rotateX(10deg) skewX(70deg);
  }
  2% {
    transform: rotateX(0deg) skewX(0deg);
  }
}

.btn-glow-element {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 0px 100px rgba(34, 83, 244, 0.9);
}
</style>
