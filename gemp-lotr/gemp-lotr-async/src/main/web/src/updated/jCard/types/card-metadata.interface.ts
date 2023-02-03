import { CardBlueprint } from "./card-blueprint.interface";

/**
 * Slim metadata object that does not contain any "computed" properties
 */
export interface BasicCardMetadata {
    isFoil: boolean;
    isTengwar: boolean;
    cardBlueprint: CardBlueprint;
}

export interface CardMetadata extends BasicCardMetadata {
    errataUrl: string | null;
    wikiUrl:  string;
    imageUrl: string;
}