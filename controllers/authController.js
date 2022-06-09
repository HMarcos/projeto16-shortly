import bcrypt from "bcrypt";

import { insertUser } from "../services/userQueries.js";
import { debug, error } from "../logging/logging.js";

const SALT_ROUNDS = 10;

export async function setRegister(req, res) {
    const {name, email, password} = req.body;

    const user = {
        name,
        email,
        password: bcrypt.hashSync(password, SALT_ROUNDS)
    }

    try {
        await insertUser(user);
    } catch (e) {
        console.log(error("Database server internal error...\n"), e);
        return res.sendStatus(500);
    }
    
    console.log(debug('User registered successfully...\n'))
    return res.sendStatus(201);
}