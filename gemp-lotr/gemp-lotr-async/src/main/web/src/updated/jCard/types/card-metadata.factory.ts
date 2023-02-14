import { getImageUrl } from "../modules/image-resolution/image-resolver";
import { isCardASite } from "../modules/sites/types/site.functions";
import { getBlueprintByCardId } from "./card-formatting.functions";
import { CardMetadata } from "./card-metadata.interface";
import { isCardFoil, isCardTengwar } from "./card-options.functions";
import { buildErrataUrl } from "./errata/errata.functions";
import { getWikiLink } from "./wiki/wiki.functions";

export const buildCardMetadata = (blueprintId: string): CardMetadata => {
    let strippedBlueprintId = blueprintId;

    // there's a less janky way to do this, but i can't right now. The tests means we can update it later
    const isFoil = isCardFoil(strippedBlueprintId);
    if (isFoil) {
        strippedBlueprintId = strippedBlueprintId.substring(0, strippedBlueprintId.length - 1);
    }
    const isTengwar = isCardTengwar(strippedBlueprintId);
    if (isTengwar) {
        strippedBlueprintId = strippedBlueprintId.substring(0, strippedBlueprintId.length - 1);
    }

    // these commented lines are pulled from jCards.js and I need to implement them correctly
    // I didn't quite understand Ketura's GH comment https://github.com/PlayersCouncil/gemp-lotr/pull/27#discussion_r1099644929
    // although I did update the implementation of that function in masterworks.functiosn.ts
    // if (this.isMasterworks(setNo, cardNo))
    // cardStr = this.formatSetNo(setNo) + "O0" + (cardNo - this.getMasterworksOffset(setNo));

    const cardBlueprint = getBlueprintByCardId(strippedBlueprintId);
    const imageUrl =  getImageUrl(strippedBlueprintId);

    const wikiUrl = getWikiLink(cardBlueprint, imageUrl);
    
    return {
        cardBlueprint,
        isFoil,
        isTengwar,
        imageUrl,
        errataUrl: buildErrataUrl(cardBlueprint),
        wikiUrl,
        isSite: isCardASite(cardBlueprint)
    }
}