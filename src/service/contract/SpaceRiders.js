import { ethers } from "ethers";
import ContractAddress from "./ContractAddress";
import Contract from "./Contract";
import SignatureData from "./types/SignatureData";

const ABI = require("../../ABI/Spaceriders.json");

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
     **/
    async increaseAllowance(contractAddress) {
        const contract = await this.getContract();
        
        const overrides = {
            // To convert Ether to Wei:
            //@todo: get price from smart contract
            //value: ethers.utils.parseEther("0.05"),
            gasLimit: 6721975,
        };
                
        return await contract.increaseAllowance(
            contractAddress,
            ethers.constants.MaxUint256,
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
        
        return parseFloat(ethers.utils.formatEther(balance)).toFixed(2);
    }
    
    /**
     * @param {string} address
     **/
    async totalBalanceOf(address) {
        const contract = await this.getContract();
        
        const balance = await contract.totalBalanceOf(
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

    /**
     * How much is left for user to buy
     * @param {string} owner
     * @param {string} spender
     **/
    async purchasingPower(router, owner) {
        const contract = await this.getContract();
        
        const purchasingPower = await contract.purchasingPower(
            router,
            owner
        );
        
        return parseInt(ethers.utils.formatEther(purchasingPower.toString(), 18));
    }

    async purchasingPowerAmount(wallet) {
        const contract = await this.getContract();
        return await contract.purchasingPowerAmount(
            wallet
        );
    }

    /**
     **/
    async busdAddress() {
        const contract = await this.getContract();
        return await contract.busdAddress();
    }
}

export default new SpaceRidersContract();
export {
    SignatureData
};
