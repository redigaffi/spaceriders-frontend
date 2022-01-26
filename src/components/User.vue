<template>
  <!-- <q-btn @click="login" color="blue-7" :label="logInButtonText" /> -->
  <div>
    <div :class="tier != 'TIER 0' ? 'glitch' : 'boring'" :data-text="tier">
      {{ tier }}
    </div>

    <q-btn
      v-if="!this.error"
      :label="logInButtonText"
      rounded
      color="primary"
      class="glossy btn-glow-element"
      icon="person"
      @click="login"
    />
    <q-btn
      v-else
      label="Incorrect Network"
      color="negative"
      class="glossy btn-glow-element"
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
        console.log("chain")
        console.log(process.env.CHAIN_ID)
        const c = parseInt(process.env.CHAIN_ID);
        const chainId = `0x${c.toString(16)}`;
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
    tier: function () {
      if (this.$store.getters.activePlanet === false) return;
      return this.$store.getters.activePlanet.tier.tierName.toUpperCase();
    },

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
  animation: noise-1 3s linear infinite alternate-reverse,
    glitch 5s 5.05s infinite;
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
