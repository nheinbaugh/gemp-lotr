import { buildCardMetadata } from "./card-metadata.factory";

describe('card-metadata.factory', () => {
    describe('buildCardMetadata', () => {
        it('should build a card that matches the provided inputs', () => {
            const input = '03_24T*';
            const actual = buildCardMetadata(input);

            expect(actual.isFoil).toBeTruthy();
            expect(actual.isTengwar).toBeTruthy();
            expect(actual.isSite).toBeFalsy();
        })
    })
})