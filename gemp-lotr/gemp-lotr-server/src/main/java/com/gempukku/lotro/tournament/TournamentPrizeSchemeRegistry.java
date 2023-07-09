package com.gempukku.lotro.tournament;

import com.gempukku.lotro.game.LotroCardBlueprintLibrary;
import com.gempukku.lotro.packs.ProductLibrary;

public class TournamentPrizeSchemeRegistry {
    public TournamentPrizes getTournamentPrizes(ProductLibrary productLibrary, String prizesScheme) {
        if (prizesScheme == null || prizesScheme.equals("none"))
            return new NoPrizes();

        return new DailyTournamentPrizes(prizesScheme, productLibrary);
    }
}
