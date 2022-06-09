import db from "../db.js";

export async function selectUserByEmail(email){
    try {
        const query = `
            SELECT * 
            FROM users 
            WHERE email = $1;
        `;

        const values = [email];
        const result = await db.query(query, values);
        return result.rows;

    } catch (e) {
        throw e;
    }
};

export async function insertUser(user){
    const {name, email, password} = user;

    try {
        const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3);
        `;
        
        const values = [name, email, password];

        await db.query(query, values);

    } catch (e) {
        throw e;
    }
}