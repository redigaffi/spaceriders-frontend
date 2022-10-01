import ResourceType from "./ResourceType";
import InstallationType from "./InstallationType";
import ResearchType from "./ResearchType";
import DefenseType from "./DefenseType";

class Types {
  RESOURCE_TYPE = ResourceType.TYPE;
  INSTALLATION_TYPE = InstallationType.TYPE;
  RESEARCH_TYPE = ResearchType.TYPE;
  DEFENSE_TYPE = DefenseType.TYPE;

  TYPES = [
    this.RESOURCE_TYPE,
    this.INSTALLATION_TYPE,
    this.RESEARCH_TYPE,
    this.DEFENSE_TYPE,
  ];

  MAPPING = {
    resources: ResourceType,
    installations: InstallationType,
    research: ResearchType,
    defense: DefenseType,
  };
}

export default new Types();
export { ResourceType };
