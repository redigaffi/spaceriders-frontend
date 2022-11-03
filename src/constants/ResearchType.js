class ResearchType {
  TYPE = "research";

  LASER_RESEARCH = "laserResearch";
  ASTEROID_PRECISION = "asteroidPrecision";
  TERRAFORMING = "terraforming";

  NAME_MAPPING = new Map([
    [this.LASER_RESEARCH, "Laser Research"],
    [this.ASTEROID_PRECISION, "Asteroid Precision"],
    [this.TERRAFORMING, "Terraforming"],
  ]);


  RESOURCE_TYPES = [
    this.LASER_RESEARCH,
    this.ASTEROID_PRECISION,
    this.TERRAFORMING,
  ];
}

export default new ResearchType();
