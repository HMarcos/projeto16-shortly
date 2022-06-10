import { Router } from "express";

import { getUser } from "../controllers/userController.js";
import { validateSession } from "../middlewares/sessionMiddleware.js";
import { validateUser } from "../middlewares/userMiddleware.js";

const userRouter = Router();

userRouter.get("/users/:id", validateSession, validateUser, getUser);

export default userRouter;