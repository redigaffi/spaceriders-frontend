class DefenseType {
  MISSILE_LAUNCHER = "missileLauncher";

  LASER_LAUNCHER = "laserLauncher"

  TYPE = "defense";
  RESOURCE_TYPES = [this.MISSILE_LAUNCHER];

  NAME_MAPPING = new Map([
    [this.MISSILE_LAUNCHER, "Missile Launcher"],
    [this.LASER_LAUNCHER, "Laser Launcher"],
  ]);

}

export default new DefenseType();
