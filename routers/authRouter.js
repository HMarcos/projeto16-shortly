import { Router } from "express";

import validateSchema from "./../middlewares/schemaMiddleware.js";
import signUpSchema from "./../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";
import { validateSignIn, validateSignUp } from "../middlewares/authMiddleware.js";
import { setLogin, setRegister } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), validateSignUp, setRegister);
authRouter.post('/signin', validateSchema(signInSchema), validateSignIn, setLogin);

export default authRouter;