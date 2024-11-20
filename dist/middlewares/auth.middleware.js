"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseHandler_1 = require("../utils/responseHandler");
const requireAuth = async (req, res, next) => {
    try {
        // 1. check if access token is present
        const token = req.cookies.accessToken;
        if (!token) {
            return (0, responseHandler_1.sendErrorResponse)(res, 400, `🙅🏼‍♂️ Access token not found`);
        }
        // 2. verify access token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error(`Something went wrong while verifying access token, ${error}`);
        return (0, responseHandler_1.sendErrorResponse)(res, 500, `🙅🏼‍♂️ Something went wrong`, error);
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.middleware.js.map