import { DecipherSets, PlayersCommitteeSets } from "../../../../../types/set-numbers.enum";
import { generateRangeOfNumbers } from "../types/range-generation.functions";

export const knownSites: Record<DecipherSets | PlayersCommitteeSets, number[]> = {
    [DecipherSets.Promo]: [1, 4, 6, 8],
    [DecipherSets.FellowshipOfTheRing]: [...generateRangeOfNumbers(319, 363), 367],
    [DecipherSets.MinesOfMoria]: generateRangeOfNumbers(115, 120),
    [DecipherSets.RealmsOfTheElfLords]: generateRangeOfNumbers(115, 120),
    [DecipherSets.TheTwoTowers]: generateRangeOfNumbers(323, 366),
    [DecipherSets.BattleOfHelmsDeep]:  generateRangeOfNumbers(118, 120),
    [DecipherSets.EntsOfFangorn]: generateRangeOfNumbers(115, 120),
    [DecipherSets.ReturnOfTheKing]: generateRangeOfNumbers(329, 363),
    [DecipherSets.SiegeOfGondor]: generateRangeOfNumbers(117, 120),
    [DecipherSets.Reflections]: [],
    [DecipherSets.MtDoom]:  generateRangeOfNumbers(117, 120),
    [DecipherSets.Shadows]: generateRangeOfNumbers(227, 266),
    [DecipherSets.BlackRider]:  generateRangeOfNumbers(185, 194),
    [DecipherSets.Bloodlines]: generateRangeOfNumbers(185, 194),
    [DecipherSets.ExpandedMiddleEarth]: [],
    [DecipherSets.Hunters]: generateRangeOfNumbers(187, 194),
    [DecipherSets.WraithCollection]: [],
    [DecipherSets.RiseOfSaruman]: generateRangeOfNumbers(145, 148),
    [DecipherSets.TreacheryAndDeceit]: generateRangeOfNumbers(134, 140),
    [DecipherSets.AgesEnd]: [],
    [PlayersCommitteeSets.HobbitOne]: generateRangeOfNumbers(49, 61),
    [PlayersCommitteeSets.HobbitTwo]: generateRangeOfNumbers(44, 47),
    [PlayersCommitteeSets.HobbitThree]: generateRangeOfNumbers(46, 49),
    [PlayersCommitteeSets.HobbitFour]: generateRangeOfNumbers(55, 58),
    
    [PlayersCommitteeSets.Set40]: generateRangeOfNumbers(273, 309),


    [PlayersCommitteeSets.Set20]: generateRangeOfNumbers(416, 469),
    [PlayersCommitteeSets.Set100]: [1],
    [PlayersCommitteeSets.Set150]: [1],
    [PlayersCommitteeSets.Set101]: generateRangeOfNumbers(57, 64),
    [PlayersCommitteeSets.Set151]: generateRangeOfNumbers(57, 64),

}