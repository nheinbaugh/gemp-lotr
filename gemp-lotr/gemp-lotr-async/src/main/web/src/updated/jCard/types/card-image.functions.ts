import { DecipherSets } from "../../../types/set-numbers.enum";
import { mainImageLocation } from "../modules/image-resolution/types/card-image.constants";
import { formatCardNumber, formatSetNumber, getBlueprintByCardId } from "./card-formatting.functions";
import { foilIndicator, rulesImageHref, tengwarIndicator } from "./jcard.constants";

// the current setup has cardCache, how does that relate to the image resolver? I think they can be joined with the json files just being seed data

export const getCardImage = (blueprintId: string): string | undefined => {
    if (blueprintId === 'rules') {
        return rulesImageHref;
    }
    // TODO: this really upsets me, we're just circling around formatting over and over
    const {set, cardNumber} = getBlueprintByCardId(blueprintId);

    const imageUrl = generateImageUrl(set, cardNumber);
    return imageUrl;
}

export const isImageFoil = (blueprintId: string): boolean => {
    return blueprintId.substring(blueprintId.length - 1, blueprintId.length) === foilIndicator
}

export const isImageTengwar = (blueprintId: string): boolean => {
    return blueprintId.substring(blueprintId.length - 1, blueprintId.length) === tengwarIndicator
}

export const generateImageFileName = (setNumber: number, cardNumber: number): string => {
    return `LOTR${formatSetNumber(setNumber)}${formatCardNumber(cardNumber)}`
}

const generateImageUrl = (setNumber: number, cardNumber: number): string => {
    return `${mainImageLocation}/${generateImageFileName(setNumber, cardNumber)}.jpg`;
};