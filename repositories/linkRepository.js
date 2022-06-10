import db from "../db.js";

async function selectLinkById(id) {
    const query = `
        SELECT *
        FROM links
        WHERE id = $1;
    `;

    const values = [id];

    const result = await db.query(query, values);
    return result.rows;
};

async function selectLinkByShortUrl(shortUrl) {
    const query = `
        SELECT *
        FROM links
        WHERE "shortUrl" = $1;
    `;

    const values = [shortUrl];

    const result = await db.query(query, values);
    return result.rows;
}

async function incrementVisits(linkId) {
    const query = `
        UPDATE links
        SET visits = visits + 1
        WHERE id = $1;
    `;

    const values = [linkId];

    await db.query(query, values);
};

async function insertLink(link) {
    const { userId, url, shortUrl } = link;

    const query = `
        INSERT INTO links ("userId", url, "shortUrl")
        VALUES ($1, $2, $3);
    `;
    const values = [userId, url, shortUrl];

    await db.query(query, values);
}

async function deleteLink(linkId) {
    const query = `
        DELETE 
        FROM links
        WHERE id = $1;
    `;

    const values = [linkId];

    await db.query(query, values);
}

export const linkRepository = {
    selectLinkById,
    selectLinkByShortUrl,
    incrementVisits,
    deleteLink,
    insertLink
};