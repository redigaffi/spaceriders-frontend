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

    return await axios.post(path, body);
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

    return await axios.post(path, body);
  }

  static async fetchPlanetCost() {
    const path = `${process.env.BASE_API_PATH}/planet/cost`;
    return (await axios.get(path)).data;
  }

  /**
   * @param {string} planetGuid planetGuid
   */
  static async fetchPlanetCostData(planetGuid) {
    const path = `${process.env.BASE_API_PATH}/planet/cost/sign`;

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
      quantity: data.quantity,
    };

    return await axios.post(path, body);
  }

  /**
   * Get tier upgrade info
   *
   * @param {string} planetId
   * @returns
   */
  static async getTierInfo() {
    const path = `${process.env.BASE_API_PATH}/planet/staking/info`;
    return await axios.get(path);
  }

  /**
   * Create staking request.
   * @param {string} label
   * @param {string} planetGuid
   * @returns
   */
  static async createStakingRequest(data) {
    const path = `${process.env.BASE_API_PATH}/planet/staking/create`;

    const body = {
      tier_code: data.tier,
      planet_id: data.planetId,
    };

    return await axios.post(path, body);
  }

  /**
   * Confirm staking request.
   * @param {string} label
   * @param {string} planetGuid
   * @returns
   */
  static async confirmStakingRequest(data) {
    const path = `${process.env.BASE_API_PATH}/planet/staking/confirm`;

    const body = {
      planet_id: data.planetId,
    };

    return await axios.post(path, body);
  }

  static async unstakeRequest(data) {
    const path = `${process.env.BASE_API_PATH}/planet/staking/unstake`;

    const body = {
      planet_id: data.planetId,
    };

    return await axios.post(path, body);
  }

  /**
   * Mark Email as read
   * @param {string} planetId
   * @returns
   */
  static async markEmailRead(planetId, emailId) {
    const path = `${process.env.BASE_API_PATH}/planet/email/${emailId}/read`;

    const body = {};

    return (await axios.post(path, body)).data;
  }

  /**
   * Mark Email as read
   * @param {string} planetId
   * @returns
   */
  static async deleteEmail(planetId, emailId) {
    const path = `${process.env.BASE_API_PATH}/planet/email/${emailId}/delete`;

    const body = {};

    return (await axios.post(path, body)).data;
  }

  static async deleteAllEmails(planetId) {
    const path = `${process.env.BASE_API_PATH}/planet/${planetId}/email`;

    return (await axios.delete(path)).data;
  }

  /**
   * Get All planet info
   * @param {string} planetId
   * @returns
   */
  static async getAllInfoPlanet(planetId) {
    const path = `${process.env.BASE_API_PATH}/planet/${planetId}`;
    return await axios.get(path);
  }

  /**
   * Repair Resource
   * @param {object} data
   * @returns
   */
  static async repairResource(data) {
    const path = `${process.env.BASE_API_PATH}/planet/repair`;

    const body = {
      type: "resources",
      label: data.label,
      planet_id: data.planetGuid,
    };

    return await axios.post(path, body);
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
      amount: data.amount,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * $BKM Transaction
   * @param {object} data
   * @returns
   */
  static async bkmTransaction(data) {
    const path = `${process.env.BASE_API_PATH}/planet/bkm`;

    const body = {
      planet_id: data.planetId,
      deposit_id: data.guid,
      amount: data.amount,
      type: data.type,
    };

    return (await axios.post(path, body)).data;
  }

  /**
   * $BKM Withdraw
   * @param {object} data
   * @returns
   */
  static async bkmWithdraw(data) {
    const path = `${process.env.BASE_API_PATH}/planet/bkm/withdraw`;

    const body = {
      planet_id: data.planetId,
      deposit_id: data.guid,
      amount: data.amount,
      type: "withdraw",
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
   * @param {object} data
   * @returns
   */
  static async getPlanetsByPositionRange(data) {
    const path = `${process.env.BASE_API_PATH}/planets/${data.galaxy}/${data.fromSolarSystem}/${data.toSolarSystem}`;
    return await axios.get(path);
  }

  /**
   * @param {object} data
   * @returns
   */
  static async getCurrencyMarketOpenOrders(data) {
    const path = `${process.env.BASE_API_PATH}/currency_market/orders/open/${data.marketCode}/${data.planetId}`;
    return await axios.get(path);
  }

  /**
   * @param {object} data
   * @returns
   */
  static async cancelOrder(data) {
    const path = `${process.env.BASE_API_PATH}/currency_market/order/${data.orderId}/close`;
    return await axios.post(path);
  }

  /**
   * @param {object} data
   * @returns
   */
  static async getAllCurrencyMarketInfo() {
    const path = `${process.env.BASE_API_PATH}/currency_market/all`;
    return await axios.get(path);
  }

  /**
   * @param {object} data
   * @returns
   */
  static async getMediumFeed() {
    const path = `${process.env.BASE_API_PATH}/feed`;
    return await axios.get(path);
  }

  static async planetMark(id) {
    const path = `${process.env.BASE_API_PATH}/planet/favourite/mark`;

    const body = {
      planet_id: id,
    };

    return await axios.post(path, body);
  }

  static async planetUnmark(id) {
    const path = `${process.env.BASE_API_PATH}/planet/favourite/unmark`;

    const body = {
      planet_id: id,
    };

    return await axios.post(path, body);
  }

  /**
   * Repair Resource
   * @param {object} data
   * @returns
   */
  static async payQueue(data) {
    const path = `${process.env.BASE_API_PATH}/planet/queue/clear`;

    const body = {
      planet_id: data.planetGuid,
    };

    return await axios.post(path, body);
  }

  static async getLeaderboardPlanets(page, perPage) {
    const path = `${process.env.BASE_API_PATH}/leaderboard/planets?page=${page}&per_page=${perPage}`;
    return (await axios.get(path)).data.data;
  }

  static async getLeaderboardUsers(page, perPage) {
    const path = `${process.env.BASE_API_PATH}/leaderboard/users?page=${page}&per_page=${perPage}`;
    return (await axios.get(path)).data.data;
  }

  static async accountUsername(wallet, username) {
    const path = `${process.env.BASE_API_PATH}/account/username`;

    const body = {
      wallet,
      username,
    };

    return await axios.post(path, body);
  }

  static async getAccountInfo(wallet) {
    const path = `${process.env.BASE_API_PATH}/account/info/${wallet}`;
    return await axios.get(path);
  }
}
