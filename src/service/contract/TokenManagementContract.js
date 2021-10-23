import { ethers } from "ethers";
import ContractAddress from "./ContractAddress";
import Contract from "./Contract";
import SignatureData from "./types/SignatureData";

const ABI = require("../../ABI/TokenManagement.json");

class Attributes {
    /**
     * 
     * @param {*} id 
     * @param {*} tokens 
     * @param {*} validTimeWindow 
     * @param {*} forAddress 
     */
    constructor(id, tokens, validTimeWindow, forAddress) {
        this.id = id;
        this.tokens = tokens;
        this.validTimeWindow = validTimeWindow;
        this.forAddress = forAddress;
    }
}

class TokenManagementContract extends Contract {
    constructor() {
        super();
    }
    
    getContract() {
        const contractAddress = ContractAddress.getTokenManagementAddress();
        return super.buildContract(contractAddress, ABI);
    }

    /**
     * @param {string} planetGuid Planet GUID.
     * 
     **/
    async convertFromPrimaryResources(signatureData, attributes) {
        const contract = await this.getContract();
        
        const overrides = {
            gasLimit: 6721975,
        };

        return await contract.convertFromPrimaryResources(
            signatureData,
            attributes.id,
            attributes.tokens,
            attributes.validTimeWindow,
            attributes.forAddress,
            overrides
        );
    }


    /**
     * @param {string} planetGuid Planet GUID.
     * 
     **/
     async convertFromToken(signatureData, attributes) {
        const contract = await this.getContract();
        
        const overrides = {
            gasLimit: 6721975,
        };

        return await contract.convertFromToken(
            signatureData,
            attributes.id,
            attributes.tokens,
            attributes.validTimeWindow,
            attributes.forAddress,
            overrides
        );
    }

   
}

export default new TokenManagementContract();
export { Attributes, SignatureData };


