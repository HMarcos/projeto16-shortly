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
    const {link} = res.locals;

    return res.send(link);
};