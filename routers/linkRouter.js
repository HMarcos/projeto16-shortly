import { Router } from "express";

import validateSchema from "../middlewares/schemaMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";
import { validateSession } from "../middlewares/sessionMiddleware.js";
import { getUrl, setShortUrl } from "../controllers/linkController.js";
import { validateUrlById } from "../middlewares/linkMiddleware.js";

const linkRouter = Router();

linkRouter.post("/urls/shorten", validateSchema(urlSchema), validateSession, setShortUrl);
linkRouter.get("/urls/:id", validateUrlById, getUrl);

export default linkRouter;