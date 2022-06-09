import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./db.js";
import {info} from "./logging/logging.js";

import authRouter from "./routers/authRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

// Routers
app.use(authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(info(`The application is running on the PORT ${PORT}...`));
});