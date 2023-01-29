import { hobbitCards } from "./data/hobbit.list";
import { choiceBoosters, fellowshipPacks, gempLotrPromo, holidayOverrides, postMoviePacks, randoms, returnOfTheKingPacks, setStarterPacks, specialStarters, tengwarSelections, twoTowersPacks } from "./data/image-overrides.list";
import { playerCommitteeCards } from "./data/players-committee";
import { set40Cards } from "./data/set40.list";
import { Override } from "./types/override.interface";

/**
 * NOTE: No additional images should be added in this location.
 * All updates should be provided in the data folder and bubble up through
 * the players-committee/index.ts file
 */

let imageOverrides: Map<string, string> | null = null;

const buildImageResolver = (): Map<string, string> => {
    const overrides = new Map<string, string>();
    
    addImageLocations(overrides, holidayOverrides);
    addImageLocations(overrides, gempLotrPromo);
    addImageLocations(overrides, setStarterPacks);
    addImageLocations(overrides, tengwarSelections);
    addImageLocations(overrides, choiceBoosters);
    addImageLocations(overrides, fellowshipPacks);
    addImageLocations(overrides, twoTowersPacks);
    addImageLocations(overrides, returnOfTheKingPacks);
    addImageLocations(overrides, postMoviePacks);
    addImageLocations(overrides, specialStarters);
    addImageLocations(overrides, randoms);
    addImageLocations(overrides, set40Cards);
    addImageLocations(overrides, hobbitCards);

    addImageLocations(overrides, playerCommitteeCards);

    return overrides;
}

const addImageLocations = (overrides: Map<string, string>, newItems: Override[]): void => {
    newItems.forEach(override => {
        overrides.set(override.id, override.url)
    });
}

const getImageOverrides = (): Map<string, string> => {
    if (!imageOverrides) {
        imageOverrides = buildImageResolver();
    }
    return imageOverrides;
}

export const getImageUrl = (blueprintId: string): string => {
    const href = getImageOverrides().get(blueprintId);

    return href ?? undefined;
}