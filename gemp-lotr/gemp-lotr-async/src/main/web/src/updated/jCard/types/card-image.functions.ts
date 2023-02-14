import { mainImageLocation } from "../modules/image-resolution/types/card-image.constants";
import { formatCardNumber, formatSetNumber, getBlueprintByCardId } from "./card-formatting.functions";
import { rulesImageHref } from "./jcard.constants";


export const getCardImage = (blueprintId: string): string | undefined => {
    if (blueprintId === 'rules') {
        return rulesImageHref;
    }
    const {set, cardNumber} = getBlueprintByCardId(blueprintId);

    return generateImageUrl(set, cardNumber);
}

export const generateImageFileName = (setNumber: number, cardNumber: number): string => {
    return `LOTR${formatSetNumber(setNumber)}${formatCardNumber(cardNumber)}`
}

const generateImageUrl = (setNumber: number, cardNumber: number): string => {
    return `${mainImageLocation}/${generateImageFileName(setNumber, cardNumber)}.jpg`;
};