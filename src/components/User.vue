<template>
  <!-- <q-btn @click="login" color="blue-7" :label="logInButtonText" /> -->
  <div>
    <q-btn
      v-if="!this.error"
      :label="logInButtonText"
      color="warning"
      class="btn-glow-element"
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

<script>
import ApiRequest from "../service/http/ApiRequests";
import { ethers } from "ethers";
import { LOGGED_IN } from "../constants/Events";

export default {
  name: "User",
  data: () => {
    return {
      userInfoPopup: false,
      error: false,
    };
  },
  beforeMount: async function () {
    window.ethereum.on("networkChanged", async (networkId) => {
      const chain = await this.checkChain();
      if (!chain) {
        this.error = true;
        this.$store.commit("destroySession");
      } else {
        this.error = false;
      }
    });

    window.ethereum.on("accountsChanged", async (accounts) => {
      this.$store.commit("destroySession");
      this.login();
    });

    const chain = await this.checkChain();

    if (!chain) {
      this.error = true;
      this.$store.commit("destroySession");
    } else {
      this.error = false;
    }
  },
  methods: {
    logout: function () {
      this.$store.commit("destroySession");
    },
    checkChain: async function () {
      if (window.ethereum) {
        const chainId = process.env.CHAIN_ID;
        const rpcUrl = process.env.RPC_URL;
        const chainName = process.env.CHAIN_NAME;

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
                    chainName: chainName,
                    chainId: chainId,
                    rpcUrl: rpcUrl,
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
    },

    login: async function (e) {
      if (this.loggedIn) {
        this.userInfoPopup = true;
        return;
      }

      const chain = await this.checkChain();
      if (!chain) {
        this.error = true;
        this.$store.commit("destroySession");
        return;
      }
      this.error = false;

      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      const address = await signer.getAddress();
      const signature = await signer.signMessage(`its me:${address}`);
      const re = await ApiRequest.authenticate(address, signature);

      this.$notification("success", "Successfully started session!", 6000);

      this.$store.commit("login", { jwt: re.data.jwt, address: address });

      this.$eventBus.emit(LOGGED_IN);
    },
  },

  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn;
    },
    address: function () {
      return this.$store.getters.address;
    },
    logInButtonText: function () {
      if (this.loggedIn) {
        return this.shortAddress;
      }

      return "Login";
    },
    shortAddress: function () {
      const address = this.$store.getters.address;
      return `${address.substring(0, 4)}...${address.substring(
        address.length - 4
      )}`;
    },
  },
};
</script>
<style lang="scss">
.btn-glow-element {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0 0px 100px rgba(34, 83, 244, 0.9);
}
</style>
