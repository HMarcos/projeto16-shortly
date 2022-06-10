import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./db.js";
import { info } from "./logging/logging.js";

import authRouter from "./routers/authRouter.js";
import linkRouter from "./routers/linkRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(authRouter);
app.use(linkRouter);
app.use(userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(info(`The application is running on the PORT ${PORT}...\n`));
});