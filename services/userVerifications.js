import { selectUserByEmail } from "./userQueries.js";

export async function checkIfUserExistsByEmail(email) {
    try {
        const user = await selectUserByEmail(email);

        if (user.length > 0) {
            return true;
        }
    } catch (e) {
        throw e;
    }

    return false;
}