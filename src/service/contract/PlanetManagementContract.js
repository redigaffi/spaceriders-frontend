import { ethers } from "ethers";
import ContractAddress from "./ContractAddress";
import Contract from "./Contract";
import SignatureData from "./types/SignatureData";

const ABI = require("../../ABI/PlanetManagement.json");

class PlanetAttributes {
    /**
     * 
     * @param {string} id 
     * @param {number} diameter 
     * @param {number} slots 
     * @param {number} minTemperature 
     * @param {number} maxTemperature 
     * @param {number} galaxy 
     * @param {number} solarSystem 
     * @param {number} position 
     */
    constructor(id, diameter, slots, minTemperature, maxTemperature, galaxy, solarSystem, position) {
        this.id = id;
        this.diameter = diameter;
        this.slots = slots;
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
        this.galaxy = galaxy;
        this.solarSystem = solarSystem;
        this.position = position;
    }
}

class PlanetManagementContract extends Contract {
    constructor() {
        super();
    }
    
    getContract() {
        // const contractAddress = ContractAddress.getPlanetManagementAddress();
        // return super.buildContract(contractAddress, ABI);
    }

    /**
     * @param {string} planetGuid Planet GUID.
     * 
     **/
    async buyPlanet(planetGuid) {
        const contract = await this.getContract();
        
        const overrides = {
            // To convert Ether to Wei:
            //@todo: get price from smart contract
            value: ethers.utils.parseEther("0.05"),
            gasLimit: 6721975,
        };

        return await contract.buyPlanet(
            planetGuid,
            overrides
        );
    }

    /**
     * 
     * @param {PlanetAttributes} planetAttributes Planet's attributes
     * @param {string} tokenURI NFT token url
     * @param {SignatureData} signatureData Signature data received from the backend (message sign by backend with it's private key)
     */
    async claimPlanet(planetAttributes, tokenURI, signatureData) {
        const contract = await this.getContract();
        
        const overrides = {
            gasLimit: 6721975,
        };

        return await contract.claimPlanet(
            planetAttributes,
            tokenURI,
            signatureData,
            overrides
        );
        
    }
}

export default new PlanetManagementContract();
export { PlanetAttributes, SignatureData };


