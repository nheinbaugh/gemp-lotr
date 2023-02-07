import { CardBlueprint } from "../card-blueprint.interface";
import { getWikiLink } from "./wiki.functions";
import { DecipherSets } from '../../../../types/set-numbers.enum';

describe('wiki.functions', () => {
    describe('getWikiLink', () => {
        it('returns null for fixed images', () => {
            const inputUrl = '';
            const inputBlueprint: CardBlueprint = {
                formattedCardNumber: '205',
                formattedSetNumber: '15',
                cardNumber: 205,
                set: DecipherSets.Hunters
            }
            expect(getWikiLink(inputBlueprint, inputUrl)).toBeNull();
        });

        it('returns null for a starter pack or booster', () => {
            const inputUrl = '/gemp-lotr/images/boosters/fotr_starter_selection.png';
            const inputBlueprint: CardBlueprint = {
                formattedCardNumber: '000',
                formattedSetNumber: '00',
                cardNumber: 0,
                set: DecipherSets.Promo
            }
            const expected = '';
            expect(getWikiLink(inputBlueprint, inputUrl)).toBeNull();
        });

        it('returns a link to the LOTR Wiki for the inputted card', () => {
            const inputUrl = 'https://i.lotrcgpc.net/deciper/LOTRO05025.jpg';
            const inputBlueprint: CardBlueprint = {
                formattedCardNumber: '025',
                formattedSetNumber: '05',
                cardNumber: 25,
                set: DecipherSets.BattleOfHelmsDeep
            }
            const expected = 'https://wiki.lotrtcgpc.net/wiki/LOTR05025';
            expect(getWikiLink(inputBlueprint, inputUrl)).toBe(expected);
        });
    })
})