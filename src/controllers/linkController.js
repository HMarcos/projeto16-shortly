import { nanoid } from "nanoid";

import { linkRepository } from "../repositories/linkRepository.js";
import { error, debug } from "../logging/logging.js";

const SHORT_URL_SIZE = 10;

export async function setShortUrl(req, res) {
    const { url } = req.body;
    const userId = parseInt(res.locals.user.id);
    const shortUrl = nanoid(SHORT_URL_SIZE);

    const link = {
        userId,
        shortUrl,
        url
    };

    try {
        await linkRepository.insertLink(link);
        console.log(debug(`Link registered successfully...\n`));

        return res.status(201).send({ shortUrl });

    } catch (e) {
        console.log(error("Database server internal error...\n"), e);
        return res.sendStatus(500);
    }
};

export async function getUrl(req, res) {
    const { link } = res.locals;
    
    delete link.userId;
    delete link.createdAt;
    delete link.visits;

    console.log(debug(`Link retrieved...\n`));
    return res.send(link);
};

export async function openUrl(req, res) {
    const { link } = res.locals;

    try {
        await linkRepository.incrementVisits(link.id);
        console.log(debug('Redirecting link...\n'));
        return res.redirect(link.url);
    } catch (e) {
        console.log(error("Database server internal error...\n"), e);
        return res.sendStatus(500);
    }

};

export async function deleteUrl(req, res) {
    const linkId = parseInt(req.params.id);

    try {
        await linkRepository.deleteLink(linkId);
        console.log(debug('Link deleted...\n'));
        return res.sendStatus(204);
    } catch (e) {
        console.log(error("Database server internal error...\n"), e);
        return res.sendStatus(500);
    }
}