<template>
  <q-btn @click="claimPlanet" :disable="claimable" color="blue-7" label="Claim Planet" />
</template>

<script>
import ApiRequest from "../service/http/ApiRequests";
import { PLANET_CLAIMED } from "../constants/Events";

import PlanetManagementContract, {
  PlanetAttributes,
  SignatureData,
} from "../service/contract/PlanetManagementContract";

export default {
  name: "ClaimPlanet",
  setup() {
    return {};
  },
  props: {
    planet: Object,
    claimable: Boolean,
  },
  methods: {
    claimPlanet: async function () {
      //pm = await PlanetManagement.deployed();
      //pm.buyPlanet("18-18", {value: web3.utils.toWei("0.5", "ether")})
      const closeNotification = this.$notification(
        "progress",
        "Waiting for transaction to complete...",
        0
      );
      
      
      const planetGuid = this.planet.id;
      const data = await ApiRequest.claimPlanet(planetGuid);
      
      if (!data.success) {
        this.$notification("failed", data.error, 6000);
        closeNotification();
        return;
      }

      const pA = new PlanetAttributes(
        planetGuid,
        data.diameter,
        data.slots,
        data.minTemperature,
        data.maxTemperature,
        data.galaxy,
        data.solarSystem,
        data.position
      );

      const sD = new SignatureData(data.v, data.r, data.s);
      let receipt = {status: 0};

      try {
        console.log(pA);
        const tx = await PlanetManagementContract.claimPlanet(
          pA,
          data.tokenURI,
          sD
        );

        receipt = await tx.wait();
      } catch (e) {
        console.log("error");
        console.log(e);
      }

      if (receipt.status === 1) {
        const txHash = receipt.transactionHash;
        // confirm claim api call
        const confirmReq = await ApiRequest.confirmClaimPlanet(
          txHash,
          planetGuid
        );

        if (confirmReq.data.success === true) {
          this.$notification("success", "Planet claimed successfully!", 6000);
          this.$eventBus.emit(PLANET_CLAIMED, { planetGuid: planetGuid });
        } else {
          this.$notification("failed", confirmReq.data.error, 6000);
        }
        
      } else {
        this.$notification(
          "failed",
          "Transaction failed, please try again...",
          6000
        );
      }

      closeNotification();
      // TX is wait on
      /* {"to":"0x360bFCB9E0dFCD6C71BB0Fd20C9851B95798C0A5","from":"0x86e62e8447e3CBb73E4bBa42D2aa64067FC52bE4","contractAddress":null,"transactionIndex":0,"gasUsed":{"type":"BigNumber","hex":"0x04614a"},"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000108000000000000000000000000000000000000000000000000020000000400000000000800000001000000000000000010000000000000000000000000000000000000001000000800000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000002000008000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000010000000000000000","blockHash":"0x3594e275f3cf8a0c7ef5a49f0b3fa79b2399e3f89b3d236dc636194ea77951fa","transactionHash":"0xddea1ddec9b219285977cba659a927e6f5f59ef9008a304926298d4ac820dad0","logs":[{"transactionIndex":0,"blockNumber":547,"transactionHash":"0xddea1ddec9b219285977cba659a927e6f5f59ef9008a304926298d4ac820dad0","address":"0x2975841d4f846e444E7C3436FAd20A24F4Cd33E4","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x00000000000000000000000086e62e8447e3cbb73e4bba42d2aa64067fc52be4","0x0000000000000000000000000000000000000000000000000000000000000005"],"data":"0x","logIndex":0,"blockHash":"0x3594e275f3cf8a0c7ef5a49f0b3fa79b2399e3f89b3d236dc636194ea77951fa"}],"blockNumber":547,"confirmations":1,"cumulativeGasUsed":{"type":"BigNumber","hex":"0x04614a"},"status":1,"type":0,"byzantium":true,"events":[{"transactionIndex":0,"blockNumber":547,"transactionHash":"0xddea1ddec9b219285977cba659a927e6f5f59ef9008a304926298d4ac820dad0","address":"0x2975841d4f846e444E7C3436FAd20A24F4Cd33E4","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x00000000000000000000000086e62e8447e3cbb73e4bba42d2aa64067fc52be4","0x0000000000000000000000000000000000000000000000000000000000000005"],"data":"0x","logIndex":0,"blockHash":"0x3594e275f3cf8a0c7ef5a49f0b3fa79b2399e3f89b3d236dc636194ea77951fa"}]} */
    },
  },
};
</script>
