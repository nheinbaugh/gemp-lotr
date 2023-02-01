import { CardBlueprint } from "./card-blueprint.interface";

export interface CardMetadata {
    isFoil: boolean;
    isTengwar: boolean;
    errataUrl: string | null;
    wikiUrl:  string;
    cardBlueprint: CardBlueprint;
    imageUrl: string;
}