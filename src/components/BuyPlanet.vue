<template>
  <div>
    <!-- <q-btn @click="buyPlanet" color="blue-7" label="Buy Planet" /> -->
    <q-btn label="Buy Planet" color="blue-7" @click="buyPlanetPopup = true" />

    <q-dialog v-model="buyPlanetPopup">
      <q-card>
        <q-card-section>
          <div class="text-h6">Buy a Planet</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Buying a planet costs 0.5BNB, also, you can choose a planet name (which can be changed later).
          <q-input v-model="planetName" label="Planet Name" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Buy" color="primary" @click="buyPlanet" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import ApiRequest from "../service/http/ApiRequests";
import PlanetManagementContract from "../service/contract/PlanetManagementContract";
import { NEW_PLANET_PURCHASED } from "../constants/Events";

export default {
  name: "BuyPlanet",
  data: () => {
    return {
      planetName: "",
      buyPlanetPopup: false,
    };
  },
  methods: {
    buyPlanet: async function () {
      const planetGuid = uuidv4();
      
      const closeNotification = this.$notification(
        "progress",
        "Waiting for transaction to complete...",
        0
      );

      let receipt = {status: 0};
      
      try { 
        const tx = await PlanetManagementContract.buyPlanet(planetGuid);
        receipt = await tx.wait();

      } catch (e) {
        console.log("error")
        console.log(e)
      }

      if (receipt.status === 1) {
        const txHash = receipt.transactionHash;
        const re = await ApiRequest.buyPlanet(txHash, planetGuid, this.planetName);

        if (re.data.success) {
          this.$notification("success", "Planet purchases successfully!", 6000);
        } else {
          this.$notification("failed", re.data.error, 6000);
          console.error(`${planetGuid}`);
        }
      } else {
        this.$notification(
          "failed",
          "Something failed, please try again!",
          1500
        );
      }

      this.$eventBus.emit(NEW_PLANET_PURCHASED, { planetGuid: planetGuid });
      closeNotification();
    },
  },
};
</script>

<style>

/* .notify {
  margin-top: 20px;
} */
</style>
