import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const cardStyle = {
  padding: "25px",
  background: "#18181b",
  borderRadius: "12px",
  textAlign: "center",
  color: "white",
};

const buttonStyle = {
  padding: "12px 20px",
  background: "#f97316",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalSellers: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  useEffect(() => {
    if (!user) return;

    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats({
            totalSellers: data.totalSellers,
            totalCustomers: data.totalCustomers,
            totalProducts: data.totalProducts,
            totalRevenue: data.totalRevenue,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnalytics();
  }, [user]);
  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>

      <h1>🛡️ Super Admin Dashboard</h1>
      <p style={{ color: "#999" }}>
        Welcome, Platform Administrator
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Sellers</h3>
          <h1>{stats.totalSellers}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Customers</h3>
          <h1>{stats.totalCustomers}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Products</h3>
          <h1>{stats.totalProducts}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <h1>₹{stats.totalRevenue}</h1>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "#18181b",
          padding: "25px",
          borderRadius: "12px",
        }}
      >
        <h2>Platform Management</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <button
            className="btn"
            onClick={() => navigate("/super-admin/sellers")}
          >
            🏪 Manage Sellers
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/admin/products")}
          >
            📦 View Products
          </button>

          <button
            style={buttonStyle}
            onClick={() => navigate("/admin/orders")}
          >
            🛒 View Orders
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/admin/customers")}
          >
            👤 Customers
          </button>
          <button
            style={buttonStyle} onClick={() => navigate("/super-admin/analytics")}
          >📊 Analytics
          </button>

          <button
            style={buttonStyle} onClick={() => navigate("/super-admin/settings")}
          >⚙️ Platform Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;