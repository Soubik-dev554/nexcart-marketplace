import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminSellers = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [sellers, setSellers] = useState([]);
    useEffect(() => {
        if (!user) return;

        const fetchSellers = async () => {
            try {
                const res = await fetch("/api/auth/users", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                const data = await res.json();

                const sellerList = Array.isArray(data)
                    ? data.filter((u) => u.role === "admin")
                    : [];

                setSellers(sellerList);

            } catch (error) {
                console.error(error);
            }
        };

        fetchSellers();
    }, [user]);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this seller?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/auth/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);

                setSellers(sellers.filter((seller) => seller._id !== id));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div
            style={{
                maxWidth: "1200px",
                margin: "40px auto",
                padding: "30px",
                color: "#fff",
            }}
        >
            <h1 style={{ color: "#f97316", marginBottom: "25px" }}>
                🏪 Seller Management
            </h1>

            <div
                style={{
                    background: "#18181b",
                    borderRadius: "15px",
                    padding: "25px",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={th}>Seller</th>
                            <th style={th}>Email</th>
                            <th style={th}>Products</th>
                            <th style={th}>Status</th>
                            <th style={th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller._id}>
                                <td style={td}>{seller.name}</td>
                                <td style={td}>{seller.email}</td>
                                <td style={td}>{seller.productCount}</td>
                                <td style={td}>
                                    <span
                                        style={{
                                            background: "#16a34a",
                                            color: "#fff",
                                            padding: "5px 12px",
                                            borderRadius: "20px",
                                            fontSize: "13px",
                                        }}
                                    >
                                        Active
                                        {/* {seller.status} */}
                                    </span>
                                </td>

                                <td style={td}>
                                    <button
                                        style={editBtn}
                                        onClick={() => navigate(`/super-admin/edit-seller/${seller._id}`)}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        style={deleteBtn}
                                        onClick={() => handleDelete(seller._id)}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const th = {
    textAlign: "left",
    padding: "15px",
    color: "#f97316",
};

const td = {
    padding: "15px",
    borderTop: "1px solid #2c2c2c",
};

const editBtn = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
};

const deleteBtn = {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
};

export default AdminSellers;