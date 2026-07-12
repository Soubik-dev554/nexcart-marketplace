import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminAnalytics = () => {
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        totalSellers: 0,
        totalCustomers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        topSeller: "No Data Available",
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
                    setStats(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchAnalytics();
    }, [user]);

   return (
  <div
    style={{
      maxWidth: "1300px",
      margin: "40px auto",
      padding: "30px",
      color: "#fff",
    }}
  >
    <h1
      style={{
        color: "#f97316",
        marginBottom: "30px",
      }}
    >
      📊 Platform Analytics
    </h1>

   <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  }}
>

  <div
    style={{
      background: "#18181b",
      borderRadius: "15px",
      padding: "25px",
      border: "1px solid rgba(255,255,255,.08)"
    }}
  >
    <h3 style={{ color: "#a1a1aa" }}>
      🛍 Total Sellers
    </h3>

    <h1 style={{ color: "#f97316" }}>
      {stats.totalSellers}
    </h1>
  </div>
  <div
  style={{
    background: "#18181b",
    borderRadius: "15px",
    padding: "25px",
    border: "1px solid rgba(255,255,255,.08)"
  }}
>
  <h3 style={{ color: "#a1a1aa" }}>
    👥 Total Customers
  </h3>

  <h1 style={{ color: "#f97316" }}>
    {stats.totalCustomers}
  </h1>
</div>

<div
  style={{
    background: "#18181b",
    borderRadius: "15px",
    padding: "25px",
    border: "1px solid rgba(255,255,255,.08)"
  }}
>
  <h3 style={{ color: "#a1a1aa" }}>
    📦 Total Products
  </h3>

  <h1 style={{ color: "#f97316" }}>
    {stats.totalProducts}
  </h1>
</div>

<div
  style={{
    background: "#18181b",
    borderRadius: "15px",
    padding: "25px",
    border: "1px solid rgba(255,255,255,.08)"
  }}
>
  <h3 style={{ color: "#a1a1aa" }}>
    🛒 Total Orders
  </h3>

  <h1 style={{ color: "#f97316" }}>
    {stats.totalOrders}
  </h1>
</div>

<div
  style={{
    background: "#18181b",
    borderRadius: "15px",
    padding: "25px",
    border: "1px solid rgba(255,255,255,.08)"
  }}
>
  <h3 style={{ color: "#a1a1aa" }}>
    💰 Total Revenue
  </h3>

  <h1 style={{ color: "#f97316" }}>
    ₹{stats.totalRevenue}
  </h1>
</div>

<div
  style={{
    background: "#18181b",
    borderRadius: "15px",
    padding: "25px",
    border: "1px solid rgba(255,255,255,.08)"
  }}
>
  <h3 style={{ color: "#a1a1aa" }}>
    ⭐ Top Seller
  </h3>

  <h2 style={{ color: "#f97316" }}>
    {stats.topSeller}
  </h2>

  <p style={{ color: "#999" }}>
    Highest Revenue Seller
  </p>
</div>

</div>
  </div>
);
};

export default AdminAnalytics;