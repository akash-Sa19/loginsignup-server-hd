"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generateAccessToken = async (userId) => {
    try {
        const user = (await user_model_1.default.findById(userId));
        const accessToken = user.generateAccessToken(user);
        return accessToken;
    }
    catch (error) {
        throw new Error(`Something went wrong while generating tokens, ${error}`);
    }
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=generateAccessToken.js.map