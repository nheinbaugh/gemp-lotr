package com.gempukku.lotro.tournament;

import com.gempukku.lotro.collection.CollectionsManager;
import com.gempukku.lotro.common.DBDefs;
import com.gempukku.lotro.db.vo.CollectionType;
import com.gempukku.lotro.draft.DraftPack;
import com.gempukku.lotro.game.LotroCardBlueprintLibrary;
import com.gempukku.lotro.logic.vo.LotroDeck;
import com.gempukku.lotro.packs.DraftPackStorage;
import com.gempukku.lotro.packs.PacksStorage;
import com.gempukku.lotro.packs.ProductLibrary;

import java.time.ZonedDateTime;
import java.util.*;

public class TournamentService implements ITournamentService {
    private final ProductLibrary _productLibrary;
    private final DraftPackStorage _draftPackStorage;
    private final TournamentDAO _tournamentDao;
    private final TournamentPlayerDAO _tournamentPlayerDao;
    private final TournamentMatchDAO _tournamentMatchDao;
    private final LotroCardBlueprintLibrary _library;

    private final CollectionsManager _collectionsManager;

    private final Map<String, Tournament> _tournamentById = new HashMap<>();

    public TournamentService(CollectionsManager collectionsManager, ProductLibrary productLibrary, DraftPackStorage draftPackStorage,
                             TournamentDAO tournamentDao, TournamentPlayerDAO tournamentPlayerDao, TournamentMatchDAO tournamentMatchDao,
                             LotroCardBlueprintLibrary library) {
        _collectionsManager = collectionsManager;
        _productLibrary = productLibrary;
        _draftPackStorage = draftPackStorage;
        _tournamentDao = tournamentDao;
        _tournamentPlayerDao = tournamentPlayerDao;
        _tournamentMatchDao = tournamentMatchDao;
        _library = library;
    }

    @Override
    public void clearCache() {
        _tournamentById.clear();
    }

    @Override
    public void addPlayer(String tournamentId, String playerName, LotroDeck deck) {
        _tournamentPlayerDao.addPlayer(tournamentId, playerName, deck);
    }

    @Override
    public void dropPlayer(String tournamentId, String playerName) {
        _tournamentPlayerDao.dropPlayer(tournamentId, playerName);
    }

    @Override
    public Set<String> getPlayers(String tournamentId) {
        return _tournamentPlayerDao.getPlayers(tournamentId);
    }

    @Override
    public Map<String, LotroDeck> getPlayerDecks(String tournamentId, String format) {
        return _tournamentPlayerDao.getPlayerDecks(tournamentId, format);
    }

    @Override
    public Set<String> getDroppedPlayers(String tournamentId) {
        return _tournamentPlayerDao.getDroppedPlayers(tournamentId);
    }

    @Override
    public LotroDeck getPlayerDeck(String tournamentId, String player, String format) {
        return _tournamentPlayerDao.getPlayerDeck(tournamentId, player, format);
    }

    @Override
    public void addMatch(String tournamentId, int round, String playerOne, String playerTwo) {
        _tournamentMatchDao.addMatch(tournamentId, round, playerOne, playerTwo);
    }

    @Override
    public void setMatchResult(String tournamentId, int round, String winner) {
        _tournamentMatchDao.setMatchResult(tournamentId, round, winner);
    }

    @Override
    public void setPlayerDeck(String tournamentId, String player, LotroDeck deck) {
        _tournamentPlayerDao.updatePlayerDeck(tournamentId, player, deck);
    }

    @Override
    public List<TournamentMatch> getMatches(String tournamentId) {
        return _tournamentMatchDao.getMatches(tournamentId);
    }

    @Override
    public Tournament addTournament(TournamentInfo info) {

        _tournamentDao.addTournament(info.ToDB());
        return createTournamentAndStoreInCache(info);
    }

    @Override
    public void updateTournamentStage(String tournamentId, Tournament.Stage stage) {
        _tournamentDao.updateTournamentStage(tournamentId, stage);
    }

    @Override
    public void updateTournamentRound(String tournamentId, int round) {
        _tournamentDao.updateTournamentRound(tournamentId, round);
    }

    @Override
    public List<Tournament> getOldTournaments(ZonedDateTime since) {
        List<Tournament> result = new ArrayList<>();
        for (var dbinfo : _tournamentDao.getFinishedTournamentsSince(since)) {
            Tournament tournament = _tournamentById.get(dbinfo.tournament_id);
            if (tournament == null)
                tournament = createTournamentAndStoreInCache(new TournamentInfo(_productLibrary, dbinfo));
            result.add(tournament);
        }
        return result;
    }

    @Override
    public List<Tournament> getLiveTournaments() {
        List<Tournament> result = new ArrayList<>();
        for (var dbinfo : _tournamentDao.getUnfinishedTournaments()) {
            Tournament tournament = _tournamentById.get(dbinfo.tournament_id);
            if (tournament == null)
                tournament = createTournamentAndStoreInCache(new TournamentInfo(_productLibrary, dbinfo));
            result.add(tournament);
        }
        return result;
    }

    @Override
    public Tournament getTournamentById(String tournamentId) {
        Tournament tournament = _tournamentById.get(tournamentId);
        if (tournament == null) {
            var dbinfo = _tournamentDao.getTournamentById(tournamentId);
            if (dbinfo == null)
                return null;

            tournament = createTournamentAndStoreInCache(new TournamentInfo(_productLibrary, dbinfo));
        }
        return tournament;
    }

    private Tournament createTournamentAndStoreInCache(TournamentInfo info) {
        Tournament tournament;
        try {
            DraftPack draftPack = null;
            //The below appears to be half-finished and completely pointless
//            String draftType = info.getDraftType();
//            if (draftType != null)
//                _draftPackStorage.getDraftPack(draftType);

            tournament = new DefaultTournament(this, _collectionsManager, _productLibrary, null, info);

        } catch (Exception exp) {
            throw new RuntimeException("Unable to create Tournament", exp);
        }
        _tournamentById.put(tournament.getTournamentId(), tournament);
        return tournament;
    }

    @Override
    public void addRoundBye(String tournamentId, String player, int round) {
        _tournamentMatchDao.addBye(tournamentId, player, round);
    }

    @Override
    public Map<String, Integer> getPlayerByes(String tournamentId) {
        return _tournamentMatchDao.getPlayerByes(tournamentId);
    }

    @Override
    public List<DBDefs.ScheduledTournament> getUnstartedScheduledTournamentQueues(ZonedDateTime tillDate) {
        return _tournamentDao.getUnstartedScheduledTournamentQueues(tillDate);
    }

    @Override
    public void updateScheduledTournamentStarted(String scheduledTournamentId) {
        _tournamentDao.updateScheduledTournamentStarted(scheduledTournamentId);
    }
}
