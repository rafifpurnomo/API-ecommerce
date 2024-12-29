const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post('/addPembeli', authController.createAccountPembeli);
router.post('/addPenjual', authController.createAccountPenjual);


module.exports = router;