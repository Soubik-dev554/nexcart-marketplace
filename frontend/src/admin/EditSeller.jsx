import React, { useState } from "react";

const EditSeller = () => {
  const [seller, setSeller] = useState({
    name: "",
    email: "",
    status: "Active",
  });

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        color: "#fff",
      }}
    >
      <h1 style={{ color: "#f97316", marginBottom: "25px" }}>
        ✏️ Edit Seller
      </h1>

      <div
        style={{
          background: "#18181b",
          padding: "30px",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <label>🏪 Seller Name</label>

        <input
          type="text"
          value={seller.name}
          onChange={(e) =>
            setSeller({
              ...seller,
              name: e.target.value,
            })
          }
        />

        <label>📧 Email</label>

        <input
          type="email"
          value={seller.email}
          onChange={(e) =>
            setSeller({
              ...seller,
              email: e.target.value,
            })
          }
        />

        <label>🟢 Status</label>

        <select
          value={seller.status}
          onChange={(e) =>
            setSeller({
              ...seller,
              status: e.target.value,
            })
          }
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button className="btn">
          💾 Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditSeller;