const mysqlDb = require("../config/db");

//to get all types of vehicles
const getVehicleType = async (req, res) => {
  try {
    const [types] = await mysqlDb.query("SELECT DISTINCT type FROM vehicles");
    const vehicleTypes = types.map((row) => row.type);
    res.json(vehicleTypes);
  } catch (error) {
    console.error("Error fetching car types:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//to get all Brands of vehicles
const getVehicleBrand = async (req, res) => {
  try {
    const [brands] = await mysqlDb.query("SELECT DISTINCT brand FROM vehicles");
    const vehicleBrands = brands.map((row) => row.brand);
    res.json(vehicleBrands);
  } catch (error) {
    console.error("Error fetching car types:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// to get all model of vehicles
const getVehicleModel = async (req, res) => {
  try {
    const [models] = await mysqlDb.query("SELECT DISTINCT model FROM vehicles");
    const vehicleModel = models.map((row) => row.model);
    res.json(vehicleModel);
  } catch (error) {
    console.error("Error fetching car types:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getVehicleType, getVehicleBrand, getVehicleModel };
