import ResourceType from "./ResourceType";
import InstallationType from "./InstallationType";
import ResearchType from "./ResearchType";

class Types {
    RESOURCE_TYPE = ResourceType.TYPE;
    INSTALLATION_TYPE = InstallationType.TYPE;
    RESEARCH_TYPE = ResearchType.TYPE;

    TYPES = [
        this.RESOURCE_TYPE,
        this.INSTALLATION_TYPE,
        this.RESEARCH_TYPE
    ]

    MAPPING = {
        "resources": ResourceType,
        "installations": InstallationType,
        "research": ResearchType
    }


};


export default new Types();
export {
    ResourceType
}