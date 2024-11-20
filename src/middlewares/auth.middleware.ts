import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { sendErrorResponse } from "../utils/responseHandler";
import AuthRequest from "../utils/authTypes";

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. check if access token is present
    const token = req.cookies.accessToken;

    if (!token) {
      return sendErrorResponse(res, 400, `🙅🏼‍♂️ Access token not found`);
    }

    // 2. verify access token
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    req.user = decoded;

    next();
  } catch (error) {
    console.error(
      `Something went wrong while verifying access token, ${error}`
    );
    return sendErrorResponse(res, 500, `🙅🏼‍♂️ Something went wrong`, error);
  }
};
