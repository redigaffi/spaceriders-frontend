import axios from 'axios';


export default class ApiRequests {

    static async authenticate(address, signature) {
        const body = {
            address: address,
            signature: signature
        }

        const path = `${process.env.BASE_API_PATH}/jwt`
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
        }

        const re = await axios.post(path, body);

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
        }

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
        }

        return await axios.post(path, body);
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
     * Gets all planets (claimed/unclaimed)
     */
    static async getAllPlanets() {
        const path = `${process.env.BASE_API_PATH}/planet/all`;
        return (await axios.get(path)).data;
    }

}
