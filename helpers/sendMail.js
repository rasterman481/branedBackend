const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const User = require("../model/userSchema.js");

const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      // service: process.env.EMAIL_SERVICE,
      host: process.env.SMTP_HOST,
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "dev.aakashjyoti@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email." : "Reset your password.",
      html: `<p>Click 
        <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyEmail" : "createNewPassword"
      }?token=${hashedToken}">here</a>
        to ${
          emailType === "VERIFY" ? "Verify your email." : "Reset your password."
        }
        or copy paste the link in browser.
        <br>${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyEmail" : "createNewPassword"
      }?token=${hashedToken}</br>
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  sendEmail,
};
