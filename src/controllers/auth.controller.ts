import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import Verification from "../models/verification.model";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../utils/responseHandler";
import { sendOtpEmail } from "../utils/mailer";
import { generateAccessToken } from "../utils/generateAccessToken";
import AuthRequest from "../utils/authTypes";

const signup = async (req: AuthRequest, res: express.Response) => {
  try {
    console.log("accessing signup route...");
    //  1. get user data from req.body
    const { name, email, password } = req.body;

    // 2. validation
    if ([name, email, password].some((field) => field?.trim() === "")) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ All fields are required`);
    }

    // 3. check if user already exists
    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ User already exists`);
    }

    // 4. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. create user
    if (!user) {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    } else {
      user = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword, name },
        { new: true }
      );
    }

    // 6. send verification email to user
    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    let otpExpiry = new Date(
      Date.now() + Number(process.env.OTP_EXPIRY_TIME) * 60 * 1000
    );

    // 7. check if verification token already exists
    let verificationToken = await Verification.findOne({ email });

    if (verificationToken) {
      // 7a. if otp is expired
      if (verificationToken.otpExpiry.getTime() < Date.now()) {
        verificationToken.otpExpiry = otpExpiry;
        verificationToken.otp = String(otp);
        await verificationToken.save();
      }
      // 7b. if opt is not expired
      else {
        otp = verificationToken.otp;
      }
    }
    // 7c. if verification token does not exist
    else {
      verificationToken = await Verification.create({
        email,
        otp,
        otpExpiry,
      });
    }
    // 8. send verification email
    await sendOtpEmail(email, otp);

    // 9. send response
    return sendSuccessResponse(res, `✨ User created successfully`);
  } catch (error) {
    console.error("Something went wrong while creating user", error);
    return sendErrorResponse(res, 500, `🙅🏼‍♂️ Something went wrong`, error);
  }
};

const login = async (req: express.Request, res: express.Response) => {
  try {
    console.log("accessing login route...");
    // 1. get user data from req.body
    const { email, password } = req.body;

    // 2. validation
    if ([email, password].some((field) => field?.trim() === "")) {
      return sendSuccessResponse(res, `🙅🏼‍♂️ All fields are required`);
    }

    // 3. check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ User not found`);
    }
    if (user.isVerified === false) {
      return sendErrorResponse(
        res,
        400,
        `🙅🏼‍♂️ User not verified,
        Signup again with the same email to verify`
      );
    }

    // 4. check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ Invalid credentials`);
    }

    // 5. generate access token
    const accessToken = await generateAccessToken(user._id);
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? ("none" as "none")
          : ("lax" as "lax"),
    };

    res.cookie("accessToken", accessToken, options);

    // 6. send response
    return sendSuccessResponse(res, `🎉 Welcome ${user.name}`, {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error(`Something went wrong while logging in ${error}`);
    return sendErrorResponse(res, 500, `🙅🏼‍♂️ Something went wrong`, error);
  }
};

const signout = async (req: AuthRequest, res: express.Response) => {
  try {
    console.log("accessing logout route...");

    // 1. ckeck if user is logged in
    const userId = req.user?._id;
    if (!userId) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ User not logged in`);
    }

    // 2. clear cookies
    res.clearCookie("accessToken");

    // 3. send response
    return sendSuccessResponse(res, `👋🏼 See you later`);
  } catch (error) {
    console.error(`Something went wrong while logging out, ${error}`);
    return sendErrorResponse(res, 500, `🙅🏼‍♂️ Something went wrong`, error);
  }
};

const verifyOtp = async (req: express.Request, res: express.Response) => {
  try {
    console.log("accessing verify-otp route...");

    const { email, otp } = req.body;

    // 1. check if user exists with this email
    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ User not found`);
    }

    // 2. check if otp exists with this email
    const verificationToken = await Verification.findOne({ email });
    if (!verificationToken) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ Otp not found`);
    }

    // 3 . check if otp is expired
    if (verificationToken.otpExpiry.getTime() < Date.now()) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ Otp expired`);
    }

    // 4. check if otp is correct
    if (verificationToken.otp !== otp) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ Invalid otp`);
    }

    // 5. update user
    user.isVerified = true;
    await user.save();

    // 6. delete verification token
    await Verification.deleteOne({ email });

    // 7. generate access token
    const accessToken = await generateAccessToken(user._id);
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? ("none" as "none")
          : ("lax" as "lax"),
    };
    res.cookie("accessToken", accessToken, options);

    // 8. send response
    return sendSuccessResponse(res, `🎉 Otp verified successfully`);
  } catch (error) {
    console.error(`Something went wrong while verifying otp, ${error}`);
    return sendErrorResponse(res, 500, `🙅🏼‍♂️ Something went wrong`, error);
  }
};

const dashboard = async (req: AuthRequest, res: express.Response) => {
  try {
    console.log("accessing dashboard route...");
    // 1. ckeck if user is logged in
    const userId = req.user?._id;
    if (!userId) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ User not logged in`);
    }

    // 2. send response
    return sendSuccessResponse(res, `✨ Welcome ${req.user?.name}`, {
      name: req.user?.name,
      email: req.user?.email,
    });
  } catch (error) {
    console.error(`Something went wrong while accessing dashboard, ${error}`);
    return sendErrorResponse(res, 500, `🙅🏼‍♂️ Something went wrong`, error);
  }
};
export { signup, login, signout, verifyOtp, dashboard };
