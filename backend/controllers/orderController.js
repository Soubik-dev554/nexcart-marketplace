const Order = require('../models/Order');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');

const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;
    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const orderItems = [];

      for (const item of items) {
        const product = await Product.findById(item.productId);

        if (!product) {
          return res.status(404).json({
            message: `Product not found: ${item.productId}`,
          });
        }

        // Check stock availability
        if (product.stock < item.qty) {
          return res.status(400).json({
            message: `${product.name} is out of stock`,
          });
        }

        // Reduce stock
        product.stock -= item.qty;
        await product.save();

        orderItems.push({
          productId: product._id,
          seller: product.seller,
          qty: item.qty,
          price: item.price,
        });
      }
      const order = new Order({
        userId: req.user._id,
        items: orderItems,
        totalAmount,
        address,
        paymentId
      });
      const createdOrder = await order.save();

      // Send Order Confirmation Email
      const message = `
        <h2>Order Confirmation</h2>
        <p>Hello ${req.user.name},</p>
        <p>Your order has been successfully placed! Order ID: <strong>${createdOrder._id}</strong></p>
        <p><strong>Total Amount Paid:</strong> ₹${totalAmount.toLocaleString("en-IN")}</p>        <p>It will be shipped to: ${address.street}, ${address.city}</p>
        <p>Thank you for shopping with NEXCART!</p>
      `;

      await sendEmail({
        email: req.user.email,
        subject: 'NEXCART - Order Confirmation',
        message
      });

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('userId', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.seller": req.user._id,
    }).populate("userId", "name email");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();

    // ---------------- SHIPPED EMAIL ----------------
    if (updatedOrder.status === "Shipped") {
      const message = `
        <h2>🚚 Your Order Has Been Shipped</h2>

        <p>Hello <strong>${order.userId.name}</strong>,</p>

        <p>Your order is now on the way.</p>

        <p>
          <strong>Order ID:</strong> ${order._id}
        </p>

        <p>
          <strong>Total Amount:</strong> ₹${order.totalAmount.toFixed(2)}
        </p>

        <p>
          You can check your order status anytime from your NEXCART account.
        </p>

        <p>Thank you for shopping with NEXCART ❤️</p>
      `;

      await sendEmail({
        email: order.userId.email,
        subject: "NEXCART - Your Order Has Been Shipped 🚚",
        message,
      });
    }

    // ---------------- DELIVERED EMAIL ----------------
    if (updatedOrder.status === "Delivered") {
      const message = `
        <h2>📦 Order Delivered Successfully</h2>

        <p>Hello <strong>${order.userId.name}</strong>,</p>

        <p>
          Great news! Your order has been successfully delivered.
        </p>

        <p>
          <strong>Order ID:</strong> ${order._id}
        </p>

        <p>
          <strong>Total Amount:</strong> ₹${order.totalAmount.toFixed(2)}
        </p>

        <p>
          We hope you enjoy your purchase.
        </p>

        <p>
          Thank you for choosing <strong>NEXCART</strong>.
        </p>

        <h3>⭐⭐⭐⭐⭐</h3>

        <p>We look forward to serving you again.</p>
      `;

      await sendEmail({
        email: order.userId.email,
        subject: "NEXCART - Order Delivered 📦",
        message,
      });
    }

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { addOrderItems, getMyOrders, getOrders, getSellerOrders, updateOrderStatus };
