import express from "express";
import {
  login,
  signup,
  signout,
  verifyOtp,
} from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const authRoutes = express.Router();
authRoutes.route("/signup").post(async (req, res) => {
  try {
    await signup(req, res);
  } catch (error) {
    console.error(error);
  }
});
authRoutes.route("/login").post(async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.error(error);
  }
});
authRoutes.route("/signout").get(async (req, res, next) => {
  try {
    await requireAuth(req, res, next);
    await signout(req, res);
  } catch (error) {
    console.error(error);
  }
});
authRoutes.route("/verify-otp").post(async (req, res) => {
  try {
    await verifyOtp(req, res);
  } catch (error) {
    console.error(error);
  }
});

export default authRoutes;
