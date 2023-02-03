import { getImageUrl } from "../modules/image-resolution/image-resolver";
import { getBlueprintByCardId } from "./card-formatting.functions";
import { CardMetadata } from "./card-metadata.interface";
import { isCardFoil, isCardTengwar } from "./card-options.functions";
import { buildErrataUrl } from "./errata.functions";

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

    // bring over has wiki
    const myBlueprint = getBlueprintByCardId(strippedBlueprintId);
    
    
    return {
        cardBlueprint: myBlueprint,
        isFoil,
        isTengwar,
        imageUrl: getImageUrl(strippedBlueprintId),
        errataUrl: buildErrataUrl(myBlueprint),
        wikiUrl:''
    }
}