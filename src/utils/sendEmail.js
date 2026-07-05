import transporter from "../config/mail.js";

export const sendAdminEmail = async ({
  subject,
  html,
}) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.WEBSITE_NAME}" <${process.env.MAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject,
      html,
    });

    console.log("✅ Admin Email Sent");
  } catch (error) {
    console.error("❌ Email Error:", error);
  }
};