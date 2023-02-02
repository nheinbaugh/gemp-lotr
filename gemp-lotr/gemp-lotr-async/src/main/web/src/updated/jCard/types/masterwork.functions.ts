import { CardBlueprint } from "./card-blueprint.interface";

/**
 * These two functions are basically dupes... why???
 */


export const isCardMasterwork = (blueprint: CardBlueprint): boolean => {
    switch (blueprint.set) {
        case Sets.BlackRider:
        case Sets.Bloodlines:
          return blueprint.cardNumber > 194;
        case Sets.RiseOfSaruman:
            return blueprint.cardNumber > 148
        case Sets.TreacheryAndDeceit:
            return blueprint.cardNumber >  140;
        default:
            return blueprint.cardNumber > 194;
    }
    return false;
}

export const getMasterworkOffsetBySetNumber = (setNumber: Sets): number => {
    switch (setNumber) {
        case Sets.RiseOfSaruman:
          return 148;
          case Sets.TreacheryAndDeceit:
            return 140;
        default:
            return 194;
    }
}