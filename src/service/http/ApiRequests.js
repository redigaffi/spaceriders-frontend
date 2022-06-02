import axios from "axios";

export default class ApiRequests {
  static async authenticate(address, signature) {
    const body = {
      address: address,
      signature: signature,
    };

    const path = `${process.env.BASE_API_PATH}/jwt`;
    return await axios.post(path, body);
  }

  /**
   *
   * @param {string} tx Planet purchase TX.
   * @param {string} planetGuid Planet GUID.
   */
  static async buyPlanet(planetGuid, name) {
    const path = `${process.env.BASE_API_PATH}/planet/buy`;

    const body = {
      planet_id: planetGuid,
      name: name,
    };

    return (await axios.post(path, body));
  }

    /**
   *
   * @param {string} tx Planet purchase TX.
   * @param {string} planetGuid Planet GUID.
   */
    static async mintFreePlanet(name) {
      const path = `${process.env.BASE_API_PATH}/planet/free`;
      const body = {
        name: name,
      };
      return (await axios.post(path, body));
    }
  
  /**
   *
   * @param {string} planetGuid Planet GUID.
   */
  static async claimPlanet(planetGuid) {
    const path = `${process.env.BASE_API_PATH}/planet/claim`;

    const body = {
      planet_id: planetGuid,
    };

    return (await axios.post(path, body));
  }

  /**
   * @param {string} txHash Hash which claims the planet
   * @param {string} planetGuid Planet GUID.
   */
  static async confirmClaimPlanet(txHash, planetGuid) {
    const path = `${process.env.BASE_API_PATH}/planet/claim/confirm`;

    const body = {
      claimTx: txHash,
      planetId: planetGuid,
    };

    return (await axios.post(path, body)).data;
  }

  static async fetchPlanetCost() {
    const path = `${process.env.BASE_API_PATH}/planet/fetch_cost`;
    return (await axios.get(path)).data;
  }

  /**
   * @param {string} planetGuid planetGuid
   */
  static async fetchPlanetCostData(planetGuid) {
    const path = `${process.env.BASE_API_PATH}/planet/fetch_cost_data`;

    const body = {
      planet_id: planetGuid,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * Gets all planets (claimed/unclaimed)
   */
  static async getAllPlanets() {
    const path = `${process.env.BASE_API_PATH}/planets`;
    return (await axios.get(path)).data;
  }

  /**
   * Gets defense data for a given planet
   *
   * @param {string} planetId
   * @returns
   */
  static async getDefenseData(planetId) {
    const path = `${process.env.BASE_API_PATH}/defense/${planetId}`;
    return (await axios.get(path)).data;
  }



  /**
   * Gets all resources for a given planet
   *
   * @param {string} planetId
   * @returns
   */
  static async getResourceData(planetId) {
    const path = `${process.env.BASE_API_PATH}/ressource/${planetId}`;
    return (await axios.get(path)).data;
  }

  /**
   * @param {string} label
   * @param {string} planetGuid
   * @returns
   */
  static async build(data) {
    const path = `${process.env.BASE_API_PATH}/planet/build`;

    const body = {
      type: data.type,
      label: data.label,
      planet_id: data.planetGuid,
    };

    return (await axios.post(path, body));
  }

  /**
   * Gets all installations for a given planet
   *
   * @param {string} planetId
   * @returns
   */
  static async getInstallationData(planetId) {
    const path = `${process.env.BASE_API_PATH}/installation/${planetId}`;
    return (await axios.get(path)).data;
  }

  /**
   * Gets all research data for a given planet
   *
   * @param {string} planetId
   * @returns
   */
  static async getResearchData(planetId) {
    const path = `${process.env.BASE_API_PATH}/research/${planetId}`;
    return (await axios.get(path)).data;
  }


  /**
   * Conversion Request.
   * @param {string} label
   * @param {string} planetGuid
   * @returns
   */
  static async conversionRequest(data) {
    const path = `${process.env.BASE_API_PATH}/conversion/convert`;

    const body = {
      planetId: data.planetId,
      metal: data.metal,
      crystal: data.crystal,
      petrol: data.petrol,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * Get tier upgrade info
   *
   * @param {string} planetId
   * @returns
   */
  static async getTierInfo() {
    const path = `${process.env.BASE_API_PATH}/staking/info`;
    return (await axios.get(path)).data;
  }

  /**
   * Create staking request.
   * @param {string} label
   * @param {string} planetGuid
   * @returns
   */
  static async createStakingRequest(data) {
    const path = `${process.env.BASE_API_PATH}/staking/request`;

    const body = {
      tier: data.tier,
      planetId: data.planetId,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * Confirm staking request.
   * @param {string} label
   * @param {string} planetGuid
   * @returns
   */
  static async confirmStakingRequest(data) {
    const path = `${process.env.BASE_API_PATH}/staking/confirm`;

    const body = {
      planetId: data.planetId,
    };

    return (await axios.post(path, body)).data;
  }

  static async unstakeRequest(data) {
    const path = `${process.env.BASE_API_PATH}/staking/unstake`;

    const body = {
      planetId: data.planetId,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * Get Emails
   * @param {string} planetId
   * @returns
   */
  static async getEmails(planetId) {
    const path = `${process.env.BASE_API_PATH}/email/${planetId}`;
    return (await axios.get(path)).data;
  }

  /**
   * Mark Email as read
   * @param {string} planetId
   * @returns
   */
  static async markEmailRead(planetId, emailId) {
    const path = `${process.env.BASE_API_PATH}/email/read`;

    const body = {
      planetId: planetId,
      emailId: emailId,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * Mark Email as read
   * @param {string} planetId
   * @returns
   */
  static async deleteEmail(planetId, emailId) {
    const path = `${process.env.BASE_API_PATH}/email/delete`;

    const body = {
      planetId: planetId,
      emailId: emailId,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * Get All planet info
   * @param {string} planetId
   * @returns
   */
  static async getAllInfoPlanet(planetId) {
    const path = `${process.env.BASE_API_PATH}/planet/${planetId}`;
    return (await axios.get(path));
  }

  /**
   * Repair Resource
   * @param {object} data
   * @returns
   */
  static async repairResource(data) {
    const path = `${process.env.BASE_API_PATH}/ressource/repair`;

    const body = {
      label: data.label,
      planetId: data.planetGuid,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * Energy deposit
   * @param {object} data
   * @returns
   */
  static async depositEnergy(data) {
    const path = `${process.env.BASE_API_PATH}/planet/energy`;

    const body = {
      planet_id: data.planetId,
      deposit_id: data.guid,
      amount: data.amount,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * Token Price
   * @param {object} data
   * @returns
   */
  static async tokenPrice() {
    const path = `${process.env.BASE_API_PATH}/chain/tokenprice`;
    return (await axios.get(path)).data.spr_price_usd;
  }

  /**
   * Get chain info
   * @returns
   */
  static async getChainInfo() {
    const path = `${process.env.BASE_API_PATH}/chain`;
    return (await axios.get(path)).data;
  }

  /**
   * Conversion preview
   * @returns
   */
  static async getPreviewConversion(planetId) {
    const path = `${process.env.BASE_API_PATH}/conversion/preview/${planetId}`;
    return (await axios.get(path)).data;
  }


  /**
   * Confirm conversion
   * @param {object} data
   * @returns
   */
  static async confirmConversion(data) {
    const path = `${process.env.BASE_API_PATH}/conversion/confirm`;

    const body = {
      planetId: data.planetId,
      tokenConversionId: data.guid,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * Conversion preview
   * @returns
   */
  static async getPendingConversions(planetId) {
    const path = `${process.env.BASE_API_PATH}/conversion/pending/${planetId}`;
    return (await axios.get(path)).data;
  }

    /**
   * Confirm conversion
   * @param {object} data
   * @returns
   */
    static async retryConversion(data) {
      const path = `${process.env.BASE_API_PATH}/conversion/retry`;
  
      const body = {
        planetId: data.planetId,
        tokenConversionId: data.guid,
      };
  
      return (await axios.post(path, body)).data;
    }


  /**
   * @param {object} data
   * @returns
   */
    static async claimPendingLvlUpReward(data) {
      const path = `${process.env.BASE_API_PATH}/planet/lvl/reward/claim`;
  
      const body = {
        planetId: data.planetId,
        claimId: data.claimId,
      };
  
      return (await axios.post(path, body)).data;
    }

    /**
     * @param {object} data
     * @returns
     */
    static async confirmPendingLvlUpReward(data) {
      const path = `${process.env.BASE_API_PATH}/planet/lvl/reward/confirm`;
  
      const body = {
        claimId: data.claimId,
      };
  
      return (await axios.post(path, body)).data;
    }
}