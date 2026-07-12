import React, { useState } from "react";
const PlatformSettings = () => {
    const [settings, setSettings] = useState({
  websiteName: "NEXCART",
  supportEmail: "support@nexcart.com",
  customerCare: "+91 9876543210",
  deliveryCharge: "50",
  gst: "18",
  platformStatus: "Online",
});
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        color: "#fff",
      }}
    >
      <h1 style={{ color: "#f97316", marginBottom: "30px" }}>
        ⚙️ Platform Settings
      </h1>

      <div
  style={{
    background: "#18181b",
    padding: "30px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,.08)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  }}
>
  <label>🏪 Website Name</label>
  <input
    type="text"
    value={settings.websiteName}
    onChange={(e) =>
      setSettings({
        ...settings,
        websiteName: e.target.value,
      })
    }
  />

  <label>📧 Support Email</label>
  <input
    type="email"
    value={settings.supportEmail}
    onChange={(e) =>
      setSettings({
        ...settings,
        supportEmail: e.target.value,
      })
    }
  />

  <label>📞 Customer Care</label>
  <input
    type="text"
    value={settings.customerCare}
    onChange={(e) =>
      setSettings({
        ...settings,
        customerCare: e.target.value,
      })
    }
  />
  <label>🚚 Delivery Charge (₹)</label>
<input
  type="number"
  value={settings.deliveryCharge}
  onChange={(e) =>
    setSettings({
      ...settings,
      deliveryCharge: e.target.value,
    })
  }
/>

<label>💰 GST (%)</label>
<input
  type="number"
  value={settings.gst}
  onChange={(e) =>
    setSettings({
      ...settings,
      gst: e.target.value,
    })
  }
/>

<label>🌐 Platform Status</label>
<select
  value={settings.platformStatus}
  onChange={(e) =>
    setSettings({
      ...settings,
      platformStatus: e.target.value,
    })
  }
>
  <option>Online</option>
  <option>Maintenance</option>
</select>

<button
  className="btn"
  style={{ marginTop: "20px" }}
  onClick={() => alert("Settings saved successfully!")}
>
  💾 Save Changes
</button>
</div>
    </div>
  );
};

export default PlatformSettings;