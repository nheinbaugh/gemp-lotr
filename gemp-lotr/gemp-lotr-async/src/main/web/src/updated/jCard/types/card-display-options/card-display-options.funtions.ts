import { CardDisplayOptions } from "./card-display-options.interface"

export const defaultCardDisplayOptions = (): CardDisplayOptions => ({
    foilPresentation: 'none',
    includeErrata: false,
    includeBorder: true,
    tokens: null,
})