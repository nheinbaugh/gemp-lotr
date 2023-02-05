import { DecipherSets, PlayersCommitteeSets } from "src/types/set-numbers.enum";

export interface CardBlueprint {
    cardNumber: number;
    set: DecipherSets | PlayersCommitteeSets;
    formattedCardNumber: string;
    formattedSetNumber: string;
}