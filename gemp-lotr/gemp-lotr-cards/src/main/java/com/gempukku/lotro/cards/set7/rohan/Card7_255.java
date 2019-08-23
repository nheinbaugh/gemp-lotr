package com.gempukku.lotro.cards.set7.rohan;

import com.gempukku.lotro.common.*;
import com.gempukku.lotro.filters.Filters;
import com.gempukku.lotro.game.PhysicalCard;
import com.gempukku.lotro.game.state.LotroGame;
import com.gempukku.lotro.logic.PlayUtils;
import com.gempukku.lotro.logic.actions.ActivateCardAction;
import com.gempukku.lotro.logic.cardtype.AbstractCompanion;
import com.gempukku.lotro.logic.effects.AddTwilightEffect;
import com.gempukku.lotro.logic.effects.ChooseAndHealCharactersEffect;
import com.gempukku.lotro.logic.effects.ChooseArbitraryCardsEffect;
import com.gempukku.lotro.logic.timing.ExtraFilters;
import com.gempukku.lotro.logic.timing.PlayConditions;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * Set: The Return of the King
 * Side: Free
 * Culture: Rohan
 * Twilight Cost: 3
 * Type: Companion • Man
 * Strength: 7
 * Vitality: 3
 * Resistance: 6
 * Signet: Gandalf
 * Game Text: While you can spot a [ROHAN] Man, Theoden's twilight cost is -1. Fellowship: If the twilight pool has
 * fewer than 2 twilight tokens, play a [ROHAN] possession on Theoden and add (2) to heal another [ROHAN] companion.
 */
public class Card7_255 extends AbstractCompanion {
    public Card7_255() {
        super(3, 7, 3, 6, Culture.ROHAN, Race.MAN, Signet.GANDALF, Names.theoden, "Rekindled King", true);
    }

    @Override
    public int getTwilightCostModifier(LotroGame game, PhysicalCard self) {
        if (Filters.canSpot(game, Culture.ROHAN, Race.MAN))
            return -1;
        return 0;
    }

    @Override
    public List<? extends ActivateCardAction> getPhaseActionsInPlay(final String playerId, final LotroGame game, final PhysicalCard self) {
        if (PlayConditions.canUseFPCardDuringPhase(game, Phase.FELLOWSHIP, self)
                && game.getGameState().getTwilightPool() < 2
                && PlayConditions.canPlayFromHand(playerId, game, Culture.ROHAN, CardType.POSSESSION, ExtraFilters.attachableTo(game, self))) {
            ActivateCardAction action = new ActivateCardAction(self);
            action.appendCost(
                    new AddTwilightEffect(self, 2));
            action.appendCost(
                    new ChooseArbitraryCardsEffect(playerId, "Choose card to play", game.getGameState().getHand(playerId), Filters.and(Culture.ROHAN, CardType.POSSESSION, ExtraFilters.attachableTo(game, self)), 1, 1) {
                        @Override
                        protected void cardsSelected(LotroGame game, Collection<PhysicalCard> selectedCards) {
                            if (selectedCards.size() > 0) {
                                PhysicalCard selectedCard = selectedCards.iterator().next();
                                game.getActionsEnvironment().addActionToStack(PlayUtils.getPlayCardAction(game, selectedCard, 0, self, false));
                            }
                        }
                    });
            action.appendEffect(
                    new ChooseAndHealCharactersEffect(action, playerId, 1, 1, Filters.not(self), Culture.ROHAN, CardType.COMPANION));
            return Collections.singletonList(action);
        }
        return null;
    }
}
