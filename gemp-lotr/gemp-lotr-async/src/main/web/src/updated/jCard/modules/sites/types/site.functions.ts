import { CardBlueprint } from "src/updated/jCard/types/card-blueprint.interface";
import { knownSites } from "../data/sites.list";

export const isCardASite = (blueprint: CardBlueprint): boolean => {
    const sitesInSet = knownSites[blueprint.set];
    if (sitesInSet) {
        return sitesInSet.includes(blueprint.cardNumber)
    }
    return false;
}