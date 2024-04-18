const express = require("express");
const router = express.Router();
const {
  getVehicleType,
  getVehicleBrand,
  getVehicleModel,
} = require("../Controllers/vehicle");

//Routes forr Vehicle

router.get("/types", getVehicleType);
router.get("/brands", getVehicleBrand);
router.get("/models", getVehicleModel);

module.exports = router;
