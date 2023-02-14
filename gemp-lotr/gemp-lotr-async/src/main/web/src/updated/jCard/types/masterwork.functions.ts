import { DecipherSets } from "src/types/set-numbers.enum";
import { CardBlueprint } from "./card-blueprint.interface"; 

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
            return false;
    }
}