const express = require('express');
const { registerUser, verifyOTP,  resendOTP, loginUser, getUsers, getSellerCustomers, deleteUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", loginUser);

router.get('/users', protect, admin, getUsers);
router.get('/seller-customers', protect, admin, getSellerCustomers);

router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;
