export default class ContractAddress {
    static getPlanetManagementAddress() {
        return this.removeSingleOrDoubleQuotes(process.env.PLANET_MANAGEMENT_CONTRACT_ADDRESS);
    }

    static getTokenManagementAddress() {
        return this.removeSingleOrDoubleQuotes(process.env.TOKEN_MANAGEMENT_CONTRACT_ADDRESS);
    }


    static getBenefitStakingAddress() {
        return this.removeSingleOrDoubleQuotes(process.env.BENEFIT_STAKING_CONTRACT_ADDRESS);
    }

    static removeSingleOrDoubleQuotes(str) {
        return str.replace(/['"]+/g, '');
    }
}