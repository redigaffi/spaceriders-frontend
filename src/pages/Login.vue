<template>
  <div class="row window-height justify-center items-center q-px-md">
    <div class="col-12 col-md-6 col-lg-4">
      <q-card dark>
        <q-card-section>
          <div class="text-h6 text-center">Welcome to SpaceRiders</div>
        </q-card-section>

        <img src="img/no-planet.webp" />

        <q-separator dark />

        <q-card-section>
          <div class="text-center">Login with your wallet</div>
        </q-card-section>

        <q-card-actions vertical align="center">
          <q-btn
            class="full-width"
            color="info"
            label="Facewallet"
            @click="login('facewallet')"
          />

          <q-btn
            class="full-width"
            color="info"
            label="Metamask"
            @click="login('metamask')"
          />
        </q-card-actions>

        <q-card-actions vertical align="center">
          <q-btn
            class="full-width"
            color="primary"
            label="Back to landing"
            @click="router.push({ path: '/' })"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import ApiRequest from "../service/http/ApiRequests";
import { ethers } from "ethers";
import { LOGGED_IN } from "../constants/Events";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, computed, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const $quasar = useQuasar();
const $store = useStore();

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const userInfoPopup = ref(false);
const error = ref(false);
const router = useRouter();

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

const login = async (providerName) => {
  if (loggedIn.value) {
    userInfoPopup.value = true;
    return;
  }

  $quasar.loading.show();
  error.value = false;

  let re = false;
  let address = false;

  try {
    let provider = false;

    if (providerName === "metamask") {
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
    } else if (providerName === "facewallet") {
      await window.face.auth.login();
      provider = new ethers.providers.Web3Provider(
        window.face.getEthLikeProvider()
      );
    }

    const signer = await provider.getSigner();

    address = await signer.getAddress();
    const signature = await signer.signMessage(`its me:${address}`);

    re = await ApiRequest.authenticate(address, signature);
    $store.commit("login", {
      provider: providerName,
      jwt: re.data.jwt,
      address: address,
    });
    $eventBus.emit(LOGGED_IN);

    router.push({
      name: "planet",
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
