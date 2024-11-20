"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./lib/dbConnection"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// config
dotenv_1.default.config({
    path: "./.env",
});
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
// db connection
(0, dbConnection_1.default)()
    .then(() => {
    app.on("error", (error) => {
        throw new Error(`Error while connecting Db : ${error}`);
    });
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
    .catch((error) => {
    console.error(`Error while connecting DB : ${error}`);
});
// middlewares
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [process.env.CLIENT_SIDE_URL],
    credentials: true,
}));
// routes
app.get("/", async (req, res, next) => {
    res.send("Accessing server side of Highway Delight Project");
    next();
});
app.use("/api/v1/user", auth_routes_1.default);
//# sourceMappingURL=index.js.map