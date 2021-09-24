import { ethers } from "ethers";

export default class Contract {
    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer   = this.provider.getSigner();
    }

    async getTransactionReceipt(hash) {
        return await this.provider.getTransactionReceipt(hash);
    }
    buildContract(address, abi) {
        return new ethers.Contract(
            address,
            abi,
            this.provider
          )
          .connect(this.signer);
    }
}

