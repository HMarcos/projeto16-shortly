import bcrypt from "bcrypt";

import { checkIfUserExistsByEmail } from "../services/userVerifications.js";
import { error } from "../logging/logging.js";

export async function validateSignUp(req, res, next) {
    const user = req.body;
    try {
        const userInfo = await checkIfUserExistsByEmail(user.email);
        const userAlreadyExists = userInfo.exists;

        if (userAlreadyExists) {
            console.log(error('This e-mail is already registered...\n'));
            return res.status(409).send('This e-mail is already registered...\n');
        }
    } catch (e) {
        console.log(error("Database server internal error...\n"), e);
        return res.sendStatus(500);
    }

    next();
};

export async function validateSignIn(req, res, next) {
    const login = req.body;
    try {
        const userInfo = await checkIfUserExistsByEmail(login.email);
        const userExists = userInfo.exists;

        if (!userExists) {
            console.log(error('The user is incorrect..\n'));
            return res.status(401).send('The user is incorrect...\n');
        }

        const user = userInfo.user;

        const passwordMatch = bcrypt.compareSync(login.password, user.password);
        if (!passwordMatch) {
            console.log(error('The password is incorrect..\n'));
            return res.status(401).send('The password is incorrect...\n');
        }

        res.locals.user = user;
        next();

    } catch (e) {
        console.log(error("Database server internal error...\n"), e);
        return res.sendStatus(500);
    }
};