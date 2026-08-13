// Professional HTML Email Template Service for SGIT AUTONOMOUS

const sendOTPEmail = async (email, otpCode, purpose = 'Verification') => {
  console.log(`[Email Service] Sending ${purpose} OTP to ${email}: ${otpCode}`);
  // In production, integrate with Nodemailer / SendGrid / AWS SES
  return true;
};

const getOTPEmailHTML = (otpCode, purpose = 'Account Verification') => {
  return `
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; background-color: #09090b; color: #ffffff; padding: 2rem; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(227, 30, 36, 0.3);">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h1 style="color: #E31E24; font-size: 2rem; margin: 0; font-weight: 800; letter-spacing: -0.02em;">SGIT AUTONOMOUS</h1>
        <p style="color: #a1a1aa; font-size: 0.85rem; margin-top: 0.25rem;">College Career & Learning Ecosystem</p>
      </div>
      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 2rem; border-radius: 12px; text-align: center;">
        <h2 style="font-size: 1.25rem; margin-bottom: 1rem; color: #ffffff;">${purpose}</h2>
        <p style="color: #d4d4d8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
          Your 6-digit Security Verification Code is:
        </p>
        <div style="font-size: 2.8rem; font-weight: 800; color: #E31E24; letter-spacing: 0.25em; background: rgba(227, 30, 36, 0.1); padding: 0.75rem 1.5rem; border-radius: 10px; display: inline-block; border: 1px solid rgba(227, 30, 36, 0.4);">
          ${otpCode}
        </div>
        <p style="color: #71717a; font-size: 0.8rem; margin-top: 1.5rem;">
          This verification code expires in 10 minutes. Please do not share this OTP with anyone.
        </p>
      </div>
      <div style="text-align: center; margin-top: 2rem; font-size: 0.75rem; color: #71717a;">
        © ${new Date().getFullYear()} SGIT AUTONOMOUS. All Rights Reserved.
      </div>
    </div>
  `;
};

module.exports = { sendOTPEmail, getOTPEmailHTML };
