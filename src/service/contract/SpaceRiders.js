import { ethers } from "ethers";
import ContractAddress from "./ContractAddress";
import Contract from "./Contract";

const ABI = require("../../ABI/SpaceRiders.json");

class SpaceRidersContract extends Contract {
    constructor() {
        super();
    }
    
    getContract() {
        const contractAddress = ContractAddress.getSpaceRidersAddress();
        return super.buildContract(contractAddress, ABI);
    }

    /**
     * @param {string} contractAddress
     * @param {number} amount
     **/
    async increaseAllowance(contractAddress, amount) {
        const contract = await this.getContract();
        
        const overrides = {
            // To convert Ether to Wei:
            //@todo: get price from smart contract
            //value: ethers.utils.parseEther("0.05"),
            gasLimit: 6721975,
        };
        
        const amountInWei = ethers.utils.parseEther(amount).toString();
        
        return await contract.increaseAllowance(
            contractAddress,
            amountInWei,
            overrides
        );
    }

    /**
     * @param {string} address
     **/
    async balanceOf(address) {
        const contract = await this.getContract();
        
        const balance = await contract.balanceOf(
            address
        );
        
        return parseInt(ethers.utils.formatEther(balance));
    }

    /**
     * @param {string} owner
     * @param {string} spender
     **/
     async allowance(owner, spender) {
        const contract = await this.getContract();
        
        const balance = await contract.allowance(
            owner,
            spender
        );
        
        return parseInt(ethers.utils.formatEther(balance));
    }
}

export default new SpaceRidersContract();
export { };


