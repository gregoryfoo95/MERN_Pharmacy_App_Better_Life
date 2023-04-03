const express = require("express");
const router = express.Router();
const orderCartController = require('../controllers/orderCartController');

router.get("/", orderCartController.getCart);
router.post("/", orderCartController.addToCart);
//router.delete("/:id", orderCartController.removeFromCart);
//router.put("/:id", orderCartController.updateCart);

module.exports = router;