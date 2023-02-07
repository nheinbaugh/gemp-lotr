import { FoilPresentation } from "../foil-presentation.type";

export interface CardDisplayOptions {
    foilPresentation: FoilPresentation;
    includeBorder: boolean;
    includeErrata: boolean;
    tokens: unknown;
}