import { ethers } from "ethers";
import Store from "../../store/index";
const Buffer = require("buffer/").Buffer;
import { Face, Network } from "@haechi-labs/face-sdk";

function parseJwt(token) {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}

export default class Contract {
  constructor() {
    const provider = Store.getters.provider;
    this.provider = new ethers.providers.Web3Provider(window.ethereum);

    if (provider === "metamask") {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);

    } else if(provider === "facewallet") {
      console.log("facewallet")
      const face = Store.getters.face;

      this.provider = new ethers.providers.Web3Provider(face.getEthLikeProvider());
    }

    this.signer = this.provider.getSigner();

  }

  async getTransactionReceipt(hash) {
    return await this.provider.getTransactionReceipt(hash);
  }

  getProvider() {
    return this.provider;
  }

  buildContract(address, abi) {
    const jwt = Store.getters.jwt;
    const payload = parseJwt(jwt);
    if (Math.floor(Date.now() / 1000) >= payload.exp) {
      Store.commit("destroySession");
    }

    const contract = new ethers.Contract(address, abi, this.provider);

    return contract.connect(this.signer);
  }
}
