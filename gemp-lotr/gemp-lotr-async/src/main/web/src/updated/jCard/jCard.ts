import { buildCardMetadata } from "./types/card-metadata.factory";
import { CardMetadata } from "./types/card-metadata.interface";

class Card {
    private attachedCards: unknown[] = [];
    private metadata: CardMetadata;

    constructor(
        private blueprintIdWithModifiers: string,
        private zone: unknown,
        private cardId: unknown,
        private owner: unknown,
        private siteNumber: number
        ) {
            this.metadata = buildCardMetadata(blueprintIdWithModifiers);
            // format of inputs is:
            // 3_12
            // 12_94*
            // 1_1T* (guessing on that)
    }
}