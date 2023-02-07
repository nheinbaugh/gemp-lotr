import { CardDisplayOptions } from "./card-display-options.interface";
import { defaultCardDisplayOptions } from "./card-display-options.funtions";

export const createCardDisplayOptions = (input: Partial<CardDisplayOptions> = {}): CardDisplayOptions => ({
    ...defaultCardDisplayOptions(),
    ...input
});