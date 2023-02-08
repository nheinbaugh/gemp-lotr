import { getImageUrl } from "../updated/jCard/modules/image-resolution/image-resolver";
import { renderCard } from "../updated/jCard/components/card.component";

$(document).ready(() => {
    const bob = renderCard(getImageUrl('05_025'), 'card text');
    $('#rawr').append(bob);
});