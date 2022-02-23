import { ethers } from "ethers";
import ContractAddress from "./ContractAddress";
import Contract from "./Contract";

const ABI = require("../../ABI/PancakeRouter.json");
const ERC20 = require("../../ABI/IERC20.json");

class RouterContract extends Contract {
    constructor() {
        super();
    }

    getContract() {
        const contractAddress = ContractAddress.getRouterAddress();
        return super.buildContract(contractAddress, ABI);
    }

    /**
     * @param {string} contractAddress
     * function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
     **/
    async buySpr(to, bnbAmount) {
        const contract = await this.getContract();

        const wBnbAddress = await contract.WETH();
        const sprAddress = ContractAddress.getSpaceRidersAddress();

        const path = [
            wBnbAddress,
            sprAddress
        ];

        const overrides = {
            // To convert Ether to Wei:
            //@todo: get price from smart contract
            value: ethers.utils.parseEther(bnbAmount),
            gasLimit: 6721975,
        };

        return await contract.swapExactETHForTokens(
            0,
            path,
            to,
            Date.now()+10,
            overrides
        );
    }

    async sellSpr(to, sprAmount) {
        console.log(ethers.utils.parseEther(sprAmount).toString());
        const contract = await this.getContract();

        const wBnbAddress = await contract.WETH();
        const sprAddress = ContractAddress.getSpaceRidersAddress();

        const path = [
            sprAddress,
            wBnbAddress
        ];

        const overrides = {
            // To convert Ether to Wei:
            //@todo: get price from smart contract
            //value: ethers.utils.parseEther(bnbAmount),
            gasLimit: 6721975,
        };

        return await contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
            ethers.utils.parseEther(sprAmount),
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


