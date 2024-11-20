"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    const MONGODB_URL = process.env.MONGODB_URL.replace("<password>", process.env.MONGODB_PASSWORD);
    try {
        const connection = await mongoose_1.default.connect(MONGODB_URL);
        console.log(`MongoDB Connected`);
    }
    catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=dbConnection.js.map