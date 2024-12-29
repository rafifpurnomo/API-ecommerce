const express = require("express");
const router = express.Router();
const penjualController = require("../controllers/penjual.controller");

router.get('/getAllpenjual', penjualController.getAllpenjual);

module.exports = router;