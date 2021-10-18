import axios from "axios";

export default class ApiRequests {
  static async authenticate(address, signature) {
    const body = {
      address: address,
      signature: signature,
    };

    const path = `${process.env.BASE_API_PATH}/jwt`;
    const re = await axios.post(path, body);

    return re;
  }

  /**
   *
   * @param {string} tx Planet purchase TX.
   * @param {string} planetGuid Planet GUID.
   */
  static async buyPlanet(tx, planetGuid, name) {
    const path = `${process.env.BASE_API_PATH}/planet/buy`;

    const body = {
      tx: tx,
      planetId: planetGuid,
      name: name,
    };

    const re = (await axios.post(path, body)).data;

    return re;
  }

  /**
   *
   * @param {string} planetGuid Planet GUID.
   */
  static async claimPlanet(planetGuid) {
    const path = `${process.env.BASE_API_PATH}/planet/claim`;

    const body = {
      planetId: planetGuid,
    };

    return (await axios.post(path, body)).data;
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

  static async getUnClaimPlanet() {
    const path = `${process.env.BASE_API_PATH}/planet/unclaimed`;
    return (await axios.get(path)).data;
  }

  /**
   * Gets active planets
   */
  static async getPlanets() {
    const path = `${process.env.BASE_API_PATH}/planet/claimed`;
    return (await axios.get(path)).data;
  }

  /**
   * Gets current active planet
   * @param {number} planetId 
   * @returns 
   */
  static async getActivePlanet(planetId) {
    const path = `${process.env.BASE_API_PATH}/planet/${planetId}`;
    return (await axios.get(path)).data;
  }

  /**
   * Gets all planets (claimed/unclaimed)
   */
  static async getAllPlanets() {
    const path = `${process.env.BASE_API_PATH}/planet/all`;
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
   * Upgrades defense.
   * @param {string} label
   * @param {string} planetGuid 
   * @returns 
   */
    static async buildDefense(data) {
      const path = `${process.env.BASE_API_PATH}/defense/build`;
  
      const body = {
        label: data.label,
        planetId: data.planetGuid,
        quantity: data.quantity,
      };
  
      return (await axios.post(path, body)).data;
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
   * Upgrades a Ressource Building.
   * @param {string} label
   * @param {string} planetGuid 
   * @returns 
   */
   static async upgradeRessource(data) {
    const path = `${process.env.BASE_API_PATH}/ressource/upgrade`;

    const body = {
      label: data.label,
      planetId: data.planetGuid,
    };

    return (await axios.post(path, body)).data;
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
   * Upgrades a Installation Building.
   * @param {string} label
   * @param {string} planetGuid 
   * @returns 
   */
   static async upgradeInstallation(data) {
    const path = `${process.env.BASE_API_PATH}/installation/upgrade`;

    const body = {
      label: data.label,
      planetId: data.planetGuid,
    };

    return (await axios.post(path, body)).data;
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
   * Upgrades Research.
   * @param {string} label
   * @param {string} planetGuid 
   * @returns 
   */
    static async upgradeResearch(data) {
      const path = `${process.env.BASE_API_PATH}/research/upgrade`;
  
      const body = {
        label: data.label,
        planetId: data.planetGuid,
      };
  
      return (await axios.post(path, body)).data;
    }
    

    /**
   * Get pending conversion request
   * 
   * @param {string} planetId 
   * @returns 
   */
   static async getPendingConversions(planetId) {
    const path = `${process.env.BASE_API_PATH}/conversion/${planetId}`;
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
        type: data.type,
        planetId: data.planetGuid,
        metal: data.metal,
        crystal: data.crystal,
        petrol: data.petrol,
      };
  
      return (await axios.post(path, body)).data;
    }
}
