import { createCardDisplayOptions } from "./card-display-options.factory";
import { CardDisplayOptions } from "./card-display-options.interface"

describe('card-display-options.factory', () => {
    describe('createCardDisplayOptions', () => {
        it('should have expected defaults when no value is provided', () => {
            const input: Partial<CardDisplayOptions> = {};

            const actual = createCardDisplayOptions(input);

            expect(actual.foilPresentation).toBe('none');
            expect(actual.includeBorder).toBeTruthy();
            expect(actual.includeErrata).toBeFalsy();
            expect(actual.tokens).toBeNull();
        });

        it('should override foil presentation when provided', () => {
            const input: Partial<CardDisplayOptions> = {
                foilPresentation: 'animated'
            };

            const actual = createCardDisplayOptions(input);

            expect(actual.foilPresentation).toBe('animated');
        })

        it('should override display border when provided', () => {
            const input: Partial<CardDisplayOptions> = {
                includeBorder: false
            };

            const actual = createCardDisplayOptions(input);

            expect(actual.includeBorder).toBeFalsy();
        })

        it('should provide errata when provided', () => {
            const input: Partial<CardDisplayOptions> = {
                includeErrata: true
            };

            const actual = createCardDisplayOptions(input);

            expect(actual.includeErrata).toBeTruthy();
        })
    })
})