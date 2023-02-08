import { endDiv } from "../../../../src/types/html/html-janky.constants"

/**
 * "Internal" use only for building card components. Please use `createSimpleCard` `createCard` or `createFullCard` to have formatted HTML
 */
export const cardBase = (imageUrl: string, text = ''): string => (`<div class='card'><img src='${imageUrl}' width='100%' height='100%'>${text}`)

export const createSimpleCard = (imageUrl: string, text = ''): string => {
    return cardBase(imageUrl, text) + endDiv;
}