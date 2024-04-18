const express = require("express");
const router = express.Router();
const { getCars } = require("../Controllers/car");

router.get("/carDetails", getCars);

module.exports = router;
