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

  NAME_MAPPING = new Map([
    [this.METAL_MINE, "Metal Mine"],
    [this.CRYSTAL_MINE, "Crystal Mine"],
    [this.PETROL_MINE, "Petrol Mine"],
    [this.METAL_WAREHOUSE, "Metal Warehouse"],
    [this.CRYSTAL_WAREHOUSE, "Crystal Warehouse"],
    [this.PETROL_WAREHOUSE, "Petrol Warehouse"],
  ]);

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
