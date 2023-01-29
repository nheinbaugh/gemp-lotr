import { CardBlueprint } from "./card-blueprint.interface";

export const getCardNumber = (blueprint: CardBlueprint): string => {
    return `${formatSetNumber(blueprint.set)}${formatCardNumber(blueprint.cardNumber)}`
}

export const formatCardNumber = (cardNumber: number) => {
    if (cardNumber < 10) {
        return `00${cardNumber}`;
    } else if (cardNumber < 100) {
        return `0${cardNumber}`;
    }
    return `${cardNumber}`;
}

export const formatSetNumber = (setNumber: number): string => {
    if (setNumber < 10)
        return `0${setNumber}`;
    return setNumber.toString();
}