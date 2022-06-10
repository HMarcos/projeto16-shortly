import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { userRepository } from "./../repositories/userRepository.js";
import { debug, error } from "../logging/logging.js";

const SALT_ROUNDS = 10;

export async function setRegister(req, res) {
    const { name, email, password } = req.body;

    const user = {
        name,
        email,
        password: bcrypt.hashSync(password, SALT_ROUNDS)
    }

    try {
        await userRepository.insertUser(user);
        console.log(debug('User registered successfully...\n'))
        return res.sendStatus(201);

    } catch (e) {
        console.log(error("Database server internal error...\n"), e);
        return res.sendStatus(500);
    }
};

export async function setLogin(req, res) {
    const userId = res.locals.user.id;
    const token = uuid();

    const session = { userId, token };

    try {
        await userRepository.insertSession(session);
        console.log(debug('Session registered successfully...\n'))
        return res.status(200).send({ token });

    } catch (e) {
        console.log(error("Database server internal error...\n"), e);
        return res.sendStatus(500);
    }
}