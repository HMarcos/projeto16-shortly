import { linkRepository } from "../repositories/linkRepository.js";

export async function checkIfLinkExistsById(linkId) {
    const link = await linkRepository.selectLinkById(linkId);

    let linkInfo = { link };

    if (link.length > 0) {
        linkInfo = { link: linkInfo.link[0], exists: true };
    }
    else {
        linkInfo = { ...linkInfo, exists: false };
    }

    return linkInfo;
};