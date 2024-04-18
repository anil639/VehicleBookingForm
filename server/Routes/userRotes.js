const express = require("express");
const router = express.Router();
const { addUser, getUserDatas } = require("../Controllers/users");

//Routes for users
router.post("/addUser", addUser);
router.get("/userDetils", getUserDatas);

module.exports = router;
