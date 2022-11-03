class InstallationType {
  INVESTIGATION_LABORATORY = "investigationLaboratory";
  HANGAR = "hangar";
  TYPE = "installations";
  RESOURCE_TYPES = [this.INVESTIGATION_LABORATORY, this.HANGAR];

  NAME_MAPPING = new Map([
    [this.INVESTIGATION_LABORATORY, "Investigation Laboratory"],
    [this.HANGAR, "Hangar"],
  ]);


}

export default new InstallationType();
