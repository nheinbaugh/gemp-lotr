import { CardBlueprint } from "./types/card-blueprint.interface";
import { isCardFoil } from "./types/card-options.functions";
import { buildErrataUrl } from "./types/errata.functions";

class Card {
    private attachedCards: unknown[] = [];
    private isFoil = false;
    private isTengwar = false;
    private hasWiki = false;
    private errataUrl: string | null = null;

    constructor(
        private blueprintIdWithModifiers: string,
        private zone: unknown,
        private cardId: unknown,
        private owner: unknown,
        private siteNumber: number
        ) {
        // set isFoil
        // set isTengwar
        
    }
}