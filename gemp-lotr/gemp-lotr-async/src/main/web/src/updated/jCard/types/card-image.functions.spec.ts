import { data } from "jquery";
import { CardBlueprint } from "./card-blueprint.interface";
import { getBlueprintByCardId } from "./card-formatting.functions";
import { getCardImage, isImageFoil, isImageTengwar } from "./card-image.functions";
import { foilIndicator, rulesImageHref, tengwarIndicator } from "./jcard.constants";

describe('card-image.functions', () => {

    describe('getBlueprintByCardId', () => {
        it('should return a blueprint with set 1 and card 1 when passed 1_1', () => {
            const input = '1_1';
            const expected: CardBlueprint = {
                set: 1,
                cardNumber: 1
            };
            expect(getBlueprintByCardId(input)).toStrictEqual(expected);
        });

        it('should return a blueprint with set 1 and card 1 when passed 0000001_0000001s', () => {
            const input = '0000001_0000001';
            const expected: CardBlueprint = {
                set: 1,
                cardNumber: 1
            };
            expect(getBlueprintByCardId(input)).toStrictEqual(expected);
        });
    })

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