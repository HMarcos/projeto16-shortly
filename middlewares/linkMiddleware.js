import { checkIfLinkExistsById } from "../services/linkVerifications.js";
import { error } from "../logging/logging.js";


export async function validateUrlById(req, res, next) {
    const linkId = parseInt(req.params.id);
    try {
        const linkInfo = await checkIfLinkExistsById(linkId);
        const linkExists = linkInfo.exists;
        if (!linkExists) {
            console.log(error('The link was not found...\n'));
            return res.sendStatus(404);
        }

        res.locals.link = linkInfo.link;
        next();
    } catch (e) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }
}