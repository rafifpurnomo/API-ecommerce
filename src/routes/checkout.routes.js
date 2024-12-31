const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkout.controller");
const verifyJWT = require("../middleware/verifyJWT");

router.post(
  "/addCheckout/:idproduk",
  verifyJWT,
  checkoutController.addCheckout
);
router.get("/getCheckout", verifyJWT, checkoutController.getCheckout);
router.patch(
  "/updateStatusCheckout/:id",
  verifyJWT,
  checkoutController.updateStatus
);

module.exports = router