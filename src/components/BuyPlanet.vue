<template>
  <div>
    <q-btn
      icon="add"
      label="Buy Planet"
      color="warning"
      v-if="!$q.screen.xs"
      @click="buyPlanetPopup = true"
    />

    <q-btn
      icon="add"
      v-if="$q.screen.xs"
      color="warning"
      @click="buyPlanetPopup = true"
    />

    <q-dialog v-model="buyPlanetPopup">
      <q-card
        class="bg-dark text-white"
        style="width: 600px; max-width: 70vw; border-radius: 20px"
      >
        <q-btn
          round
          class="absolute-top-right"
          flat
          color="warning"
          icon="close"
          v-close-popup
        />
        <img src="~assets/img/buyplanet_footer-scaled.jpg" alt="" srcset="" />
        <q-card-section class="text-center">
          <div class="text-h6">BUY A PLANET</div>
          <div class="text-subtitle1">
            Buying a planet costs 0.5BNB, also, you can choose a planet name
            (which can be changed later).
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            label-color="white"
            v-model="planetName"
            label="Planet Name"
            class="text-secondary"
            standout="bg-secondary"
          />
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <q-btn
            label="Buy Planet"
            color="warning"
            @click="buyPlanet"
            no-caps
            class="q-px-lg"
            v-close-popup
          />
        </q-card-section>
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

      let receipt = { status: 0 };

      try {
        const tx = await PlanetManagementContract.buyPlanet(planetGuid);
        receipt = await tx.wait();
        console.log(receipt);
      } catch (e) {
        console.log("error");
        console.log(e);
      }

      if (receipt.status === 1) {
        const txHash = receipt.transactionHash;
        const re = await ApiRequest.buyPlanet(
          txHash,
          planetGuid,
          this.planetName
        );

        if (re.success) {
          this.$notification("success", "Planet purchases successfully!", 6000);
        } else {
          this.$notification("failed", re.error, 6000);
          console.error(`${planetGuid}`);
        }

        this.$eventBus.emit(NEW_PLANET_PURCHASED, { planet: re.data });
        this.$store.commit("addPlanet", re.data);
      } else {
        this.$notification(
          "failed",
          "Something failed, please try again!",
          1500
        );
      }

      closeNotification();
    },
  },
};
</script>
