import React from "react";

const textualStyle = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "40px",
  background: "#18181b",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.08)",
  lineHeight: "1.8",
  color: "#d4d4d8",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
};

const ReturnPolicy = () => {
  return (
    <div style={textualStyle}>
      <h2
        style={{
          color: "#fff",
          marginBottom: "20px",
          borderBottom: "2px solid #f97316",
          paddingBottom: "15px",
        }}
      >
        Return & Refund Policy
      </h2>

      <p style={{ marginBottom: "20px" }}>
        At <strong>NEXCART</strong>, customer satisfaction is our priority.
        If you are not completely satisfied with your purchase, you may
        request a return within <strong>7 days</strong> of receiving your
        order, subject to the conditions below.
      </p>

      <h4 style={{ color: "#f97316" }}>1. Eligibility for Returns</h4>

      <ul>
        <li>Item must be unused and in its original condition.</li>
        <li>Original packaging and accessories must be included.</li>
        <li>Proof of purchase or order confirmation is required.</li>
        <li>Products damaged due to misuse are not eligible.</li>
      </ul>

      <h4 style={{ color: "#f97316", marginTop: "25px" }}>
        2. Refund Process
      </h4>

      <p>
        Once we receive and inspect the returned item, you will receive an
        email regarding the approval or rejection of your refund. Approved
        refunds are processed to the original payment method within
        <strong> 5–7 business days</strong>.
      </p>

      <h4 style={{ color: "#f97316", marginTop: "25px" }}>
        3. Non-Returnable Items
      </h4>

      <ul>
        <li>Digital products and downloadable software.</li>
        <li>Gift cards.</li>
        <li>Perishable goods.</li>
        <li>Customized or personalized products.</li>
        <li>Items damaged after delivery due to customer negligence.</li>
      </ul>

      <h4 style={{ color: "#f97316", marginTop: "25px" }}>
        4. Shipping Charges
      </h4>

      <p>
        Customers are responsible for return shipping costs unless the product
        was received damaged or an incorrect item was delivered by NEXCART.
      </p>

      <h4 style={{ color: "#f97316", marginTop: "25px" }}>
        5. Need Help?
      </h4>

      <p>
        For any return or refund queries, contact our support team at:
      </p>

      <p
        style={{
          color: "#f97316",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        📧 support@nexcart.com
      </p>
    </div>
  );
};

export default ReturnPolicy;