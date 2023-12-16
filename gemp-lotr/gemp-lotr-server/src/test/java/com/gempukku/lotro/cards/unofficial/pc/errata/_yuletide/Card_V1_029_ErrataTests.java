package com.gempukku.lotro.cards.unofficial.pc.errata.set101;

import com.gempukku.lotro.cards.GenericCardTestHelper;
import com.gempukku.lotro.common.*;
import com.gempukku.lotro.game.CardNotFoundException;
import com.gempukku.lotro.game.PhysicalCardImpl;
import com.gempukku.lotro.logic.decisions.DecisionResultInvalidException;
import com.gempukku.lotro.logic.modifiers.MoveLimitModifier;
import org.junit.Test;

import java.util.HashMap;

import static org.junit.Assert.*;

public class Card_V1_029_ErrataTests
{

	protected GenericCardTestHelper GetScenario() throws CardNotFoundException, DecisionResultInvalidException {
		return new GenericCardTestHelper(
				new HashMap<>()
				{{
					put("card", "151_29");
					// put other cards in here as needed for the test case
				}},
				GenericCardTestHelper.FellowshipSites,
				GenericCardTestHelper.FOTRFrodo,
				GenericCardTestHelper.RulingRing
		);
	}

	// Uncomment both @Test markers below once this is ready to be used

	//@Test
	public void MurderofCrowsStatsAndKeywordsAreCorrect() throws DecisionResultInvalidException, CardNotFoundException {

		/**
		* Set: V1
		* Title: Murder of Crows
		* Unique: True
		* Side: SHADOW
		* Culture: Isengard
		* Twilight Cost: 4
		* Type: minion
		* Subtype: Crow
		* Strength: 4
		* Vitality: 3
		* Site Number: 4
		* Game Text: While you can spot 3 Free Peoples conditions, this minion is twilight cost -3. 
		* 	Shadow: Spot 3 Free Peoples conditions (or spot Saruman) to take an [isengard] condition into hand
		 * 	from your draw deck or discard pile (limit once per phase).
		*/

		//Pre-game setup
		var scn = GetScenario();

		var card = scn.GetFreepsCard("card");

		assertTrue(card.getBlueprint().isUnique());
		assertEquals(Side.SHADOW, card.getBlueprint().getSide());
		assertEquals(Culture.ISENGARD, card.getBlueprint().getCulture());
		assertEquals(CardType.MINION, card.getBlueprint().getCardType());
		assertEquals(Race.CROW, card.getBlueprint().getRace());
		//assertTrue(card.getBlueprint().getPossessionClasses().contains(PossessionClass.CROW));
		assertTrue(scn.HasKeyword(card, Keyword.SUPPORT_AREA));
		assertEquals(4, card.getBlueprint().getTwilightCost());
		assertEquals(4, card.getBlueprint().getStrength());
		assertEquals(3, card.getBlueprint().getVitality());
		//assertEquals(, card.getBlueprint().getResistance());
		//assertEquals(Signet., card.getBlueprint().getSignet()); 
		assertEquals(4, card.getBlueprint().getSiteNumber());
	}

	//@Test
	public void MurderofCrowsTest1() throws DecisionResultInvalidException, CardNotFoundException {
		//Pre-game setup
		var scn = GetScenario();

		var card = scn.GetFreepsCard("card");
		scn.FreepsMoveCardToHand(card);

		scn.StartGame();
		scn.FreepsPlayCard(card);

		assertEquals(4, scn.GetTwilight());
	}
}
