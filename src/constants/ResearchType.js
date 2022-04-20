class ResearchType {
    TYPE = "research";
    
    LASER_RESEARCH = "laserResearch";
    ASTEROID_PRECISION = "asteroidPrecision"
    TERRAFORMING = "terraforming"
    
    RESOURCE_TYPES = [
        this.LASER_RESEARCH,
        this.ASTEROID_PRECISION,
        this.TERRAFORMING,
    ];
}

export default new ResearchType();
