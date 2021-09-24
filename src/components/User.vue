<template>
  <!-- <q-btn @click="login" color="blue-7" :label="logInButtonText" /> -->
  <div>
    <q-btn
      rounded
      color="secondary"
      :label="logInButtonText"
      icon="person"
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
import { ACTIVE_PLANET_CHANGED, LOGGED_IN } from "../constants/Events";

export default {
  name: "User",
  data: () => {
    return {
      userInfoPopup: false,
    };
  },
  methods: {
    logout: function () {
      this.$store.commit("destroySession");
    },
    login: async function (e) {
      if (this.loggedIn) {
        this.userInfoPopup = true;
        return;
      }

      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      const address = await signer.getAddress();
      const signature = await signer.signMessage(`its me:${address}`);
      const re = await ApiRequest.authenticate(address, signature);

      this.$notification("success", "Successfully started session!", 6000);

      this.$store.commit("login", { jwt: re.data.jwt, address: address });
      
      /* const planets = (await ApiRequest.getPlanets()).data;
      
      this.$store.commit("setPlanets", { planets: planets})
      this.$store.commit("setActivePlanet", planets[0]);
      this.$eventBus.emit(ACTIVE_PLANET_CHANGED, planets[0]); */

      this.$eventBus.emit(LOGGED_IN)

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
