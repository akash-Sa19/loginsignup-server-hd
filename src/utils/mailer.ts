import nodemailer from "nodemailer";

export const sendOtpEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"Signup System" <no-reply@example.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  });
};
