package com.gempukku.lotro.competitive;

import com.gempukku.lotro.common.DBDefs;

import java.util.List;
import java.util.Map;

public record PlayerStanding (String playerName, int points, int gamesPlayed, int playerWins, int playerLosses,
                              int byeRound, float opponentScore, int standing) {
    public PlayerStanding WithStanding(int newStanding) {
        return new PlayerStanding(playerName, points, gamesPlayed, playerWins, playerLosses, byeRound, opponentScore, newStanding);
    }
}
