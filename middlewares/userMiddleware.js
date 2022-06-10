import { error } from "../logging/logging.js";
import { checkIfUserExistsById } from "../services/userVerifications.js";

export async function validateUser(req, res, next) {
    const sessionUser = res.locals.user;
    const userId = parseInt(req.params.id);

    try {
        const userInfo = await checkIfUserExistsById(userId);
        const userExists = userInfo.exists;

        if (!userExists) {
            console.log(error('The user was not found...\n'));
            return res.sendStatus(404);
        }

        if (sessionUser.id !== userId) {
            console.log(error('Invalid owner...\n'));
            return res.sendStatus(401);
        }

        res.locals.user = userInfo.user;
        next();

    } catch (e) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }
};