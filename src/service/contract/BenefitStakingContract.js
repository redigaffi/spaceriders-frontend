import { ethers } from "ethers";
import ContractAddress from "./ContractAddress";
import Contract from "./Contract";
import SignatureData from "./types/SignatureData";

const ABI = require("../../ABI/BenefitStaking.json");

class Attributes {
  /**
   * 
   * @param {string} planetId 
   * @param {int} amount 
   * @param {string} tier 
   * @param {int} timeRelease 
   */
  constructor(planetId, amount, tier, timeRelease) {
    this.planetId = planetId;
    this.amount = amount;
    this.tier = tier;
    this.timeRelease = timeRelease;
  }
}

class BenefitStakingContract extends Contract {
  constructor() {
    super();
  }

  getContract() {
    const contractAddress = ContractAddress.getBenefitStakingAddress();
    return super.buildContract(contractAddress, ABI);
  }

  /**
   * @param {string} planetGuid Planet GUID.
   *
   **/
  async stakingRequest(signatureData, attributes) {
    const contract = await this.getContract();
    
    const overrides = {
      value: ethers.utils.parseEther("0.0025"),
      gasLimit: 672197,
    };
    
    return await contract.stakingRequest(
      signatureData,
      attributes.planetId,
      attributes.amount,
      attributes.tier,
      attributes.timeRelease,
      overrides
    );
  }


  /**
   * @param {string} planetGuid Planet GUID.
   *
   **/
   async unstakingRequest(planetId) {
    const contract = await this.getContract();
    
    const overrides = {
      gasLimit: 6721975,
    };
    
    return await contract.withdrawStaking(
      planetId,
      overrides
    );
  }


}

export default new BenefitStakingContract();
export { Attributes, SignatureData };
