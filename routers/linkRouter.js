import { Router } from "express";

import validateSchema from "../middlewares/schemaMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";
import { validateSession } from "../middlewares/sessionMiddleware.js";
import { deleteUrl, getUrl, openUrl, setShortUrl } from "../controllers/linkController.js";
import { validateUrlById, validateUrlByShortUrl, validateURLOwner } from "../middlewares/linkMiddleware.js";

const linkRouter = Router();

linkRouter.post("/urls/shorten", validateSchema(urlSchema), validateSession, setShortUrl);
linkRouter.get("/urls/:id", validateUrlById, getUrl);
linkRouter.get("/urls/open/:shortUrl", validateUrlByShortUrl, openUrl);
linkRouter.delete("/urls/:id", validateSession, validateUrlById, validateURLOwner, deleteUrl);

export default linkRouter;