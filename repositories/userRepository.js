import db from "../db.js";

async function selectUserByEmail(email) {

    const query = `
            SELECT * 
            FROM users 
            WHERE email = $1;
        `;

    const values = [email];
    const result = await db.query(query, values);
    return result.rows;
};

async function insertUser(user) {
    const { name, email, password } = user;

    const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3);
        `;

    const values = [name, email, password];

    await db.query(query, values);
};

async function insertSession(session) {
    const { userId, token } = session;

    const query = `
            INSERT INTO sessions ("userId", token)
            VALUES ($1, $2);
        `;

    const values = [userId, token];

    await db.query(query, values);
};

export const userRepository = {
    selectUserByEmail,
    insertUser,
    insertSession
}