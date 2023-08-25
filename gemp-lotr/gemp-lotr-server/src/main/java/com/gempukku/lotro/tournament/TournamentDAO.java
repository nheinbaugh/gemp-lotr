package com.gempukku.lotro.tournament;

import com.gempukku.lotro.common.DBDefs;
import com.gempukku.lotro.db.vo.CollectionType;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

public interface TournamentDAO {
    public void addTournament(DBDefs.Tournament info);

    public List<DBDefs.Tournament> getUnfinishedTournaments();

    public List<DBDefs.Tournament> getFinishedTournamentsSince(ZonedDateTime time);

    public DBDefs.Tournament getTournamentById(String tournamentId);

    public void updateTournamentStage(String tournamentId, Tournament.Stage stage);

    public void updateTournamentRound(String tournamentId, int round);

    public List<DBDefs.ScheduledTournament> getUnstartedScheduledTournamentQueues(ZonedDateTime tillDate);

    public void updateScheduledTournamentStarted(String scheduledTournamentId);
}
