const foilSuffix = '*';
const tengwarSuffix = 'T';

export const isCardFoil = (cardId: string): boolean => {
    return checkEndOfStringMatchesPattern(foilSuffix, cardId);
}

export const isCardTengwar = (cardId: string): boolean => {
    return checkEndOfStringMatchesPattern(tengwarSuffix, cardId);
}

const checkEndOfStringMatchesPattern = (patternToCheck: string, stringToCheck: string): boolean => {
    return stringToCheck.substring(stringToCheck.length - patternToCheck.length) === patternToCheck;
}