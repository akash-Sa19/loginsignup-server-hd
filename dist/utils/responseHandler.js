"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
// Helper function to send success responses
const sendSuccessResponse = (res, message, body = {}) => {
    return res.status(200).json({ status: "success", message, body });
};
exports.sendSuccessResponse = sendSuccessResponse;
// Helper function to send error responses
const sendErrorResponse = (res, statusCode, message, error = null) => {
    return res.status(statusCode).json({ status: "error", message, error });
};
exports.sendErrorResponse = sendErrorResponse;
//# sourceMappingURL=responseHandler.js.map