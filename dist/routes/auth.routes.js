"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authRoutes = express_1.default.Router();
authRoutes.route("/signup").post(async (req, res) => {
    try {
        await (0, auth_controller_1.signup)(req, res);
    }
    catch (error) {
        console.error(error);
    }
});
authRoutes.route("/login").post(async (req, res) => {
    try {
        await (0, auth_controller_1.login)(req, res);
    }
    catch (error) {
        console.error(error);
    }
});
authRoutes.route("/signout").get(async (req, res, next) => {
    try {
        await (0, auth_middleware_1.requireAuth)(req, res, next);
        await (0, auth_controller_1.signout)(req, res);
    }
    catch (error) {
        console.error(error);
    }
});
authRoutes.route("/verify-otp").post(async (req, res) => {
    try {
        await (0, auth_controller_1.verifyOtp)(req, res);
    }
    catch (error) {
        console.error(error);
    }
});
authRoutes.route("/dashboard").get(async (req, res, next) => {
    try {
        await (0, auth_middleware_1.requireAuth)(req, res, next);
        await (0, auth_controller_1.dashboard)(req, res);
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map