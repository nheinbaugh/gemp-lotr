import { foilIndicator, tengwarIndicator } from "./jcard.constants";

export const isCardFoil = (cardId: string): boolean => {
    return checkEndOfStringMatchesPattern(foilIndicator, cardId);
}

export const isCardTengwar = (cardId: string): boolean => {
    return checkEndOfStringMatchesPattern(tengwarIndicator, cardId);
}

const checkEndOfStringMatchesPattern = (patternToCheck: string, stringToCheck: string): boolean => {
    return stringToCheck.substring(stringToCheck.length - patternToCheck.length) === patternToCheck;
}