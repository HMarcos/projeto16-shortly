import db from "../db.js";

async function insertLink(link) {
    const { userId, url, shortUrl } = link;

    const query = `
        INSERT INTO links ("userId", url, "shortUrl")
        VALUES ($1, $2, $3);
    `;
    const values = [userId, url, shortUrl];

    await db.query(query, values);
}

export const linkRepository = {
    insertLink
};