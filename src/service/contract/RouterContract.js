import { ethers } from "ethers";
import ContractAddress from "./ContractAddress";
import Contract from "./Contract";

const ABI = require("../../ABI/PancakeRouter.json");
const ABISPR = require("../../ABI/SpaceRiders.json");
const ERC20 = require("../../ABI/IERC20.json");

class RouterContract extends Contract {
    constructor() {
        super();
    }

    getContract() {
        const contractAddress = ContractAddress.getRouterAddress();
        return super.buildContract(contractAddress, ABI);
    }

    getSprContract() {
        const contractAddress = ContractAddress.getSpaceRidersAddress();
        return super.buildContract(contractAddress, ABISPR);
    }

    /**
     * @param {string} contractAddress
     * function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
     **/
    async buySpr(to, amountIn) {
        const routerContract = await this.getContract();
        const sprContract = await this.getSprContract();

        const busdAddress = await sprContract.busdAddress();
        const sprAddress = ContractAddress.getSpaceRidersAddress();

        const path = [
            busdAddress,
            sprAddress
        ];

        const overrides = {
            // To convert Ether to Wei:
            //@todo: get price from smart contract
            gasLimit: 721975,
        };

        return await routerContract.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            ethers.utils.parseEther(amountIn),
            0,
            path,
            to,
            Date.now()+10,
            overrides
        );
    }

    async getAmountsOut(amount, pathName) {
        const contract = await this.getContract();

        
        const sprAddress = ContractAddress.getSpaceRidersAddress();
        const sprContract = await this.getSprContract();
        const busdAddress = await sprContract.busdAddress();

        const contractMapping = {
            "busd": busdAddress,
            "spr": sprAddress 
        }

        const path = [
            contractMapping[pathName[0]],
            contractMapping[pathName[1]],
        ];

        const overrides = {
            // To convert Ether to Wei:
            //@todo: get price from smart contract
            //value: ethers.utils.parseEther(bnbAmount),
            gasLimit: 6721975,
        };
        
        const amounts = await contract.getAmountsOut(
            ethers.utils.parseEther(amount),
            path,
            overrides
        );
        
        return parseFloat(ethers.utils.formatEther(amounts[1])).toFixed(2);
    }

    async sellSpr(to, amountIn) {
        const routerContract = await this.getContract();
        const sprContract = await this.getSprContract();

        const busdAddress = await sprContract.busdAddress();
        const sprAddress = ContractAddress.getSpaceRidersAddress();

        const path = [
            sprAddress,
            busdAddress
        ];

        const overrides = {
            // To convert Ether to Wei:
            //@todo: get price from smart contract
            gasLimit: 721975,
        };

        return await routerContract.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            ethers.utils.parseEther(amountIn),
            0,
            path,
            to,
            Date.now()+10,
            overrides
        );
    }

    
}

export default new RouterContract();
export { };


