"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
    };
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.error(`Error sending email: ${err}`);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
};
exports.sendOtpEmail = sendOtpEmail;
//# sourceMappingURL=mailer.js.map