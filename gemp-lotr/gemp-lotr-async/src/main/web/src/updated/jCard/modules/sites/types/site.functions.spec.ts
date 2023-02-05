import { DecipherSets } from "../../../../../types/set-numbers.enum";
import { CardBlueprint } from "../../../types/card-blueprint.interface";
import { isCardASite } from "./site.functions";

describe('site-functions', () => {
    describe('isCardASite', () => {
        it('should return false when using an invalid set number', () => {
            const input = {
                set: 23523423 as any as DecipherSets,
                cardNumber: 12
            } as CardBlueprint;
            expect(isCardASite(input)).toBeFalsy();
        });

        it('should return false when requesting a card that is not included in the site lists', () => {
            const input = {
                set: DecipherSets.MinesOfMoria,
                cardNumber: 12
            } as CardBlueprint;
            expect(isCardASite(input)).toBeFalsy();
        })

        it('should return true when requesting a card that is listed as a site', () => {
            const input = {
                set: DecipherSets.MinesOfMoria,
                cardNumber: 118
            } as CardBlueprint;
            expect(isCardASite(input)).toBeTruthy();

        })
    })
})