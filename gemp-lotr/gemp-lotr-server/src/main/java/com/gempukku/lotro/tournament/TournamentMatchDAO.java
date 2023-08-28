package com.gempukku.lotro.tournament;

import com.gempukku.lotro.common.DBDefs;

import java.util.List;
import java.util.Map;

public interface TournamentMatchDAO {
    public int addMatch(String tournamentId, int round, String playerOne, String playerTwo);

    public void setMatchResult(String tournamentId, int round, String winner);

    public List<DBDefs.TournamentMatch> getMatches(String tournamentId);

    public int addBye(String tournamentId, String player, int round);

    public Map<String, Integer> getPlayerByes(String tournamentId);
}
