import { isCardErrated } from "./errata.functions";

export const getWikiLink = (blue): string => {
    return '';
    // grab the image URL then remove the prefix (foobar.com/baz/) keep the middle (LOTR01_123) and pitch the suffix (.jpg)
    // var imageUrl = getUrlByBlueprintId(blueprintId, true);
    // var afterLastSlash = imageUrl.lastIndexOf("/") + 1;
    // var countAfterLastSlash = imageUrl.length - 4 - afterLastSlash;
    // return "http://wiki.lotrtcgpc.net/wiki/" + imageUrl.substr(afterLastSlash, countAfterLastSlash);
}

const getUrlByBlueprintId = (id: string, ignoreErrata: boolean): string => {
    // if (!ignoreErrata) {
    //     const errata = isCardErrated()
    // }
    /**
     * 
     * This likely lives in the ???? file
     * the URL returned is either from:
     *  * getFixedImage
     *  * packBlueprints
     * or 
     * * split the string on the _ (format is {setNo}_{cardNo})
     * or
     * * check the getErrata for a value and return it
     * or
     * * return the getMainLocation of the split string
     * or
     * ** if the card is masterworks then format it as{setNo}O0{cardNo - getMasterworksOffset(setNo)}
     * ***or if not masterworks
     * ** return "{mainLocation}LOTR{value above wrt masterworks}{affix T if Tengwar}.jpg"
     */
    return '';
}

const getTengwarWikiUrl = (): string => {
    return ''
}