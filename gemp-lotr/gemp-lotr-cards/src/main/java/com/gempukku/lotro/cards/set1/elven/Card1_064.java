package com.gempukku.lotro.cards.set1.elven;

import com.gempukku.lotro.logic.cardtype.AbstractEvent;
import com.gempukku.lotro.logic.timing.PlayConditions;
import com.gempukku.lotro.logic.actions.PlayEventAction;
import com.gempukku.lotro.logic.effects.AddUntilStartOfPhaseModifierEffect;
import com.gempukku.lotro.logic.effects.choose.ChooseAndExertCharactersEffect;
import com.gempukku.lotro.logic.modifiers.AllyParticipatesInArcheryFireAndSkirmishesModifier;
import com.gempukku.lotro.common.*;
import com.gempukku.lotro.filters.Filters;
import com.gempukku.lotro.game.PhysicalCard;
import com.gempukku.lotro.game.state.LotroGame;
import com.gempukku.lotro.logic.modifiers.StrengthModifier;

/**
 * Set: The Fellowship of the Ring
 * Side: Free
 * Culture: Elven
 * Twilight Cost: 1
 * Type: Event
 * Game Text: Maneuver: Exert an Elf ally whose home is site 3. Until the regroup phase, that ally is strength +3 and
 * participates in archery fire and skirmishes.
 */
public class Card1_064 extends AbstractEvent {
    public Card1_064() {
        super(Side.FREE_PEOPLE, 1, Culture.ELVEN, "Support of the Last Homely House", Phase.MANEUVER);
    }

    @Override
    public boolean checkPlayRequirements(String playerId, LotroGame game, PhysicalCard self, int withTwilightRemoved, int twilightModifier, boolean ignoreRoamingPenalty, boolean ignoreCheckingDeadPile) {
        return super.checkPlayRequirements(playerId, game, self, withTwilightRemoved, twilightModifier, ignoreRoamingPenalty, ignoreCheckingDeadPile)
                && PlayConditions.canExert(self, game, Race.ELF, CardType.ALLY, Filters.isAllyHome(3, SitesBlock.FELLOWSHIP));
    }

    @Override
    public PlayEventAction getPlayCardAction(final String playerId, LotroGame game, final PhysicalCard self, int twilightModifier, boolean ignoreRoamingPenalty) {
        final PlayEventAction action = new PlayEventAction(self);
        action.appendCost(
                new ChooseAndExertCharactersEffect(action, playerId, 1, 1, Race.ELF, CardType.ALLY, Filters.isAllyHome(3, SitesBlock.FELLOWSHIP)) {
                    @Override
                    protected void forEachCardExertedCallback(PhysicalCard elfAlly) {
                        action.appendEffect(
                                new AddUntilStartOfPhaseModifierEffect(
                                        new StrengthModifier(self, Filters.sameCard(elfAlly), 3)
                                        , Phase.REGROUP));
                        action.appendEffect(
                                new AddUntilStartOfPhaseModifierEffect(
                                        new AllyParticipatesInArcheryFireAndSkirmishesModifier(self, Filters.sameCard(elfAlly))
                                        , Phase.REGROUP));
                    }
                }
        );
        return action;
    }
}
