package com.gempukku.lotro.cards.set1.elven;

import com.gempukku.lotro.cards.AbstractAttachableFPPossession;
import com.gempukku.lotro.cards.PlayConditions;
import com.gempukku.lotro.cards.effects.AddUntilEndOfPhaseModifierEffect;
import com.gempukku.lotro.cards.effects.ChoiceEffect;
import com.gempukku.lotro.cards.effects.ChooseAndDiscardCardFromHandEffect;
import com.gempukku.lotro.cards.effects.ExertCharacterEffect;
import com.gempukku.lotro.cards.modifiers.StrengthModifier;
import com.gempukku.lotro.common.Culture;
import com.gempukku.lotro.common.Keyword;
import com.gempukku.lotro.common.Phase;
import com.gempukku.lotro.common.Zone;
import com.gempukku.lotro.filters.Filter;
import com.gempukku.lotro.filters.Filters;
import com.gempukku.lotro.game.PhysicalCard;
import com.gempukku.lotro.game.state.LotroGame;
import com.gempukku.lotro.logic.actions.CostToEffectAction;
import com.gempukku.lotro.logic.modifiers.Modifier;
import com.gempukku.lotro.logic.timing.Action;
import com.gempukku.lotro.logic.timing.Effect;
import com.gempukku.lotro.logic.timing.UnrespondableEffect;

import java.util.LinkedList;
import java.util.List;

/**
 * Set: The Fellowship of the Ring
 * Side: Free
 * Culture: Elven
 * Twilight Cost: 2
 * Type: Possession • Hand Weapon
 * Strength: +2
 * Game Text: Bearer must be Arwen. She is damage +1. Skirmish: Exert Arwen or discard 2 cards from hand to make her
 * strength +1.
 */
public class Card1_047 extends AbstractAttachableFPPossession {
    public Card1_047() {
        super(2, Culture.ELVEN, "Gwemegil", "1_47", true);
        addKeyword(Keyword.HAND_WEAPON);
    }

    @Override
    public List<? extends Action> getPlayablePhaseActions(final String playerId, LotroGame game, final PhysicalCard self) {
        List<Action> actions = new LinkedList<Action>();

        Filter validTargetFilter = Filters.and(Filters.name("Arwen"), Filters.not(Filters.attached(Filters.keyword(Keyword.HAND_WEAPON))));

        if (!Filters.canSpot(game.getGameState(), game.getModifiersQuerying(), Filters.name("Gwemegil")))
            appendAttachCardFromHandAction(actions, game, self, validTargetFilter);

        appendTransferPossessionAction(actions, game, self, validTargetFilter);

        if (game.getGameState().getCurrentPhase() == Phase.SKIRMISH
                && self.getZone() == Zone.ATTACHED
                &&
                (PlayConditions.canExert(game.getGameState(), game.getModifiersQuerying(), self.getAttachedTo())
                        || game.getGameState().getHand(playerId).size() >= 2)) {
            final CostToEffectAction action = new CostToEffectAction(self, "Exert Arwen or discard 2 cards from hand to make her Strength +1");

            List<Effect> possibleCosts = new LinkedList<Effect>();
            possibleCosts.add(
                    new ExertCharacterEffect(self.getAttachedTo()));
            possibleCosts.add(
                    new UnrespondableEffect() {
                        @Override
                        public String getText() {
                            return "Discard 2 cards";
                        }

                        @Override
                        public boolean canPlayEffect(LotroGame game) {
                            return game.getGameState().getHand(playerId).size() >= 2;
                        }

                        @Override
                        public void playEffect(LotroGame game) {
                            action.addCost(new ChooseAndDiscardCardFromHandEffect(action, playerId, true));
                            action.addCost(new ChooseAndDiscardCardFromHandEffect(action, playerId, true));
                        }
                    });

            action.addCost(
                    new ChoiceEffect(action, playerId, possibleCosts, true));
            action.addEffect(
                    new AddUntilEndOfPhaseModifierEffect(
                            new StrengthModifier(self, Filters.sameCard(self.getAttachedTo()), 1),
                            Phase.SKIRMISH));
        }

        return actions;
    }

    @Override
    public Modifier getAlwaysOnEffect(PhysicalCard self) {
        return new StrengthModifier(self, Filters.attachedTo(self), 2);
    }
}
