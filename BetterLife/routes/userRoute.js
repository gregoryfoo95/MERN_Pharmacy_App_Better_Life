const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/userController');

// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.post("/forgotpassword", usersCtrl.forgotPassword);
router.put("/resetpassword/:resetToken", usersCtrl.resetPassword);
router.put("/:id", usersCtrl.updateUserById);
router.get("/:id", usersCtrl.getUserById);
module.exports = router;