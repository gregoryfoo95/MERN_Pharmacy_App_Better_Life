const express = require('express');
const router = express.Router();
const getMedicineCtrl = require('../controllers/getMedicine');

router.get("/", getMedicineCtrl.data)
//router.get("/seed", getMedicineCtrl.seed);

module.exports = router;