const express = require("express");
const router = express.Router();
const produkController = require("../controllers/produk.controller");
const verifyJWT = require("../middleware/verifyJWT");
const multer = require("../middleware/multer");

router.get("/getAll", produkController.getAllProduk);
router.get(
  "/getProdukBY/:id_penjual",
  produkController.getAllProdukByIdPenjual
);
router.post(
  "/addProduk",
  multer.single("foto_produk"),
  verifyJWT,
  produkController.addProduk
);
router.delete("/delete/:id", verifyJWT, produkController.deleteProduk);

module.exports = router;
