
package com.gempukku.lotro.cards.unofficial.pc.vset1.vpack1;

import com.gempukku.lotro.cards.GenericCardTestHelper;
import com.gempukku.lotro.common.*;
import com.gempukku.lotro.game.CardNotFoundException;
import com.gempukku.lotro.game.PhysicalCardImpl;
import com.gempukku.lotro.logic.decisions.DecisionResultInvalidException;
import com.gempukku.lotro.logic.modifiers.MoveLimitModifier;
import org.junit.Test;
import org.xml.sax.SAXNotRecognizedException;

import java.util.HashMap;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class Card_V1_055_Tests
{

	protected GenericCardTestHelper GetScenario() throws CardNotFoundException, DecisionResultInvalidException {
		return new GenericCardTestHelper(
				new HashMap<String, String>()
				{{
					put("yet", "151_55");
					put("boromir", "1_97");
					put("sam", "1_311");
					put("pippin", "1_306");
					put("merry", "1_302");
					put("gimli", "2_121");

					put("runner", "1_178");
				}},
				GenericCardTestHelper.FellowshipSites,
				GenericCardTestHelper.FOTRFrodo,
				GenericCardTestHelper.FOTRRing
		);
	}

	@Test
	public void WeMayYetStatsAndKeywordsAreCorrect() throws DecisionResultInvalidException, CardNotFoundException {

		/**
		* Set: V1
		* Title: We May Yet
		* Side: Free Peoples
		* Culture: shire
		* Twilight Cost: 1
		* Type: event
		* Subtype: Skirmish
		* Game Text: Exert a companion with the Frodo signet to make that companion strength +1 for each companion with the Frodo signet you can spot (limit +4).
		*/

		//Pre-game setup
		GenericCardTestHelper scn = GetScenario();

		PhysicalCardImpl yet = scn.GetFreepsCard("yet");

		assertFalse(yet.getBlueprint().isUnique());
		assertEquals(Side.FREE_PEOPLE, yet.getBlueprint().getSide());
		assertEquals(Culture.SHIRE, yet.getBlueprint().getCulture());
		assertEquals(CardType.EVENT, yet.getBlueprint().getCardType());
		//assertEquals(Race.CREATURE, yet.getBlueprint().getRace());
		assertTrue(scn.HasKeyword(yet, Keyword.SKIRMISH)); // test for keywords as needed
		assertEquals(1, yet.getBlueprint().getTwilightCost());
		//assertEquals(, yet.getBlueprint().getStrength());
		//assertEquals(, yet.getBlueprint().getVitality());
		//assertEquals(, yet.getBlueprint().getResistance());
		//assertEquals(Signet., yet.getBlueprint().getSignet());
		//assertEquals(, yet.getBlueprint().getSiteNumber()); // Change this to getAllyHomeSiteNumbers for allies

	}

	@Test
	public void WeMayYetExertsToPumpBasedOnFrodoSignets() throws DecisionResultInvalidException, CardNotFoundException {
		//Pre-game setup
		GenericCardTestHelper scn = GetScenario();

		PhysicalCardImpl yet = scn.GetFreepsCard("yet");
		PhysicalCardImpl boromir = scn.GetFreepsCard("boromir");
		PhysicalCardImpl sam = scn.GetFreepsCard("sam");
		PhysicalCardImpl merry = scn.GetFreepsCard("merry");
		PhysicalCardImpl pippin = scn.GetFreepsCard("pippin");
		PhysicalCardImpl gimli = scn.GetFreepsCard("gimli");
		scn.FreepsMoveCharToTable(boromir, sam, merry, pippin, gimli);
		scn.FreepsMoveCardToHand(yet);

		PhysicalCardImpl runner = scn.GetShadowCard("runner");
		scn.ShadowMoveCharToTable(runner);

		scn.StartGame();
		scn.SkipToPhase(Phase.ASSIGNMENT);
		scn.PassCurrentPhaseActions();
		scn.FreepsAssignToMinions(boromir, runner);
		scn.FreepsResolveSkirmish(boromir);

		assertTrue(scn.FreepsCardPlayAvailable(yet));
		assertEquals(0, scn.GetWoundsOn(boromir));
		assertEquals(7, scn.GetStrength(boromir));

		scn.FreepsPlayCard(yet);
		assertEquals(1, scn.GetWoundsOn(boromir));
		// frodo/boromir/gimli/merry/pippin makes 5 frodo signets, but it's capped to 4.  Sam is gorn signet
		assertEquals(11, scn.GetStrength(boromir));
	}

	@Test
	public void WeMayYetRequiresFrodoSignetInSkirmish() throws DecisionResultInvalidException, CardNotFoundException {
		//Pre-game setup
		GenericCardTestHelper scn = GetScenario();

		PhysicalCardImpl yet = scn.GetFreepsCard("yet");
		PhysicalCardImpl sam = scn.GetFreepsCard("sam");
		scn.FreepsMoveCharToTable(sam);
		scn.FreepsMoveCardToHand(yet);

		PhysicalCardImpl runner = scn.GetShadowCard("runner");
		scn.ShadowMoveCharToTable(runner);

		scn.StartGame();

		scn.AddWoundsToChar(scn.GetRingBearer(), 4);
		scn.FreepsPassCurrentPhaseAction();
		scn.FreepsAcceptOptionalTrigger(); // transfer ring to sam

		scn.SkipToPhase(Phase.ASSIGNMENT);
		scn.PassCurrentPhaseActions();
		scn.FreepsAssignToMinions(sam, runner);
		scn.FreepsResolveSkirmish(sam);

		assertFalse(scn.FreepsCardPlayAvailable(yet));

	}
}
