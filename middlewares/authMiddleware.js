import { checkIfUserExistsByEmail } from "../services/userVerifications.js";

import { error } from "../logging/logging.js";

export async function validateSignUp(req, res, next) {
    const user = req.body;
    try {
        const userAlreadyExists = await checkIfUserExistsByEmail(user.email);

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