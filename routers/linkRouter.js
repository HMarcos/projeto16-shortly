import { Router } from "express";

import validateSchema from "../middlewares/schemaMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";
import { validateSession } from "../middlewares/sessionMiddleware.js";

const linkRouter = Router();

linkRouter.post("/urls/shorten", validateSchema(urlSchema), validateSession, (req, res) => {
    console.log('Inserindo a URL');
    res.send('Inserindo a url');
})

export default linkRouter;