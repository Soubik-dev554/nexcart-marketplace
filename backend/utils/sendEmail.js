const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // App Password mapping
      },
    });

    const mailOptions = {
      from: `"NEXCART Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,
      html: message,
    };

   const info = await transporter.sendMail(mailOptions);

console.log("Accepted:", info.accepted);
console.log("Rejected:", info.rejected);
console.log("Response:", info.response);
console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
  }
};

module.exports = sendEmail;
