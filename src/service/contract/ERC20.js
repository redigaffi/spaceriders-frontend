import { ethers } from "ethers";
import Contract from "./Contract";

const ABI = require("../../ABI/IERC20.json");

class ERC20 extends Contract {
    constructor(address) {
        super();
        this.address = address;
    }
    
    async getContract() {
        return await super.buildContract(this.address, ABI);
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

    
    async totalSupply() {
        const contract = await this.getContract();
        const totalSupply = await contract.totalSupply();
        return parseInt(ethers.utils.formatEther(totalSupply));
    }

    
}

export default ERC20;
export { };


