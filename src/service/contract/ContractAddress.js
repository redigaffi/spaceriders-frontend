export default class ContractAddress {
    static getSpaceRidersGameAddress() {
        return this.removeSingleOrDoubleQuotes(process.env.SPACERIDERS_GAME_CONTRACT_ADDRESS);
    }

    static getSpaceRidersAddress() {
        return this.removeSingleOrDoubleQuotes(process.env.SPACERIDERS_TOKEN_CONTRACT_ADDRESS);
    }

    static removeSingleOrDoubleQuotes(str) {
        return str.replace(/['"]+/g, '');
    }
}