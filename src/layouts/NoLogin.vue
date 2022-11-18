<template>
  <q-layout view="lHh Lpr lFf">
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

      <q-page>
        <div class="row window-height justify-center items-center">
          <div class="col-12 col-md-6 col-lg-4 q-pa-md">
            <q-card dark>
              <q-card-section>
                <div class="text-h6 text-center">Welcome to SpaceRiders</div>
              </q-card-section>

              <img src="~assets/img/no-planet.webp" />

              <q-separator dark />

              <q-card-section>
                <div class="text-center">Login with:</div>
              </q-card-section>

              <q-card-actions
                :vertical="$q.screen.lt.md"
                align="center"
                class="q-gutter-y-sm"
              >
                <q-btn
                  :class="{ 'full-width': $q.screen.lt.md }"
                  color="info"
                  icon="fab fa-google"
                  label="Google"
                  @click="login('facewallet', 'google')"
                />

                <q-btn
                  :class="{ 'full-width': $q.screen.lt.md }"
                  color="info"
                  icon="fab fa-facebook"
                  label="Facebook"
                  @click="login('facewallet', 'facebook')"
                />

                <q-btn
                  :class="{ 'full-width': $q.screen.lt.md }"
                  color="info"
                  icon="fab fa-apple"
                  label="Apple"
                  @click="login('facewallet', 'apple')"
                />

                <q-btn
                  :class="{ 'full-width': $q.screen.lt.md }"
                  color="info"
                  icon="token"
                  label="Metamask"
                  @click="login('metamask')"
                />
              </q-card-actions>

              <q-card-actions align="center">
                <q-btn
                  :class="{ 'full-width': $q.screen.lt.md }"
                  color="primary"
                  icon="fas fa-arrow-left"
                  label="Back to landing"
                  @click="router.push({ path: '/' })"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ApiRequest from "../service/http/ApiRequests";
import { ethers } from "ethers";
import { LOGGED_IN } from "../constants/Events";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, computed, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";

const $quasar = useQuasar();
const $store = useStore();

const allowedWallets = [
  "0x4A67f4cACb27f57467F428EE469bfc69B58b9bCf",
  "0x1C6ffD4d136F3da9B03304dE4E457789C013f210",
  "0xbE3BdDb0a6D51DCF64AB3514795713204f58b1ea",
  "0xB9B769b911301689Df5406728A8Ea2D7B7a0856f",
  "0xeD3e9C95BAfB1Af3B50AD3f117e8a90bfd5dd408",
];

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const userInfoPopup = ref(false);
const error = ref(false);
const router = useRouter();

const socialLoginMap = {
  google: "google.com",
  facebook: "facebook.com",
  apple: "apple.com",
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
  }

  return false;
};

const login = async (providerName, socialLoginProvider) => {
  if (loggedIn.value) {
    userInfoPopup.value = true;
    return;
  }

  error.value = false;

  let re = false;
  let address = false;

  try {
    let provider = false;

    if (providerName === "metamask") {
      $quasar.loading.show();
      const chain = await checkChain();
      if (!chain) {
        error.value = true;
        $store.commit("destroySession");
        $quasar.loading.hide();
        $quasar.notify(
          $notification("failed", "Checking metamask chain failed...")
        );
        return;
      }

      await window.ethereum.enable();
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } else if (providerName === "facewallet" && socialLoginProvider) {
      await window.face.auth.directSocialLogin(
        socialLoginMap[socialLoginProvider]
      );

      provider = new ethers.providers.Web3Provider(
        window.face.getEthLikeProvider()
      );
    }

    const signer = await provider.getSigner();

    address = await signer.getAddress();
    const signature = await signer.signMessage(`its me:${address}`);

    re = await ApiRequest.authenticate(address, signature);

    if (!allowedWallets.includes(address) && !$store.getters.isReleaseTime) {
      $quasar.loading.hide();
      $store.commit("destroySession");
      $quasar.notify($notification("failed", "MVP is not open yet..."));
      return;
    }

    $store.commit("login", {
      provider: providerName,
      jwt: re.data.jwt,
      address: address,
    });
    $eventBus.emit(LOGGED_IN);

    router.push({
      name: "planets",
    });

    $quasar.loading.hide();
  } catch (ex) {
    console.log("exc");
    console.log(ex);
    $quasar.loading.hide();
    $quasar.notify($notification("failed", ex));
  }
};

const chainData = computed(() => {
  return $store.getters.chainInfo;
});

const loggedIn = computed(() => {
  return $store.getters.loggedIn;
});

const address = computed(() => {
  return $store.getters.address;
});
</script>

<style lang="scss" scoped></style>
