import db from "../db.js";

async function selectLinkById(id) {
    const query = `
        SELECT id, "shortUrl", url
        FROM links
        WHERE id = $1;
    `;

    const values = [id];

    const result = await db.query(query, values);
    return result.rows;
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

export const linkRepository = {
    selectLinkById,
    insertLink
};