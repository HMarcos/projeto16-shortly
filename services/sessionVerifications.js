import { userRepository } from "../repositories/userRepository.js";

export async function checkIfValidSession(token) {
    const user = await userRepository.selectUserByToken(token);

    let sessionInfo = { user }

    if (user.length > 0) {
        sessionInfo = { user: sessionInfo.user[0], isValid: true };
    }
    else {
        sessionInfo = { ...sessionInfo, isValid: false };
    }

    return sessionInfo;
};