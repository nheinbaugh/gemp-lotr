import { wikiBaseUrl } from "../../modules/image-resolution/types/card-image.constants";
import { CardBlueprint } from "../card-blueprint.interface";
import { generateImageFileName } from "../card-image.functions";

const fixedImages = ['15_204', '15_205', '15_206', '15_207', 'gl_theOneRing'];




/**
 * Get a link to the wiki for the given LOTR card
 * @param blueprint 
 * @param imageUrl 
 * @returns The wiki link in the format of https://wiki.lotrtcgpc.net/wiki/LOTR05025
 */
export const getWikiLink = (blueprint: CardBlueprint, imageUrl: string): string | null =>    {
    if (imageUrl.includes('booster') || fixedImages.includes(`${blueprint.formattedSetNumber}_${blueprint.formattedCardNumber}`)) {
        // TODO: this is a naive repro of what is currently used, but it won't work if we add to fixed images
        // figure out a cleaner way to do this
        return null;
    }

    return `${wikiBaseUrl}/${generateImageFileName(blueprint.set, blueprint.cardNumber)}`;

    // grab the image URL then remove the prefix (foobar.com/baz/) keep the middle (LOTR01_123) and pitch the suffix (.jpg)
    // var imageUrl = getUrlByBlueprintId(blueprintId, true);
    // var afterLastSlash = imageUrl.lastIndexOf("/") + 1;
    // var countAfterLastSlash = imageUrl.length - 4 - afterLastSlash;
    // return "http://wiki.lotrtcgpc.net/wiki/" + imageUrl.substr(afterLastSlash, countAfterLastSlash);
}
