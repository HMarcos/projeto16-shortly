import { userRepository } from "../repositories/userRepository.js";

export async function checkIfUserExistsByEmail(email) {
    const user = await userRepository.selectUserByEmail(email);

    let userInfo = { user }

    if (user.length > 0) {
        userInfo = { user: userInfo.user[0], exists: true };
    }
    else {
        userInfo = { ...userInfo, exists: false };
    }

    return userInfo;
};