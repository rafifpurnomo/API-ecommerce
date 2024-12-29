const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.get('/getAllAdmin', adminController.getAllAdmin);
router.post('/addAdmin', adminController.createAccountAdmin);


module.exports = router;