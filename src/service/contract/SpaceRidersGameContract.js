import { ethers } from "ethers";
import ContractAddress from "./ContractAddress";
import Contract from "./Contract";
import SignatureData from "./types/SignatureData";

const ABI = require("../../ABI/SpaceRidersGame.json");

class BenefitStakingAttributes {
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

class TokenExchangeAttributes {
    /**
     * 
     * @param {*} id 
     * @param {*} tokens 
     * @param {*} validTimeWindow 
     * @param {*} forAddress 
     */
    constructor(id, tokens, forAddress) {
        this.id = id;
        this.tokens = tokens;
        this.forAddress = forAddress;
    }
}

class SpaceRidersGameContract extends Contract {
  constructor() {
    super();
  }

  getContract() {
    const contractAddress = ContractAddress.getSpaceRidersGameAddress();
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
      value: ethers.utils.parseEther("0.0025"),
      gasLimit: 6721975,
    };

    return await contract.withdrawStaking(planetId, overrides);
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
      gasLimit: 1972197,
    };

    const amountInWei = ethers.utils
      .parseEther(energyDeposit.amount)
      .toString();
    return await contract.energyDeposit(
      amountInWei,
      energyDeposit.guid,
      energyDeposit.planetId,
      overrides
    );
  }

    /**
     * 
     * @param {*} planetGuid 
     * @param {*} price 
     * @param {*} sD 
     * @param {*} tokenURI 
     * @returns 
     */
    async buyPlanet(planetGuid, price, sD, tokenURI) {
      const contract = await this.getContract();
      
      const overrides = {
          // To convert Ether to Wei:
          //@todo: get price from smart contract
          value: ethers.utils.parseEther("0.0025"),
          gasLimit: 1972197,
      };

      return await contract.buyPlanet(
          planetGuid,
          price,
          sD,
          tokenURI,
          overrides
      );
    }

    /**
     * @param {string} planetGuid Planet GUID.
     * 
     **/
    async convertFromPrimaryResources(signatureData, attributes) {
        const contract = await this.getContract();
        
        const overrides = {
            gasLimit: 721975,
        };

        return await contract.convertFromPrimaryResources(
            signatureData,
            attributes.id,
            attributes.tokens,
            attributes.forAddress,
            overrides
        );
    }
}

export default new SpaceRidersGameContract();
export {
  BenefitStakingAttributes,
  EnergyDepositAttributes,
  TokenExchangeAttributes,
  SignatureData,
};
