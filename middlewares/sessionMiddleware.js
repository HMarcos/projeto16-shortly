import { checkIfValidSession } from "../services/sessionVerifications.js";
import { debug, error } from "../logging/logging.js";


export async function validateSession(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if (!token) {
        console.log(error('Could not parse token...\n'));
        return res.status(401).send("Could not validade user, no token");
    }

    try {
        const sessionInfo = await checkIfValidSession(token);
        const isValidSession = sessionInfo.isValid;

        if (!isValidSession) {
            console.log(error('Invalid session...\n'));
            return res.status(401).send("Invalid session");
        }

        res.locals.user = sessionInfo.user;
        console.log(debug("Valid session...\n"));
        next();

    } catch (e) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }
}