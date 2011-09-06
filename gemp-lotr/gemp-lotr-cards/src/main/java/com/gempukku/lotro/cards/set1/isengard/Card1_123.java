package com.gempukku.lotro.cards.set1.isengard;

import com.gempukku.lotro.cards.AbstractEvent;
import com.gempukku.lotro.cards.actions.PlayEventAction;
import com.gempukku.lotro.cards.effects.ChooseAndExertCharacterEffect;
import com.gempukku.lotro.common.*;
import com.gempukku.lotro.filters.Filters;
import com.gempukku.lotro.game.PhysicalCard;
import com.gempukku.lotro.game.state.LotroGame;
import com.gempukku.lotro.logic.effects.ChooseActiveCardEffect;
import com.gempukku.lotro.logic.effects.DiscardCardFromPlayEffect;

/**
 * Set: The Fellowship of the Ring
 * Side: Shadow
 * Culture: Isengard
 * Twilight Cost: 3
 * Type: Event
 * Game Text: Spell. Weather. Maneuver: Exert a [ISENGARD] minion and spot 5 companions to discard an exhausted
 * companion (except the Ring-bearer).
 */
public class Card1_123 extends AbstractEvent {
    public Card1_123() {
        super(Side.SHADOW, Culture.ISENGARD, "Caradhras Has Not Forgiven Us", Phase.MANEUVER);
        addKeyword(Keyword.WEATHER);
        addKeyword(Keyword.SPELL);
    }

    @Override
    public int getTwilightCost() {
        return 3;
    }

    @Override
    public boolean checkPlayRequirements(String playerId, LotroGame game, PhysicalCard self, int twilightModifier) {
        return Filters.canSpot(game.getGameState(), game.getModifiersQuerying(), Filters.culture(Culture.ISENGARD), Filters.type(CardType.MINION), Filters.canExert())
                && Filters.countActive(game.getGameState(), game.getModifiersQuerying(), Filters.type(CardType.COMPANION)) >= 5;
    }

    @Override
    public PlayEventAction getPlayCardAction(String playerId, LotroGame game, final PhysicalCard self, int twilightModifier) {
        final PlayEventAction action = new PlayEventAction(self);
        action.addCost(
                new ChooseAndExertCharacterEffect(action, playerId, "Choose an ISENGARD minion", true, Filters.culture(Culture.ISENGARD), Filters.type(CardType.MINION), Filters.canExert()));
        action.addEffect(
                new ChooseActiveCardEffect(playerId, "Choose non Ring-bearer exhausted companion", Filters.type(CardType.COMPANION), Filters.not(Filters.keyword(Keyword.RING_BEARER)), Filters.not(Filters.canExert())) {
                    @Override
                    protected void cardSelected(PhysicalCard exhaustedCompanion) {
                        action.addEffect(new DiscardCardFromPlayEffect(self, exhaustedCompanion));
                    }
                }
        );
        return action;
    }
}
