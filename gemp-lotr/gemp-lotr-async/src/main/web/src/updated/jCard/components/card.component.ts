import { createCardDisplayOptions } from "../types/card-display-options/card-display-options.factory";
import { FoilPresentation } from "../types/foil-presentation.type";

const animatedFoil = 'foil.gif';
const staticFoil = 'holo.jpg'
const endDiv = '</div>'

export const renderCard = (imageUrl: string, text = '',  options = createCardDisplayOptions()): string => {
    let html = cardBase(imageUrl, text);
    if (options.includeErrata) {
        html += createErrata();
    }
    if (options.foilPresentation !== 'none') {
        html += createFoilOverlay(imageUrl);
    }
    if (options.tokens) {
        html += createToken();
    }
    html += createBorder(options.includeBorder);
    return html += endDiv;
}

const createFoilOverlay = (imageUrl: string, foilPresentationMode: FoilPresentation = 'none'): string => {
    
    let imageSource = animatedFoil;
    if (foilPresentationMode === 'static') {
        imageSource = staticFoil;
    }
    return `"<div class='foilOverlay'><img src='/gemp-lotr/images/${imageUrl}' width='100%' height='100%'></div>"`
}

const cardBase = (imageUrl: string, text = ''): string => (`<div class='card'><img src='${imageUrl}' width='100%' height='100%'>${text}`)

const createErrata = (): string => (`<div class='errataOverlay'><img src='/gemp-lotr/images/errata-vertical.png' width='100%' height='100%'></div>`)

const createToken = () => (`<div class='tokenOverlay'></div>`);

const createBorder = (includeBorder: boolean): string => {
    return `` + 
    `<div class="borderOverlay ${includeBorder ? '' : 'noBorder'}">` + 
        `<img class='actionArea' src='/gemp-lotr/images/pixel.png' width='100%' height='100%'>` +
    `</div>`;
}