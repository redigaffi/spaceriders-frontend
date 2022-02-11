
import Store from "../../store/index";

export default class ContractAddress {
    static getSpaceRidersGameAddress() {
        return Store.getters.chainInfo.gameContract;
    }

    static getSpaceRidersAddress() {
        return Store.getters.chainInfo.tokenContract;
    }

    static getRouterAddress() {
        return Store.getters.chainInfo.routerContract;
    }
}