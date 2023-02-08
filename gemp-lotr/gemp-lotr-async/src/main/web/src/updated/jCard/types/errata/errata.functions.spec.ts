import { CardBlueprint } from "../card-blueprint.interface";
import { isCardErrated } from "./errata.functions";

describe('errata.functions', () => {
    describe('isCardErratad', () => {
        it('should return false when given an unknown set number', () => {
            const input: CardBlueprint = {
                set: 23,
                cardNumber: 1,
                formattedSetNumber: '23',
                formattedCardNumber: '001'
            };

            expect(isCardErrated(input)).toBeFalsy();
        });

        it('should return false when the card is not included in the errata list', () => {
            const input: CardBlueprint = {
                set: 10,
                cardNumber: 1,
                formattedSetNumber: '10',
                formattedCardNumber: '001'
            };

            expect(isCardErrated(input)).toBeFalsy();
        })

        it('should return true when the card is included in the errata list', () => {
            const input: CardBlueprint = {
                set: 7,
                cardNumber: 14,
                formattedSetNumber: '07',
                formattedCardNumber: '014'
            };

            expect(isCardErrated(input)).toBeTruthy();
        });
    })
})