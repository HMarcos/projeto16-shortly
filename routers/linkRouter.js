import { Router } from "express";

import validateSchema from "../middlewares/schemaMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";
import { validateSession } from "../middlewares/sessionMiddleware.js";
import { setShortUrl } from "../controllers/linkController.js";

const linkRouter = Router();

linkRouter.post("/urls/shorten", validateSchema(urlSchema), validateSession, setShortUrl);

export default linkRouter;