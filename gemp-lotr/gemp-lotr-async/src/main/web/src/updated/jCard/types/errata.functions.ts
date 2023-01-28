import { CardBlueprint } from "./card-blueprint.interface";
import { errataCardList } from "./errata-card.list";

export const isCardErrated = (card: CardBlueprint): boolean => {
    const setListofErratas = errataCardList.get(card.set);
    if (!setListofErratas) {
        return false;
    }
    return setListofErratas.includes(card.cardNumber);
}