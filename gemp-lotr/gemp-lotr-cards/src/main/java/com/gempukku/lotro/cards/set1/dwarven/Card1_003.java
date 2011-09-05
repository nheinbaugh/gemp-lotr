package com.gempukku.lotro.cards.set1.dwarven;

import com.gempukku.lotro.cards.AbstractEvent;
import com.gempukku.lotro.cards.actions.PlayEventAction;
import com.gempukku.lotro.cards.effects.AddUntilEndOfPhaseModifierEffect;
import com.gempukku.lotro.cards.modifiers.StrengthModifier;
import com.gempukku.lotro.common.Culture;
import com.gempukku.lotro.common.Keyword;
import com.gempukku.lotro.common.Phase;
import com.gempukku.lotro.common.Side;
import com.gempukku.lotro.filters.Filters;
import com.gempukku.lotro.game.PhysicalCard;
import com.gempukku.lotro.game.state.LotroGame;
import com.gempukku.lotro.logic.effects.ChooseActiveCardEffect;

import java.util.List;

/**
 * Set: The Fellowship of the Ring
 * Side: Free
 * Culture: Dwarven
 * Twilight Cost: 0
 * Type: Event
 * Game Text: Skirmish: Make a Dwarf strength +2 (or +3 if bearing a [DWARVEN] hand weapon).
 */
public class Card1_003 extends AbstractEvent {
    public Card1_003() {
        super(Side.FREE_PEOPLE, Culture.DWARVEN, "Axe Strike", Phase.SKIRMISH);
    }

    @Override
    public boolean checkPlayRequirements(String playerId, LotroGame game, PhysicalCard self) {
        return true;
    }

    @Override
    public PlayEventAction getPlayCardAction(String playerId, final LotroGame game, final PhysicalCard self, int twilightModifier) {
        final PlayEventAction action = new PlayEventAction(self);
        action.addEffect(
                new ChooseActiveCardEffect(playerId, "Choose Dwarf", Filters.keyword(Keyword.DWARF)) {
                    @Override
                    protected void cardSelected(PhysicalCard dwarf) {
                        List<PhysicalCard> attachedDwarvenHandWeapons = Filters.filter(game.getGameState().getAttachedCards(dwarf), game.getGameState(), game.getModifiersQuerying(), Filters.keyword(Keyword.HAND_WEAPON), Filters.culture(Culture.DWARVEN));
                        int bonus = (attachedDwarvenHandWeapons.size() == 0) ? 2 : 3;
                        action.addEffect(
                                new AddUntilEndOfPhaseModifierEffect(
                                        new StrengthModifier(self, Filters.sameCard(dwarf), bonus), Phase.SKIRMISH
                                )
                        );
                    }
                }
        );

        return action;
    }

    @Override
    public int getTwilightCost() {
        return 0;
    }
}
