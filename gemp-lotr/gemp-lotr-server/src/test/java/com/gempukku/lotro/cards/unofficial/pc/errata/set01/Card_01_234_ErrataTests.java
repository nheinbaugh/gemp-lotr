package com.gempukku.lotro.cards.unofficial.pc.errata.set01;

import com.gempukku.lotro.cards.GenericCardTestHelper;
import com.gempukku.lotro.common.*;
import com.gempukku.lotro.game.CardNotFoundException;
import com.gempukku.lotro.game.PhysicalCardImpl;
import com.gempukku.lotro.logic.decisions.DecisionResultInvalidException;
import org.junit.Test;

import java.util.HashMap;

import static org.junit.Assert.*;

public class Card_01_234_ErrataTests
{

	protected GenericCardTestHelper GetScenario() throws CardNotFoundException, DecisionResultInvalidException {
		return new GenericCardTestHelper(
				new HashMap<>()
				{{
					put("comp2", "1_53");
					put("comp3", "1_53");
					put("comp4", "1_53");
					put("comp5", "1_53");
					put("comp6", "1_53");

					put("nertea", "51_234");
					put("runner", "1_178");
					put("twk", "2_85");
					put("attea", "1_229");
					put("rit", "101_40");
				}},
				GenericCardTestHelper.FellowshipSites,
				GenericCardTestHelper.FOTRFrodo,
				GenericCardTestHelper.RulingRing
		);
	}

	@Test
	public void UlaireNerteaStatsAndKeywordsAreCorrect() throws DecisionResultInvalidException, CardNotFoundException {

		/**
		* Set: 1
		* Title: *Ulaire Nertea, Messenger of Dol Guldur
		* Side: Free Peoples
		* Culture: Ringwraith
		* Twilight Cost: 4
		* Type: minion
		* Subtype: Nazgul
		* Strength: 9
		* Vitality: 2
		* Site Number: 3
		* Game Text: When you play Ulaire Nertea, for each companion over 4, you may play a unique [Wraith] minion from your discard pile.
		*/

		//Pre-game setup
		GenericCardTestHelper scn = GetScenario();

		PhysicalCardImpl nertea = scn.GetFreepsCard("nertea");

		assertTrue(nertea.getBlueprint().isUnique());
		assertEquals(Side.SHADOW, nertea.getBlueprint().getSide());
		assertEquals(Culture.WRAITH, nertea.getBlueprint().getCulture());
		assertEquals(CardType.MINION, nertea.getBlueprint().getCardType());
		assertEquals(Race.NAZGUL, nertea.getBlueprint().getRace());
		assertEquals(4, nertea.getBlueprint().getTwilightCost());
		assertEquals(9, nertea.getBlueprint().getStrength());
		assertEquals(2, nertea.getBlueprint().getVitality());
		assertEquals(3, nertea.getBlueprint().getSiteNumber());

	}

	@Test
	public void NerteaDoesNotTriggerWith4Companions() throws DecisionResultInvalidException, CardNotFoundException {
		//Pre-game setup
		GenericCardTestHelper scn = GetScenario();

		scn.FreepsMoveCharToTable("comp2", "comp3", "comp4");

		PhysicalCardImpl nertea = scn.GetShadowCard("nertea");
		scn.ShadowMoveCardToHand(nertea);

		scn.StartGame();
		scn.SetTwilight(20);
		scn.FreepsPassCurrentPhaseAction();

		scn.ShadowPlayCard(nertea);
		assertFalse(scn.ShadowHasOptionalTriggerAvailable());
	}

	@Test
	public void NerteaPlaysUniqueWraithMinionIf5Companions() throws DecisionResultInvalidException, CardNotFoundException {
		//Pre-game setup
		GenericCardTestHelper scn = GetScenario();

		scn.FreepsMoveCharToTable("comp2", "comp3", "comp4", "comp5");

		PhysicalCardImpl twk = scn.GetShadowCard("twk");
		PhysicalCardImpl attea = scn.GetShadowCard("attea");
		PhysicalCardImpl nertea = scn.GetShadowCard("nertea");
		scn.ShadowMoveCardToDiscard("runner", "rit", "twk", "attea");
		scn.ShadowMoveCardToDiscard(twk);
		scn.ShadowMoveCardToHand(nertea);

		scn.StartGame();
		scn.SetTwilight(30);
		scn.FreepsPassCurrentPhaseAction();

		scn.ShadowPlayCard(nertea);
		assertTrue(scn.ShadowDecisionAvailable("play a unique WRAITH minion"));
		scn.ShadowChooseYes();
		//twk and attea, but not rit or runner
		assertEquals(2, scn.GetShadowCardChoiceCount());
		assertEquals(Zone.DISCARD, twk.getZone());
		scn.ShadowChooseCardBPFromSelection(twk);
		assertEquals(Zone.SHADOW_CHARACTERS, twk.getZone());

		assertFalse(scn.ShadowDecisionAvailable("play a unique WRAITH minion"));
	}

	@Test
	public void NerteaPlays2UniqueWraithMinionsIf6Companions() throws DecisionResultInvalidException, CardNotFoundException {
		//Pre-game setup
		GenericCardTestHelper scn = GetScenario();

		scn.FreepsMoveCharToTable("comp2", "comp3", "comp4", "comp5", "comp6");

		PhysicalCardImpl twk = scn.GetShadowCard("twk");
		PhysicalCardImpl attea = scn.GetShadowCard("attea");
		PhysicalCardImpl nertea = scn.GetShadowCard("nertea");
		scn.ShadowMoveCardToDiscard("runner", "rit", "twk", "attea");
		scn.ShadowMoveCardToDiscard(twk);
		scn.ShadowMoveCardToHand(nertea);

		scn.StartGame();
		scn.SetTwilight(30);
		scn.FreepsPassCurrentPhaseAction();

		scn.ShadowPlayCard(nertea);
		assertTrue(scn.ShadowDecisionAvailable("play a unique WRAITH minion"));
		scn.ShadowChooseYes();
		//twk and attea, but not rit or runner
		assertEquals(2, scn.GetShadowCardChoiceCount());
		assertEquals(Zone.DISCARD, twk.getZone());
		scn.ShadowChooseCardBPFromSelection(twk);
		assertEquals(Zone.SHADOW_CHARACTERS, twk.getZone());

		assertTrue(scn.ShadowDecisionAvailable("play a unique WRAITH minion"));
		assertEquals(Zone.DISCARD, attea.getZone());
		scn.ShadowChooseYes();
		assertEquals(Zone.SHADOW_CHARACTERS, attea.getZone());

		assertFalse(scn.ShadowDecisionAvailable("play a unique WRAITH minion"));
	}
}
