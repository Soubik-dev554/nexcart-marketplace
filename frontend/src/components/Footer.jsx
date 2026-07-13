import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg,#0b1120,#09090b)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "50px 20px 20px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "40px",
        }}
      >
        {/* Brand */}

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "15px",
            }}
          >
            <img
              src="/NEXCARTLogo.png"
              alt="NEXCART"
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "10px",
                marginRight: "12px"
              }}
            />

            <h2
              style={{
                color: "#fff",
                margin: 0,
                fontSize: "2rem",
              }}
            >
              NEXCART
            </h2>
          </div>

          <p
            style={{
              color: "#a1a1aa",
              lineHeight: "28px",
            }}
          >
            Premium E-Commerce Platform.
          </p>

          <div
            style={{
              marginTop: "18px",
              color: "#d4d4d8",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span>🛡 Secure Shopping</span>
            <span>🚚 Fast Delivery</span>
            <span>🎧 24/7 Customer Support</span>
          </div>
        </div>

        {/* Quick Links */}

        <div>
          <h3 style={{ color: "#f97316" }}>Quick Links</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "15px",
            }}
          >
            <Link to="/return-policy" style={linkStyle}>
              Return Policy
            </Link>

            <Link to="/disclaimer" style={linkStyle}>
              Disclaimer
            </Link>

            <Link to="/shop" style={linkStyle}>
              Shop
            </Link>
          </div>
        </div>

        {/* Facebook */}

        <div>
          <h3 style={{ color: "#f97316" }}>Connect With Us</h3>

          <div
            style={{
              marginTop: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <a
              href="https://www.facebook.com/share/1ENtKChmdc/"

              target="_blank"
              rel="noreferrer"
              style={linkStyle}
            >
              📘 Facebook
            </a>

            <p
              style={{
                color: "#a1a1aa",
                lineHeight: "28px",
              }}
            >
              Follow our Facebook page for the latest products,
              offers and announcements.
            </p>
          </div>
        </div>

        {/* Contact */}

        <div>
          <h3 style={{ color: "#f97316" }}>Contact Us</h3>

          <div
            style={{
              marginTop: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <a
              href="mailto:support@nexcart.com"
              style={linkStyle}
            >
              📧 support@nexcart.com
            </a>

            <a
              href="mailto:nexcart34@gmail.com"
              style={linkStyle}
            >
              💼 Business: nexcart34@gmail.com
            </a>
            <p
              style={{
                color: "#a1a1aa",
                lineHeight: "28px",
              }}
            >
              Need help? Our support team is always ready to assist you.
            </p>
          </div>
        </div>
      </div>

      <hr
        style={{
          border: 0,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          margin: "40px 0 20px",
        }}
      />

      <p
        style={{
          textAlign: "center",
          color: "#71717a",
        }}
      >
        © {new Date().getFullYear()} NEXCART. All rights reserved.
      </p>
    </footer>
  );
};

const linkStyle = {
  color: "#d4d4d8",
  textDecoration: "none",
  transition: "0.3s",
};

export default Footer;