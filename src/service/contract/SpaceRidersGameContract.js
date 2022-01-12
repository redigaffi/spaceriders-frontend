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
  constructor(
    id,
    diameter,
    slots,
    minTemperature,
    maxTemperature,
    galaxy,
    solarSystem,
    position
  ) {
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

class TokenExchangeAttributes {
    /**
     * 
     * @param {*} id 
     * @param {*} tokens 
     * @param {*} validTimeWindow 
     * @param {*} forAddress 
     */
    constructor(id, tokens, validTimeWindow, forAddress) {
        this.id = id;
        this.tokens = tokens;
        this.validTimeWindow = validTimeWindow;
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
      gasLimit: 672197,
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
     * @param {string} planetGuid Planet GUID.
     * 
  **/
    async buyPlanet(planetGuid, price, sD) {
        const contract = await this.getContract();
        
        const overrides = {
            // To convert Ether to Wei:
            //@todo: get price from smart contract
            value: ethers.utils.parseEther("0.0025"),
            gasLimit: 672197,
        };

        return await contract.buyPlanet(
            planetGuid,
            price,
            sD,
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
            value: ethers.utils.parseEther("0.0025"),
            gasLimit: 6721975,
        };

        return await contract.claimPlanet(
            planetAttributes,
            tokenURI,
            signatureData,
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
            gasLimit: 6721975,
        };

        return await contract.convertFromPrimaryResources(
            signatureData,
            attributes.id,
            attributes.tokens,
            attributes.validTimeWindow,
            attributes.forAddress,
            overrides
        );
    }


    /**
     * @param {string} planetGuid Planet GUID.
     * 
     **/
    async convertFromToken(signatureData, attributes) {
        const contract = await this.getContract();
        
        const overrides = {
            gasLimit: 6721975,
        };

        return await contract.convertFromToken(
            signatureData,
            attributes.id,
            attributes.tokens,
            attributes.validTimeWindow,
            attributes.forAddress,
            overrides
        );
    }
}

export default new SpaceRidersGameContract();
export {
  BenefitStakingAttributes,
  EnergyDepositAttributes,
  PlanetAttributes,
  TokenExchangeAttributes,
  SignatureData,
};