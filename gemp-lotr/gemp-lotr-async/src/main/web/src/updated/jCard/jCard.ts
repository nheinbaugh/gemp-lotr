import { CardBlueprint } from "./types/card-blueprint.interface";

class Card {
    private attachedCards: unknown[] = [];

    constructor(private imageBlueprint: CardBlueprint, private zone: unknown, private cardId: unknown, private owner: unknown, private siteNumber: number,) {
        // set isFoil
        // set isTengwar
        
    }
}