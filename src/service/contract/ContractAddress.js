export default class ContractAddress {
    static getPlanetManagementAddress() {
        return this.removeSingleOrDoubleQuotes(process.env.PLANET_MANAGEMENT_CONTRACT_ADDRESS);
    }

    static removeSingleOrDoubleQuotes(str) {
        return str.replace(/['"]+/g, '');
    }
}