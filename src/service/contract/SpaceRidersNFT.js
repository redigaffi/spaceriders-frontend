import { ethers } from "ethers";
import Contract from "./Contract";
import ContractAddress from "./ContractAddress";

const ABI = require("../../ABI/SpaceRiderNFT.json");

class SpaceRidersNFT extends Contract {
  constructor(address) {
    super();
    this.address = address;
  }

  async getContract() {
    const contractAddress = ContractAddress.getSpaceRidersNftAddress();
    return super.buildContract(contractAddress, ABI);
  }

  /**
   * @param {string} planetId
   **/
  async getPlanetById(planetId) {
    const contract = await this.getContract();

    return await contract.getPlanetById(planetId);
  }

}

export default new SpaceRidersNFT();
