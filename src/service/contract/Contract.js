import { ethers } from "ethers";
import Store from "../../store/index";
const Buffer = require('buffer/').Buffer 

function parseJwt(token) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
}

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
        const jwt = Store.getters.jwt;
        const payload = parseJwt(jwt);
        if (Math.floor(Date.now() / 1000) >= payload.exp) {
            Store.commit("destroySession");
        }

        const contract = new ethers.Contract(
            address,
            abi,
            this.provider
        );

        return contract.connect(this.signer);
    }
}

