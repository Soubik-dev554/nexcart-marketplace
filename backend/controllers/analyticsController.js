const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getAnalytics = async (req, res) => {
  try {

    // ---------------- SUPER ADMIN ----------------
    if (req.user.role === "superadmin") {

      const totalSellers = await User.countDocuments({ role: "admin" });
      const totalCustomers = await User.countDocuments({ role: "user" });
      const totalProducts = await Product.countDocuments();
      const totalOrders = await Order.countDocuments();

      const orders = await Order.find().populate("items.seller", "name");

      let totalRevenue = 0;
      const sellerRevenue = {};

      orders.forEach(order => {
        totalRevenue += order.totalAmount;

        order.items.forEach(item => {
          if (!item.seller) return;

          const sellerId = item.seller._id.toString();

          if (!sellerRevenue[sellerId]) {
            sellerRevenue[sellerId] = {
              name: item.seller.name,
              revenue: 0,
            };
          }

          sellerRevenue[sellerId].revenue += item.price * item.qty;
        });
      });

      let topSeller = "No Data";
      let maxRevenue = 0;

      Object.values(sellerRevenue).forEach(seller => {
        if (seller.revenue > maxRevenue) {
          maxRevenue = seller.revenue;
          topSeller = seller.name;
        }
      });

      return res.json({
        totalSellers,
        totalCustomers,
        totalProducts,
        totalOrders,
        totalRevenue,
        topSeller,
      });
    }

    // ---------------- SELLER ----------------

    const totalProducts = await Product.countDocuments({
      seller: req.user._id
    });

    const orders = await Order.find({
      "items.seller": req.user._id
    });

    const totalOrders = orders.length;

    const customerIds = [
      ...new Set(orders.map(order => order.userId.toString()))
    ];

    const totalUsers = customerIds.length;

    let totalRevenue = 0;

    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.seller.toString() === req.user._id.toString()) {
          totalRevenue += item.price * item.qty;
        }
      });
    });

    return res.json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { getAnalytics };