import { formatCardNumber, formatSetNumber, getCardNumber } from "./card-formatting.functions";

describe('card-formatting.functions', () => {
    describe('getCardNumber', () => {
        it('should return the expected value when passed card blueprints', () => {
            expect(getCardNumber({set: 4, cardNumber: 23, formattedCardNumber: '023', formattedSetNumber: '04'})).toEqual("04023");
            expect(getCardNumber({set: 13, cardNumber: 423, formattedCardNumber: '423', formattedSetNumber: '13'})).toEqual("13423");
        })
    })

    describe('fomatCardNumber', () => {
        it('should return the string version of any number above 100', () => {
            expect(formatCardNumber(234)).toEqual('234');
        });

        it('should prefix a single 0 to a number between 10-99', () => {
            expect(formatCardNumber(13)).toEqual('013');
        })

        it('should prefix two 0s to a number between 1 and 10', () => {
            expect(formatCardNumber(7)).toEqual('007');
        })

        it('should return 000 when given 0 as input', () => {
            expect(formatCardNumber(0)).toEqual('000');
        })
    })

    describe('formatSetNumber', () => {
        it('should prefix a numbers below 10 with a zero', () => {
            expect(formatSetNumber(3)).toEqual("03");
        });

        it('should return 00 when given zero', () => {
            expect(formatSetNumber(0)).toEqual("00");
        });

        it('should return the stringified number of any value over 9', () => {
            expect(formatSetNumber(14)).toEqual("14");
        });
    })
});