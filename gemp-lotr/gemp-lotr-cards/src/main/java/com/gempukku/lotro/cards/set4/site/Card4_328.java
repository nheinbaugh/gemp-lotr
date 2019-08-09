package com.gempukku.lotro.cards.set4.site;

import com.gempukku.lotro.common.SitesBlock;
import com.gempukku.lotro.logic.cardtype.AbstractSite;
import com.gempukku.lotro.logic.timing.PlayConditions;
import com.gempukku.lotro.logic.effects.choose.ChooseAndExertCharactersEffect;
import com.gempukku.lotro.logic.effects.choose.ChooseAndPlayCardFromDeckEffect;
import com.gempukku.lotro.common.Keyword;
import com.gempukku.lotro.common.Phase;
import com.gempukku.lotro.filters.Filters;
import com.gempukku.lotro.game.PhysicalCard;
import com.gempukku.lotro.game.state.LotroGame;
import com.gempukku.lotro.logic.actions.ActivateCardAction;
import com.gempukku.lotro.logic.timing.Action;

import java.util.Collections;
import java.util.List;

/**
 * Set: The Two Towers
 * Type: Site
 * Site: 1T
 * Game Text: Plains. Fellowship: Exert 2 unbound companions to play Aragorn from your draw deck.
 */
public class Card4_328 extends AbstractSite {
    public Card4_328() {
        super("The Riddermark", SitesBlock.TWO_TOWERS, 1, 0, Direction.LEFT);
        addKeyword(Keyword.PLAINS);
    }

    @Override
    public List<? extends Action> getPhaseActions(String playerId, LotroGame game, PhysicalCard self) {
        if (PlayConditions.canUseSiteDuringPhase(game, Phase.FELLOWSHIP, self)
                && PlayConditions.canExert(self, game, 1, 2, Filters.unboundCompanion)) {
            ActivateCardAction action = new ActivateCardAction(self);
            action.appendCost(
                    new ChooseAndExertCharactersEffect(action, playerId, 2, 2, Filters.unboundCompanion));
            action.appendEffect(
                    new ChooseAndPlayCardFromDeckEffect(playerId, Filters.aragorn));
            return Collections.singletonList(action);
        }
        return null;
    }
}
