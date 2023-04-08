const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/userController');
const protect = require('../utils/middleware/authMiddleware')

// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.post("/forgotpassword", usersCtrl.forgotPassword);
router.put("/resetpassword/:resetToken", usersCtrl.resetPassword);
router.put("/:id",protect, usersCtrl.updateUserById);
router.get("/:id",protect, usersCtrl.getUserById);
module.exports = router;