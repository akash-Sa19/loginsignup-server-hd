import mongoose from "mongoose";
import User from "../models/user.model";

export const generateAccessToken = async (userId: mongoose.Types.ObjectId) => {
  try {
    const user = (await User.findById(userId)) as typeof User & {
      generateAccessToken: (user: typeof User) => string;
    };
    const accessToken = user.generateAccessToken(user);
    return accessToken;
  } catch (error) {
    throw new Error(`Something went wrong while generating tokens, ${error}`);
  }
};
