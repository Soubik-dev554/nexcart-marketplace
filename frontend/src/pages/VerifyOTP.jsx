import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const email = location.state?.email;
  useEffect(() => {
  if (timer <= 0) return;

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);

  const handleResendOTP = async () => {
  try {
    const res = await fetch("/api/auth/resend-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("A new OTP has been sent to your email.");
      setTimer(60);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to resend OTP.");
  }
};

  const handleVerify = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      login(data);

      alert("Email verified successfully!");

      navigate("/profile");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Invalid Access
      </h2>
    );
  }

  return (
    <div style={{ maxWidth: "450px", margin: "80px auto" }}>
      <h2>Email Verification</h2>

      <p>
        Enter the OTP sent to
        <br />
        <strong>{email}</strong>
      </p>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        <p style={{ marginTop: "20px", textAlign: "center" }}>
  Didn't receive the OTP?
</p>

<button
  type="button"
  onClick={handleResendOTP}
  disabled={timer > 0}
  style={{
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: timer > 0 ? "#71717a" : "#3f3f46",
    color: "#fff",
    cursor: timer > 0 ? "not-allowed" : "pointer",
  }}
>
  {timer > 0 ? `Resend OTP (${timer}s)` : "Resend OTP"}
</button>
      </form>
    </div>
  );
};

export default VerifyOTP;