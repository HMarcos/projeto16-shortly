import { Router } from "express";

import { getRanking, getUser } from "../controllers/userController.js";
import { validateSession } from "../middlewares/sessionMiddleware.js";
import { validateUser } from "../middlewares/userMiddleware.js";

const userRouter = Router();

userRouter.get("/users/:id", validateSession, validateUser, getUser);
userRouter.get("/ranking", getRanking);

export default userRouter;