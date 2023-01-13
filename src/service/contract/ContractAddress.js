import Store from "../../store/index";

export default class ContractAddress {
  static getSpaceRidersGameAddress() {
    return Store.getters.chainInfo.game_contract;
  }

  static getSpaceRidersAddress() {
    return Store.getters.chainInfo.token_contract;
  }

  static getSpaceRidersNftAddress() {
    return Store.getters.chainInfo.nft_contract;
  }

  static getRouterAddress() {
    return Store.getters.chainInfo.router_contract;
  }

  static getBusdAddress() {
    return Store.getters.chainInfo.busd_contract;
  }
}
