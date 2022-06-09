import { Router } from "express";

import validateSchema from "./../middlewares/schemaMiddleware.js";
import signUpSchema from "./../schemas/signUpSchema.js";
import { validateSignUp } from "../middlewares/authMiddleware.js";
import { setRegister } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), validateSignUp, setRegister);

export default authRouter;