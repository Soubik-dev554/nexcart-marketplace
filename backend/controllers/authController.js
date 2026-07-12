const User = require('../models/User');
const PendingUser = require('../models/PendingUser');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');
const Product = require("../models/Product");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Check if OTP is already pending
    const existingPending = await PendingUser.findOne({
      email: normalizedEmail,
    });

    if (existingPending) {
      await PendingUser.deleteOne({ email: normalizedEmail });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP expires in 5 minutes
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    // Save Pending User
    await PendingUser.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    // Send OTP Email
    const message = `
      <h2>Verify Your NEXCART Account</h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>Your OTP is:</p>

      <h1 style="letter-spacing:5px;">${otp}</h1>

      <p>This OTP will expire in <strong>5 minutes</strong>.</p>

      <p>If you did not request this, please ignore this email.</p>
    `;

    await sendEmail({
      email: normalizedEmail,
      subject: "NEXCART - Email Verification OTP",
      message,
    });

    res.status(200).json({
      message: "OTP sent successfully",
      email: normalizedEmail,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const pendingUser = await PendingUser.findOne({
      email: normalizedEmail,
    });

    if (!pendingUser) {
      return res.status(404).json({
        message: "Registration not found. Please register again.",
      });
    }

    // OTP expired?
    if (pendingUser.otpExpires < new Date()) {
      await PendingUser.deleteOne({ email: normalizedEmail });

      return res.status(400).json({
        message: "OTP has expired. Please register again.",
      });
    }

    // OTP incorrect?
    if (pendingUser.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Create verified user
    const user = await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
    });

    // Remove pending registration
    await PendingUser.deleteOne({
      email: normalizedEmail,
    });

    // Send welcome email
    const message = `
      <h2>Welcome to NEXCART!</h2>
      <p>Hello <strong>${user.name}</strong>,</p>
      <p>Your email has been successfully verified.</p>
      <p>Your account is now active.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "Welcome to NEXCART",
      message,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const pendingUser = await PendingUser.findOne({
      email: normalizedEmail,
    });

    if (!pendingUser) {
      return res.status(404).json({
        message: "Please register first.",
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    pendingUser.otp = otp;
    pendingUser.otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await pendingUser.save();

    const message = `
      <h2>NEXCART OTP Verification</h2>

      <p>Hello <strong>${pendingUser.name}</strong>,</p>

      <p>Your new OTP is:</p>

      <h1 style="letter-spacing:5px">${otp}</h1>

      <p>This OTP is valid for <strong>5 minutes</strong>.</p>
    `;

    await sendEmail({
      email: pendingUser.email,
      subject: "NEXCART - Resend OTP",
      message,
    });

    res.json({
      message: "OTP resent successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail
    });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      console.log("Password match:", match);

      if (match) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id)
        });
      }
    }

    res.status(401).json({ message: "Invalid email or password" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    const usersWithProductCount = await Promise.all(
      users.map(async (user) => {
        const productCount = await Product.countDocuments({
          seller: user._id,
        });

        return {
          ...user.toObject(),
          productCount,
        };
      })
    );

    res.json(usersWithProductCount);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// const getSellerCustomers = async (req, res) => {
//   console.log("✅ getSellerCustomers called");
//   return res.json([]);
// };
const getSellerCustomers = async (req, res) => {
  try {
    console.log("Seller:", req.user.email);

    const orders = await Order.find({
      "items.seller": req.user._id,
    });

    console.log("Orders found:", orders.length);

    const customerIds = [
      ...new Set(orders.map(order => order.userId.toString()))
    ];

    const customers = await User.find({
      _id: { $in: customerIds }
    }).select("-password");

    res.json(customers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { registerUser, verifyOTP, resendOTP, loginUser, getUsers, getSellerCustomers, deleteUser };
