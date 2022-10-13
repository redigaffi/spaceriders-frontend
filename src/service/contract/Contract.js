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
  constructor() {}

  async getTransactionReceipt(hash) {
    return await this.provider.getTransactionReceipt(hash);
  }

  getProvider() {
    const providerName = Store.getters.provider;

    let provider = false;

    if (providerName === "metamask") {
      provider = window.ethereum;
    } else if (providerName === "facewallet") {
      provider = window.face.getEthLikeProvider();
    }

    return new ethers.providers.Web3Provider(provider);
  }

  getSigner() {
    const provider = this.getProvider();
    return provider.getSigner();
  }

  buildContract(address, abi) {
    const jwt = Store.getters.jwt;
    const payload = parseJwt(jwt);
    if (Math.floor(Date.now() / 1000) >= payload.exp) {
      Store.commit("destroySession");
    }

    const contract = new ethers.Contract(address, abi, this.getProvider());

    return contract.connect(this.getSigner());
  }
}
