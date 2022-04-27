import { ethers } from "ethers";

export default class Contract {
    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer   = this.provider.getSigner();
    }

    async getTransactionReceipt(hash) {
        return await this.provider.getTransactionReceipt(hash);
    }
    
    getProvider() {
        return this.provider;
    }

    buildContract(address, abi) {
        const contract = new ethers.Contract(
            address,
            abi,
            this.provider
        );

        return contract.connect(this.signer);
    }
}

