const express = require("express");
const router = express.Router();
const pembeliController = require("../controllers/pembeli.controller");

router.get('/getAllPembeli', pembeliController.getAllPembeli);

module.exports = router;