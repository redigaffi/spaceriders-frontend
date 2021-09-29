class ResourceType {
  PETROL = "petrol";
  METAL = "metal";
  CRYSTAL = "crystal";
  METAL_MINE = "metalMine";
  CRYSTAL_MINE = "crystalMine";
  PETROL_MINE = "petrolMine";
  SOLAR_PLANT = "solarPlant";
  METAL_WAREHOUSE = "metalWarehouse";
  CRYSTAL_WAREHOUSE = "crystalWarehouse";
  PETROL_WAREHOUSE = "petrolWarehouse";
  TYPE = "resources";
  RESOURCE_TYPES = [
    this.METAL_MINE,
    this.CRYSTAL_MINE,
    this.PETROL_MINE,
    this.SOLAR_PLANT,
    this.METAL_WAREHOUSE,
    this.CRYSTAL_WAREHOUSE,
    this.PETROL_WAREHOUSE,
  ];
}

export default new ResourceType();