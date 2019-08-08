package com.gempukku.lotro.cards.set40.gondor;

import com.gempukku.lotro.cards.AbstractEvent;
import com.gempukku.lotro.cards.PlayConditions;
import com.gempukku.lotro.cards.actions.PlayEventAction;
import com.gempukku.lotro.cards.effects.ExhaustCharacterEffect;
import com.gempukku.lotro.cards.effects.choose.ChooseAndExertCharactersEffect;
import com.gempukku.lotro.cards.effects.choose.ChooseAndExhaustCharactersEffect;
import com.gempukku.lotro.common.*;
import com.gempukku.lotro.filters.Filters;
import com.gempukku.lotro.game.PhysicalCard;
import com.gempukku.lotro.game.state.LotroGame;

/**
 * Title: A Ranger's Adaptability
 * Set: Second Edition
 * Side: Free
 * Culture: Gondor
 * Twilight Cost: 1
 * Type: Event - Maneuver
 * Card Number: 1U115
 * Game Text: Exert a [GONDOR] ranger to exhaust a roaming minion (or any minion if at a site from your adventure deck.)
 */
public class Card40_115 extends AbstractEvent {
    public Card40_115() {
        super(Side.FREE_PEOPLE, 1, Culture.GONDOR, "A Ranger's Adaptability", Phase.MANEUVER);
    }

    @Override
    public boolean checkPlayRequirements(String playerId, LotroGame game, PhysicalCard self, int withTwilightRemoved, int twilightModifier, boolean ignoreRoamingPenalty, boolean ignoreCheckingDeadPile) {
        return super.checkPlayRequirements(playerId, game, self, withTwilightRemoved, twilightModifier, ignoreRoamingPenalty, ignoreCheckingDeadPile)
                && PlayConditions.canExert(self, game, Culture.GONDOR, Keyword.RANGER);
    }

    @Override
    public PlayEventAction getPlayCardAction(String playerId, LotroGame game, PhysicalCard self, int twilightModifier, boolean ignoreRoamingPenalty) {
        PlayEventAction action = new PlayEventAction(self);
        action.appendCost(
                new ChooseAndExertCharactersEffect(action, playerId, 1, 1, Culture.GONDOR, Keyword.RANGER));
        if (PlayConditions.location(game, Filters.owner(playerId)))
            action.appendEffect(
                    new ChooseAndExhaustCharactersEffect(action, playerId, 1, 1, CardType.MINION));
        else
            action.appendEffect(
                    new ChooseAndExhaustCharactersEffect(action, playerId, 1, 1, Filters.roamingMinion));
        return action;
    }
}