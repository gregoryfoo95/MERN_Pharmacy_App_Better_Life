const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/userController');

// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.post("/forgotpassword", usersCtrl.forgotPassword);
router.put("/resetpassword/:resetToken", usersCtrl.resetPassword);

module.exports = router;