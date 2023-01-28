import { foilIndicator, rulesImageHref, tengwarIndicator } from "./jcard.constants";

export const getCardImage = (blueprintId: string): string => {
    if (blueprintId === 'rules') {
        return rulesImageHref;
    }
    return '';
}

export const isImageFoil = (blueprintId: string): boolean => {
    return blueprintId.substring(blueprintId.length - 1, blueprintId.length) === foilIndicator
}

export const isImageTengwar = (blueprintId: string): boolean => {
    return blueprintId.substring(blueprintId.length - 1, blueprintId.length) === tengwarIndicator
}