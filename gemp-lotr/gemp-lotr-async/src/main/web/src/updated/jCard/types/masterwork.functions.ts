import { CardBlueprint } from "./card-blueprint.interface";

export const isCardMasterwork = (blueprint: CardBlueprint): boolean => {
    switch (blueprint.set) {
        case 12:
        case 13:
          return blueprint.cardNumber > 194;
        case 17:
            return blueprint.cardNumber > 148
        case 18:
            return 140;
        default:
            return 194;
    }
    return false;
}

export const getMasterworkOffsetBySetNumber = (setNumber: number): number => {
    switch (setNumber) {
        case 17:
          return 148;
        case 18:
            return 140;
        default:
            return 194;
    }
}