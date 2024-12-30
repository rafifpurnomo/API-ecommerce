const express = require('express')
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const keranjangController = require('../controllers/keranjang.controller')

router.get('/getKeranjang', verifyJWT, keranjangController.getKeranjangByIdPembeli);
router.post('/addkeranjang/:idproduk', verifyJWT, keranjangController.addKeranjang);
router.delete('/deletekeranjang/:id', verifyJWT, keranjangController.deleteBarangFromKeranjang);

module.exports = router;