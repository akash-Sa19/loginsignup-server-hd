import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/dbConnection";

// config
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;
const app = express();

connectDB()
  .then(() => {
    app.on("error", (error: any) => {
      throw new Error(`Error while connecting Db : ${error}`);
    });
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error: any) => {
    console.error(`Error while connecting DB : ${error}`);
  });

// middlewares
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: [process.env.CLIENT_SIDE_URL],
    credentials: true,
  })
);

// routes
app.get("/", async (req: express.Request, res: express.Response, next) => {
  res.send("Hello World!");
  next();
});
