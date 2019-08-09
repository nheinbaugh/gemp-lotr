package com.gempukku.lotro.cards.set4.site;

import com.gempukku.lotro.common.SitesBlock;
import com.gempukku.lotro.logic.cardtype.AbstractSite;
import com.gempukku.lotro.common.Keyword;
import com.gempukku.lotro.common.Phase;
import com.gempukku.lotro.game.PhysicalCard;
import com.gempukku.lotro.game.state.LotroGame;
import com.gempukku.lotro.logic.modifiers.AbstractModifier;
import com.gempukku.lotro.logic.modifiers.Modifier;
import com.gempukku.lotro.logic.modifiers.ModifierEffect;
import com.gempukku.lotro.logic.timing.Action;

import java.util.Collections;
import java.util.List;

/**
 * Set: The Two Towers
 * Twilight Cost: 7
 * Type: Site
 * Site: 7T
 * Game Text: Underground. Skirmish events may not be played and skirmish special abilities may not be used.
 */
public class Card4_355 extends AbstractSite {
    public Card4_355() {
        super("Cavern Entrance", SitesBlock.TWO_TOWERS, 7, 7, Direction.RIGHT);
        addKeyword(Keyword.UNDERGROUND);
    }

    @Override
    public List<? extends Modifier> getAlwaysOnModifiers(LotroGame game, PhysicalCard self) {
        return Collections.singletonList(
                new AbstractModifier(self, null, null, ModifierEffect.ACTION_MODIFIER) {
                    @Override
                    public boolean canPlayAction(LotroGame game, String performingPlayer, Action action) {
                        if (action.getActionTimeword() == Phase.SKIRMISH)
                            return false;
                        return true;
                    }
                });
    }
}
