import { DecipherSets } from "src/types/set-numbers.enum";
import { CardBlueprint } from "./card-blueprint.interface";

/**
 * These two functions are basically dupes... why???
 */


export const isCardMasterwork = (blueprint: CardBlueprint): boolean => {
    switch (blueprint.set) {
        case DecipherSets.BlackRider:
        case DecipherSets.Bloodlines:
          return blueprint.cardNumber > 194;
        case DecipherSets.RiseOfSaruman:
            return blueprint.cardNumber > 148
        case DecipherSets.TreacheryAndDeceit:
            return blueprint.cardNumber >  140;
        default:
            return blueprint.cardNumber > 194;
    }
    return false;
}

export const getMasterworkOffsetBySetNumber = (setNumber: DecipherSets): number => {
    switch (setNumber) {
        case DecipherSets.RiseOfSaruman:
          return 148;
          case DecipherSets.TreacheryAndDeceit:
            return 140;
        default:
            return 194;
    }
}