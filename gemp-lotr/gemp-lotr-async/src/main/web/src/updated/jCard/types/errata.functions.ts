import { CardBlueprint } from "./card-blueprint.interface";
import { getCardNumber } from "./card-formatting.functions";
import { errataCardList } from "./errata-card.list";

export const isCardErrated = (card: CardBlueprint): boolean => {
    const setListofErratas = errataCardList.get(card.set);
    if (!setListofErratas) {
        return false;
    }
    return setListofErratas.includes(card.cardNumber);
}

/**
 * Given a blueprint return the errata HREF
 * @param blueprint The card blueprint
 * @returns Null for cards without an errata or the HREF for the errata image
 */
export const buildErrataUrl = (blueprint: CardBlueprint): string | null => {
    if (!isCardErrated(blueprint)) {
        return null;
    }
    return "/gemp-lotr/images/erratas/LOTR" + getCardNumber(blueprint) + ".jpg";
}