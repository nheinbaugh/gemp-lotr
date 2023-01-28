import { getCardImage, isImageFoil, isImageTengwar } from "./card-image.functions";
import { foilIndicator, rulesImageHref, tengwarIndicator } from "./jcard.constants";

describe('card-image.functions', () => {
    describe('getCardImage', () => {
        it('should return the rules image when provided "rules" as the name', () => {
            const input = 'rules';

            expect(getCardImage(input)).toBe(rulesImageHref);
        });
    })

    describe('isImageFoil', () => {
        it('should return true when given an id ending in "*"', () => {
            const input = "tswizzle" + foilIndicator;
            expect(isImageFoil(input)).toBeTruthy();
        });

        it('should return false when given an id ending in "T"', () => {
            const input = "tswizzle" + tengwarIndicator;
            expect(isImageFoil(input)).toBeFalsy();

        });

        it('should return false when given an id ending in anything else', () => {
            const input = "tswizzle";
            expect(isImageFoil(input)).toBeFalsy();
        });
    })

    describe('isImageTengwar', () => {
        it('should return true when given an id ending in "T"', () => {
            const input = "tswizzle" + tengwarIndicator;
            expect(isImageTengwar(input)).toBeTruthy();
        });

        it('should return false when given an id ending in "*"', () => {
            const input = "tswizzle" + foilIndicator;
            expect(isImageTengwar(input)).toBeFalsy();

        });

        it('should return false when given an id ending in anything else', () => {
            const input = "tswizzle";
            expect(isImageTengwar(input)).toBeFalsy();
        });
    })
})