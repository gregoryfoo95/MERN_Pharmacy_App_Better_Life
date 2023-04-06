const express = require("express");
const router = express.Router();
const orderCartController = require('../controllers/orderCartController');

router.get("/", orderCartController.getCart);
router.post("/", orderCartController.addToCart);
router.put("/", orderCartController.updateCart);
router.delete("/:medicineId", orderCartController.deleteCart);

module.exports = router;