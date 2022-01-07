import { ethers } from "ethers";
import ContractAddress from "./ContractAddress";
import Contract from "./Contract";

const ABI = require("../../ABI/EnergyDeposit.json");

class EnergyDepositAttributes {
    /**
     * 
     * @param {string} guid
     * @param {number} amount 
     * @param {string} planetId
     */
    constructor(guid, amount, planetId) {
        this.guid = guid;
        this.amount = amount;
        this.planetId = planetId;
    }
}

class EnergyDepositContract extends Contract {
    constructor() {
        super();
    }
    
    getContract() {
        const contractAddress = ContractAddress.getEnergyDepositAddress();
        return super.buildContract(contractAddress, ABI);
    }

    /**
     * @param {EnergyDepositAttributes} energyDeposit
     **/
    async energyDeposit(energyDeposit) {
        const contract = await this.getContract();
        
        const overrides = {
            // To convert Ether to Wei:
            //@todo: get price from smart contract
            //value: ethers.utils.parseEther("0.05"),
            value: ethers.utils.parseEther("0.0025"),
            gasLimit: 672197,
        };
        
        const amountInWei = ethers.utils.parseEther(energyDeposit.amount).toString();
        return await contract.energyDeposit(
            amountInWei,
            energyDeposit.guid,
            energyDeposit.planetId,
            overrides
        );
    }
}

export default new EnergyDepositContract();
export { EnergyDepositAttributes };


