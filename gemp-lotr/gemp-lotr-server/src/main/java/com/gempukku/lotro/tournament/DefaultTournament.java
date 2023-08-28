package com.gempukku.lotro.tournament;

import com.gempukku.lotro.DateUtils;
import com.gempukku.lotro.collection.CollectionsManager;
import com.gempukku.lotro.competitive.BestOfOneStandingsProducer;
import com.gempukku.lotro.competitive.PlayerStanding;
import com.gempukku.lotro.db.vo.CollectionType;
import com.gempukku.lotro.draft.DefaultDraft;
import com.gempukku.lotro.draft.Draft;
import com.gempukku.lotro.draft.DraftPack;
import com.gempukku.lotro.game.*;
import com.gempukku.lotro.game.formats.LotroFormatLibrary;
import com.gempukku.lotro.logic.GameUtils;
import com.gempukku.lotro.logic.vo.LotroDeck;
import com.gempukku.lotro.packs.PacksStorage;
import com.gempukku.lotro.packs.ProductLibrary;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.json.XML;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class DefaultTournament implements Tournament {
    // 10 minutes
    private final int _deckBuildTime = 10 * 60 * 1000;
    private long _waitForPairingsTime = 1000 * 60 * 2;

    private final PairingMechanism _pairingMechanism;
    private final TournamentPrizes _tournamentPrizes;
    private final String _tournamentId;
    private final String _tournamentName;
    private final String _format;
    private final CollectionType _collectionType;
    private Stage _tournamentStage;
    private int _tournamentRound;

    private final Set<String> _players;
    private String _playerList;
    private final Map<String, LotroDeck> _playerDecks;
    private final Set<String> _droppedPlayers;
    //This used to be "byes per player", but is now "rounds with byes per player"
    private final HashMap<String, Integer> _playerByes;

    private final Set<String> _currentlyPlayingPlayers;
    private final Set<TournamentMatch> _finishedTournamentMatches;

    private final TournamentService _tournamentService;

    private final ReadWriteLock _lock = new ReentrantReadWriteLock();
    private TournamentTask _nextTask;

    private long _deckBuildStartTime;
    private Draft _draft;

    private List<PlayerStanding> _currentStandings;

    private final boolean _manualKickoff;
    private boolean _hasKickedOff;

    private String _tournamentReport;

    public DefaultTournament(TournamentService tournamentService, String tournamentId,
                             String tournamentName, String format, CollectionType collectionType,
                             int tournamentRound, Stage tournamentStage, boolean manualKickoff,
                             PairingMechanism pairingMechanism, TournamentPrizes tournamentPrizes,
                             CollectionsManager collectionsManager, ProductLibrary productLibrary, DraftPack draftPack) {
        _tournamentService = tournamentService;
        _tournamentId = tournamentId;
        _tournamentName = tournamentName;
        _format = format;
        _collectionType = collectionType;
        _tournamentRound = tournamentRound;
        _tournamentStage = tournamentStage;
        _manualKickoff = manualKickoff;
        _pairingMechanism = pairingMechanism;
        _tournamentPrizes = tournamentPrizes;

        _currentlyPlayingPlayers = new HashSet<>();

        _players = new HashSet<>(_tournamentService.getPlayers(_tournamentId));
        _playerDecks = new HashMap<>(_tournamentService.getPlayerDecks(_tournamentId, _format));
        _droppedPlayers = new HashSet<>(_tournamentService.getDroppedPlayers(_tournamentId));
        _playerByes = new HashMap<>(_tournamentService.getPlayerByes(_tournamentId));
        _finishedTournamentMatches = new HashSet<>();

        regeneratePlayerList();

        if (_tournamentStage == Stage.PLAYING_GAMES) {
            Map<String, String> matchesToCreate = new HashMap<>();
            for (TournamentMatch tournamentMatch : _tournamentService.getMatches(_tournamentId)) {
                if (tournamentMatch.isFinished())
                    _finishedTournamentMatches.add(tournamentMatch);
                else {
                    _currentlyPlayingPlayers.add(tournamentMatch.getPlayerOne());
                    _currentlyPlayingPlayers.add(tournamentMatch.getPlayerTwo());
                    matchesToCreate.put(tournamentMatch.getPlayerOne(), tournamentMatch.getPlayerTwo());
                }
            }

            if (matchesToCreate.size() > 0)
                _nextTask = new CreateMissingGames(matchesToCreate);
        } else if (_tournamentStage == Stage.DRAFT) {
            _draft = new DefaultDraft(collectionsManager, _collectionType, productLibrary, draftPack,
                    _players);
        } else if (_tournamentStage == Stage.DECK_BUILDING) {
            _deckBuildStartTime = System.currentTimeMillis();
        } else if (_tournamentStage == Stage.AWAITING_KICKOFF) {

        } else if (_tournamentStage == Stage.FINISHED) {
            _finishedTournamentMatches.addAll(_tournamentService.getMatches(_tournamentId));
        }
    }

    public DefaultTournament(TournamentService tournamentService, CollectionsManager collectionsManager,
                             ProductLibrary productLibrary, DraftPack draftPack, TournamentInfo info) {
        this(tournamentService, info.tournamentId(), info.name(), info.format(), info.collectionType(),
                info.round(), info.tournamentStage(), info.manualKickoff(), info.pairingMechanism(), info.prizesScheme(),
                collectionsManager, productLibrary, draftPack);
    }

    public DefaultTournament( TournamentService tournamentService, TournamentInfo info) {
        this(tournamentService, null, null, null, info);
    }

    protected void regeneratePlayerList() {
        _playerList = "";

        for(var player : _players) {
            if(!_droppedPlayers.contains(player)) {
                _playerList += player + ", ";
            }
        }

        if(_players.size() > 0 && _playerList.length() > 2) {
            _playerList = _playerList.substring(0, _playerList.length() - 2);
        }

        if(_droppedPlayers.size() > 0) {
            _playerList += ", " + String.join("*, ", _droppedPlayers);
            if(_droppedPlayers.size() > 0) {
                _playerList += "*";
            }
        }

    }

    public void setWaitForPairingsTime(long waitForPairingsTime) {
        _waitForPairingsTime = waitForPairingsTime;
    }

    @Override
    public String getPlayOffSystem() {
        return _pairingMechanism.getPlayOffSystem();
    }

    @Override
    public int getPlayersInCompetitionCount() {
        return _players.size() - _droppedPlayers.size();
    }

    @Override
    public String getPlayerList() {
        return _playerList;
    }

    @Override
    public String getTournamentId() {
        return _tournamentId;
    }

    @Override
    public String getTournamentName() {
        return _tournamentName;
    }

    @Override
    public Stage getTournamentStage() {
        return _tournamentStage;
    }

    @Override
    public CollectionType getCollectionType() {
        return _collectionType;
    }

    @Override
    public int getCurrentRound() {
        return _tournamentRound;
    }

    @Override
    public String getFormat() {
        return _format;
    }

    @Override
    public boolean isPlayerInCompetition(String player) {
        _lock.readLock().lock();
        try {
            return _tournamentStage != Stage.FINISHED && _players.contains(player) && !_droppedPlayers.contains(player);
        } finally {
            _lock.readLock().unlock();
        }
    }

    @Override
    public void reportGameFinished(String winner, String loser) {
        _lock.writeLock().lock();
        try {
            if (_tournamentStage == Stage.PLAYING_GAMES && _currentlyPlayingPlayers.contains(winner)
                    && _currentlyPlayingPlayers.contains(loser)) {
                _tournamentService.setMatchResult(_tournamentId, _tournamentRound, winner);
                _currentlyPlayingPlayers.remove(winner);
                _currentlyPlayingPlayers.remove(loser);
                _finishedTournamentMatches.add(
                        new TournamentMatch(winner, loser, winner, _tournamentRound));
                if (_pairingMechanism.shouldDropLoser()) {
                    _tournamentService.dropPlayer(_tournamentId, loser);
                    _droppedPlayers.add(loser);
                }
                _currentStandings = null;
            }
        } finally {
            _lock.writeLock().unlock();
        }
    }

    @Override
    public void playerSubmittedDeck(String player, LotroDeck deck) {
        _lock.writeLock().lock();
        try {
            if (_tournamentStage == Stage.DECK_BUILDING && _players.contains(player)) {
                _tournamentService.setPlayerDeck(_tournamentId, player, deck);
                _playerDecks.put(player, deck);
            }
        } finally {
            _lock.writeLock().unlock();
        }
    }

    public LotroDeck getPlayerDeck(String player) {
        _lock.readLock().lock();
        try {
            return _playerDecks.get(player);
        } finally {
            _lock.readLock().unlock();
        }
    }

    public Draft getDraft() {
        return _draft;
    }

    @Override
    public void playerChosenCard(String playerName, String cardId) {
        _lock.writeLock().lock();
        try {
            if (_tournamentStage == Stage.DRAFT) {
                _draft.playerChosenCard(playerName, cardId);
            }
        } finally {
            _lock.writeLock().unlock();
        }
    }

    @Override
    public boolean dropPlayer(String player) {
        _lock.writeLock().lock();
        try {
            if (_currentlyPlayingPlayers.contains(player))
                return false;
            if (_tournamentStage == Stage.FINISHED)
                return false;
            if (_droppedPlayers.contains(player))
                return false;
            if (!_players.contains(player))
                return false;

            _tournamentService.dropPlayer(_tournamentId, player);
            _droppedPlayers.add(player);
            regeneratePlayerList();
            return true;
        } finally {
            _lock.writeLock().unlock();
        }
    }

    @Override
    public boolean advanceTournament(TournamentCallback tournamentCallback, CollectionsManager collectionsManager) {
        _lock.writeLock().lock();
        try {
            boolean result = false;
            if (_nextTask == null) {
                if (_tournamentStage == Stage.DRAFT) {
                    _draft.advanceDraft(tournamentCallback);
                    if (_draft.isFinished()) {
                        tournamentCallback.broadcastMessage("Drafting in tournament " + _tournamentName + " is finished, starting deck building");
                        _tournamentStage = Stage.DECK_BUILDING;
                        _tournamentService.updateTournamentStage(_tournamentId, _tournamentStage);
                        _deckBuildStartTime = System.currentTimeMillis();
                        _draft = null;
                        result = true;
                    }
                }
                if (_tournamentStage == Stage.DECK_BUILDING) {
                    if (_deckBuildStartTime + _deckBuildTime < System.currentTimeMillis()
                            || _playerDecks.size() == _players.size()) {
                        _tournamentStage = Stage.PLAYING_GAMES;
                        _tournamentService.updateTournamentStage(_tournamentId, _tournamentStage);
                        result = true;
                    }
                }
                if (_tournamentStage == Stage.AWAITING_KICKOFF) {

                }
                else if (_tournamentStage == Stage.PREPARING) {
                    _tournamentStage = Stage.PLAYING_GAMES;
                    _tournamentService.updateTournamentStage(_tournamentId, _tournamentStage);
                }
                else if (_tournamentStage == Stage.PLAYING_GAMES) {
                    if (_currentlyPlayingPlayers.size() == 0) {
                        if (_pairingMechanism.isFinished(_tournamentRound, _players, _droppedPlayers)) {
                            finishTournament(tournamentCallback, collectionsManager);
                        } else {
                            tournamentCallback.broadcastMessage("Tournament " + _tournamentName + " will start round "+(_tournamentRound+1)+" in 2 minutes");
                            _nextTask = new PairPlayers();
                        }
                        result = true;
                    }
                }
            }
            if (_nextTask != null && _nextTask.getExecuteAfter() <= System.currentTimeMillis()) {
                TournamentTask task = _nextTask;
                _nextTask = null;
                task.executeTask(tournamentCallback, collectionsManager);
                result = true;
            }
            return result;
        } finally {
            _lock.writeLock().unlock();
        }
    }

    @Override
    public List<PlayerStanding> getCurrentStandings() {
        List<PlayerStanding> result = _currentStandings;
        if (result != null)
            return result;

        _lock.readLock().lock();
        try {
            _currentStandings = BestOfOneStandingsProducer.produceStandings(_players, _finishedTournamentMatches, 2, 1, _playerByes);
            return _currentStandings;
        } finally {
            _lock.readLock().unlock();
        }
    }

    private void finishTournament(TournamentCallback tournamentCallback, CollectionsManager collectionsManager) {
        _tournamentStage = Stage.FINISHED;
        _tournamentService.updateTournamentStage(_tournamentId, _tournamentStage);
        tournamentCallback.broadcastMessage("Tournament " + _tournamentName + " is finished");
        awardPrizes(collectionsManager);
    }

    private void awardPrizes(CollectionsManager collectionsManager) {
        List<PlayerStanding> list = getCurrentStandings();
        for (PlayerStanding playerStanding : list) {
            CardCollection prizes = _tournamentPrizes.getPrizeForTournament(playerStanding, list.size());
            if (prizes != null)
                collectionsManager.addItemsToPlayerCollection(true, "Tournament " + getTournamentName() + " prize", playerStanding.playerName(), CollectionType.MY_CARDS, prizes.getAll());
            CardCollection trophies = _tournamentPrizes.getTrophyForTournament(playerStanding, list.size());
            if (trophies != null)
                collectionsManager.addItemsToPlayerCollection(true, "Tournament " + getTournamentName() + " trophy", playerStanding.playerName(), CollectionType.TROPHY, trophies.getAll());
        }
    }

    private void createNewGame(TournamentCallback tournamentCallback, String playerOne, String playerTwo) {
        tournamentCallback.createGame(playerOne, _playerDecks.get(playerOne),
                playerTwo, _playerDecks.get(playerTwo));
    }

    private void doPairing(TournamentCallback tournamentCallback, CollectionsManager collectionsManager) {
        _tournamentRound++;
        _tournamentService.updateTournamentRound(_tournamentId, _tournamentRound);
        Map<String, String> pairingResults = new HashMap<>();
        Set<String> byeResults = new HashSet<>();

        Map<String, Set<String>> previouslyPaired = getPreviouslyPairedPlayersMap();

        boolean finished = _pairingMechanism.pairPlayers(_tournamentRound, _players, _droppedPlayers, _playerByes,
                getCurrentStandings(), previouslyPaired, pairingResults, byeResults);
        if (finished) {
            finishTournament(tournamentCallback, collectionsManager);
        } else {
            for (Map.Entry<String, String> pairing : pairingResults.entrySet()) {
                String playerOne = pairing.getKey();
                String playerTwo = pairing.getValue();
                _tournamentService.addMatch(_tournamentId, _tournamentRound, playerOne, playerTwo);
                _currentlyPlayingPlayers.add(playerOne);
                _currentlyPlayingPlayers.add(playerTwo);
                createNewGame(tournamentCallback, playerOne, playerTwo);
            }

            if (byeResults.size() > 0) {
                tournamentCallback.broadcastMessage("Bye awarded to: "+ StringUtils.join(byeResults, ", "));
            }

            for (String bye : byeResults) {
                _tournamentService.addRoundBye(_tournamentId, bye, _tournamentRound);
                _playerByes.put(bye, _tournamentRound);
            }
        }
    }

    private Map<String, Set<String>> getPreviouslyPairedPlayersMap() {
        Map<String, Set<String>> previouslyPaired = new HashMap<>();
        for (String player : _players)
            previouslyPaired.put(player, new HashSet<>());

        for (TournamentMatch finishedTournamentMatch : _finishedTournamentMatches) {
            previouslyPaired.get(finishedTournamentMatch.getWinner()).add(finishedTournamentMatch.getLoser());
            previouslyPaired.get(finishedTournamentMatch.getLoser()).add(finishedTournamentMatch.getWinner());
        }
        return previouslyPaired;
    }

    private class PairPlayers implements TournamentTask {
        private final long _taskStart = System.currentTimeMillis() + _waitForPairingsTime;

        @Override
        public void executeTask(TournamentCallback tournamentCallback, CollectionsManager collectionsManager) {
            doPairing(tournamentCallback, collectionsManager);
        }

        @Override
        public long getExecuteAfter() {
            return _taskStart;
        }
    }

    private class CreateMissingGames implements TournamentTask {
        private final Map<String, String> _gamesToCreate;

        public CreateMissingGames(Map<String, String> gamesToCreate) {
            _gamesToCreate = gamesToCreate;
        }

        @Override
        public void executeTask(TournamentCallback tournamentCallback, CollectionsManager collectionsManager) {
            for (Map.Entry<String, String> pairings : _gamesToCreate.entrySet()) {
                String playerOne = pairings.getKey();
                String playerTwo = pairings.getValue();
                createNewGame(tournamentCallback, playerOne, playerTwo);
            }
        }

        @Override
        public long getExecuteAfter() {
            return 0;
        }
    }

    @Override
    public String produceReport(LotroCardBlueprintLibrary bpLibrary, LotroFormatLibrary formatLibrary,  SortAndFilterCards cardFilter) throws CardNotFoundException {
        if(_tournamentReport != null)
            return _tournamentReport;

        ZonedDateTime start = null;
        ZonedDateTime end = null;

        var games = _tournamentService.getGames(_tournamentName);

        for(var match : _finishedTournamentMatches) {
            var game = games.stream()
                .filter((x) -> x.winner.equals(match.getWinner()) && x.loser.equals(match.getLoser()))
                .findFirst()
                .orElse(null);

            var gameStart = game.GetUTCStartDate();
            var gameEnd = game.GetUTCEndDate();

            if(start == null || gameStart.isBefore(start)) {
                start = gameStart;
            }

            if(end == null || gameEnd.isAfter(end)) {
                end = gameEnd;
            }
        }

        StringBuilder result = new StringBuilder();
        result.append("<html><body>")
                .append("<h1>").append(StringEscapeUtils.escapeHtml(_tournamentName)).append("</h1>")
                .append("<ul>")
                .append("<li>Format: ").append(_format).append("</li>")
                .append("<li>Collection: ").append(_collectionType.getFullName()).append("</li>")
                .append("<li>Total Rounds: ").append(_tournamentRound).append("</li>")
                .append("<li>Start: ").append(DateUtils.FormatStandardDateTime(start)).append("</li>")
                .append("<li>End: ").append(DateUtils.FormatStandardDateTime(end)).append("</li>")
                .append("</ul><br/><br/><hr>");

        for(var standing : getCurrentStandings()) {
            var playerName = standing.playerName();
            result.append("<h2>by ").append(playerName).append("</h2><br/>")
                    .append("<h3>Round Replays</h3>");

            var rounds = new ArrayList<String>();

            var playerRounds = _finishedTournamentMatches.stream()
                    .filter((x) -> x.getPlayerOne().equals(playerName) || x.getPlayerTwo().equals(playerName))
                    .toList();
            for(int i = 1; i <= _tournamentRound; i++) {
                if(_playerByes.containsKey(playerName) && _playerByes.get(playerName) == i) {
                    rounds.add("[bye]");
                    continue;
                }

                int currentRound = i;
                var match = playerRounds.stream().filter(x -> x.getRound() == currentRound)
                        .findFirst().orElse(null);

                if(match == null) {
                    rounds.add("[dropped]");
                    continue;
                }

                var game = games.stream().filter(x -> x.winner.equals(playerName) || x.loser.equals(playerName))
                        .findFirst().orElse(null);
                if(game == null)
                    continue;

                String replayId = game.win_recording_id;
                if(match.getLoser().equals(playerName)) {
                    replayId = game.lose_recording_id;
                }

                rounds.add("<a href='https://play.lotrtcgpc.net/gemp-lotr/game.html?replayId=" +
                        playerName.replace("_", "%5F") + "$" + replayId +
                        "' target='_blank'>Round " + i + "</a>");
            }

            result.append(String.join(" • ", rounds));

            result.append("<h3>Deck</h3>");

            LotroDeck deck = _tournamentService.getPlayerDeck(_tournamentId, playerName, _format);

            String ringBearer = deck.getRingBearer();
            if (ringBearer != null) {
                result.append("<b>Ring-bearer:</b> ")
                    .append(GameUtils.getFullName(bpLibrary.getLotroCardBlueprint(ringBearer)))
                    .append("<br/>");
            }

            String ring = deck.getRing();
            if (ring != null) {
                result.append("<b>Ring:</b> ")
                    .append(GameUtils.getFullName(bpLibrary.getLotroCardBlueprint(ring)))
                    .append("<br/>");
            }

            DefaultCardCollection deckCards = new DefaultCardCollection();
            for (String card : deck.getAdventureCards()) {
                deckCards.addItem(bpLibrary.getBaseBlueprintId(card), 1);
            }
            for (String site : deck.getSites()) {
                deckCards.addItem(bpLibrary.getBaseBlueprintId(site), 1);
            }

            result.append("<br/>");
            result.append("<b>Adventure deck:</b><br/>");
            for (CardCollection.Item item : cardFilter.process("cardType:SITE sort:siteNumber,twilight", deckCards.getAll(), bpLibrary, formatLibrary)) {
                result.append(GameUtils.getFullName(bpLibrary.getLotroCardBlueprint(item.getBlueprintId())))
                    .append("<br/>");
            }

            result.append("<br/>");
            result.append("<b>Free Peoples Draw Deck:</b><br/>");
            for (CardCollection.Item item : cardFilter.process("side:FREE_PEOPLE sort:cardType,culture,name", deckCards.getAll(), bpLibrary, formatLibrary)) {
                result.append(item.getCount()).append("x ")
                    .append(GameUtils.getFullName(bpLibrary.getLotroCardBlueprint(item.getBlueprintId())))
                    .append("<br/>");
            }

            result.append("<br/>");
            result.append("<b>Shadow Draw Deck:</b><br/>");
            for (CardCollection.Item item : cardFilter.process("side:SHADOW sort:cardType,culture,name", deckCards.getAll(), bpLibrary, formatLibrary)) {
                result.append(item.getCount()).append("x ")
                    .append(GameUtils.getFullName(bpLibrary.getLotroCardBlueprint(item.getBlueprintId())))
                    .append("<br/>");
            }

            result.append("<br/><br/><hr>");
        }

        result.append("</body></html>");

        return result.toString();
    }
}
