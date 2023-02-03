import { CardBlueprint } from "./card-blueprint.interface";

/**
 * Given a card ID from the API convert it into the CardBlueprint viewmodel
 */
export const getBlueprintByCardId = (id: string): CardBlueprint => {
    const separator = '_';
    const sections = id.split(separator); 

    const cardNumber = +sections[1];
    const setNumber = +sections[0];

    return {
        set: +sections[0],
        cardNumber,
        formattedCardNumber: formatCardNumber(cardNumber),
        formattedSetNumber: formatSetNumber(setNumber)
    }
}

/**
 * Given a blueprint convert into the expected ID format
 * @param blueprint The blueprint of the card
 * @returns A string representing the way the card is defined (e.g. "04001" for the first card of set four)
 */
export const getCardNumber = (blueprint: CardBlueprint): string => {
    return `${formatSetNumber(blueprint.set)}${formatCardNumber(blueprint.cardNumber)}`
}

/**
 * Given a card number format it into a properly padded ID
 * @param cardNumber the number of the card
 * @returns The string ID of the card
 */
export const formatCardNumber = (cardNumber: number): string => {
    if (cardNumber < 10) {
        return `00${cardNumber}`;
    } else if (cardNumber < 100) {
        return `0${cardNumber}`;
    }
    return `${cardNumber}`;
}


/**
 * Convert a number into a padded ID for the set 
 * @param setNumber THe number of the set (e.g. 4)
 * @returns The properly padded ID for the set (e.g. 04) as a string
 */
export const formatSetNumber = (setNumber: number): string => {
    if (setNumber < 10)
        return `0${setNumber}`;
    return setNumber.toString();
}