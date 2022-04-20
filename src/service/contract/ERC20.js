import { ethers } from "ethers";
import Contract from "./Contract";

const ABI = require("../../ABI/IERC20.json");

class ERC20 extends Contract {
    constructor(address) {
        super();
        this.address = address;
    }
    
    getContract() {
        return super.buildContract(this.address, ABI);
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

export default ERC20;
export { };


