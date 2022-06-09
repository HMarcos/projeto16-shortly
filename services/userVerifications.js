import { selectUserByEmail } from "./userQueries.js";

export async function checkIfUserExistsByEmail(email) {
    try {
        const user = await selectUserByEmail(email);

        let userInfo = { user }

        if (user.length > 0) {
            userInfo = { ...userInfo, exists: true };
        }
        else {
            userInfo = { ...userInfo, exists: false };
        }

        return userInfo;

    } catch (e) {
        throw e;
    }
};