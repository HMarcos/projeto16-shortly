import { linkRepository } from "../repositories/linkRepository.js";
import { debug, error } from "../logging/logging.js";


export async function getUser(req, res) {
    const userId = parseInt(req.params.id);
    const { user } = res.locals;

    try {
        const visitCount = await linkRepository.selectVisitCount(userId);
        const userLinks = await linkRepository.selectLinksByUserId(userId);
        const response = formatUser(user, visitCount, userLinks);

        console.log(debug('User retrieved...\n'));
        res.send(response);
    } catch (e) {
        console.log(error("Server Internal error... \n"), e);
        return res.sendStatus(500);
    }
};

function formatUser(user, visitCount, userLinks){
    const formatedUser ={
        id: user.id,
        name: user.name,
        visitCount,
        shortenedUrls: userLinks
    };

    return formatedUser;
}