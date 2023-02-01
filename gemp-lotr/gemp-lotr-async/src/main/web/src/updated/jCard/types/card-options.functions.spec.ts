import { isCardFoil, isCardTengwar } from "./card-options.functions"

describe('card-options.functions', () => {
    describe('isCardFoil', () => {
        it('should return true when the input ends with "*"', () => {
            expect(isCardFoil('abc*')).toBeTruthy();
        })

        it('should return false when the input does not end with "*"', () => {
            expect(isCardFoil('noswizzlenofoil')).toBeFalsy();
        })
    })

    describe('isCardTengwar', () => {
        it('should return true when the input ends with "T"', () => {
            expect(isCardTengwar('dwarvenLegendT')).toBeTruthy();
        })

        it('should return false when the input does not end with "T"', () => {
            expect(isCardTengwar('dwarvenLegend')).toBeFalsy();
        })
    })
})