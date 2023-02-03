import { CardBlueprint } from "./types/card-blueprint.interface";
import { getBlueprintByCardId } from "./types/card-formatting.functions";
import { buildCardMetadata } from "./types/card-metadata.factory";
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
            const metatdata = buildCardMetadata(blueprintIdWithModifiers);
            // format of inputs is:
            // 3_12
            // 12_94*
            // 1_1T* (guessing on that)

        // set isFoil
        // set isTengwar
        
    }
}