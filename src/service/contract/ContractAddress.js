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

    static getEnergyDepositAddress() {
        return this.removeSingleOrDoubleQuotes(process.env.ENERGY_DEPOSIT_CONTRACT_ADDRESS);
    }

    static getSpaceRidersAddress() {
        return this.removeSingleOrDoubleQuotes(process.env.SPACERIDERS_TOKEN_CONTRACT_ADDRESS);
    }

    static removeSingleOrDoubleQuotes(str) {
        return str.replace(/['"]+/g, '');
    }
}