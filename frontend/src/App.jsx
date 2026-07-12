import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';
import ReturnPolicy from './pages/ReturnPolicy';
import AdminDashboard from './admin/AdminDashboard';
import SuperAdminDashboard from "./admin/SuperAdminDashboard";
import AdminCustomers from './admin/AdminCustomers';
import AdminAnalytics from "./admin/AdminAnalytics";
import PlatformSettings from "./admin/PlatformSettings";
import EditSeller from "./admin/EditSeller";
import AddProduct from './admin/AddProduct';
import AdminProducts from './admin/AdminProducts';
import EditProduct from './admin/EditProduct';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';
import AdminSellers from "./admin/AdminSellers";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/about" element={<About />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/return" element={<ReturnPolicy />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/edit-seller/:id" element={<EditSeller />} />
          <Route path="/super-admin/analytics" element={<AdminAnalytics />} />
          <Route path="/super-admin/settings" element={<PlatformSettings />} />
          <Route path="/super-admin/sellers" element={<AdminSellers />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/seller/products" element={<AdminProducts />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/seller/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/seller/users" element={<AdminCustomers />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
