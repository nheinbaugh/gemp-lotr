

SELECT *
FROM scheduled_tournament st 

UPDATE scheduled_tournament 
SET start_date = '2023-08-28 05:29:00', started = false
WHERE id = 9

INSERT INTO gemp_db.scheduled_tournament
(tournament_id, name, format, start_date, cost, playoff, tiebreaker, prizes, minimum_players, manual_kickoff, started)
VALUES('test-tourney-4', 'Test4', 'pc_movie', '2023-08-26 05:29:00', 0, 'swiss', 'owr', 'daily', 2, true, false);


SELECT *
FROM player p 
WHERE name = 'Pokec'

SELECT *
FROM deck d 
where player_id = 29802
AND name = 'Rohan/Uruk Towers standard'



SELECT *
FROM tournament t 
ORDER BY id DESC

SELECT 
	*
FROM tournament t
WHERE name IS NULL

UPDATE tournament 
SET stage = 'Preparing'
WHERE id = 1386


UPDATE tournament 
SET collection = 'default'
WHERE id IN (1411, 1412, 1413, 1414, 1415)


SELECT *
FROM tournament_player tp 
ORDER BY ID DESC

UPDATE tournament_player 
SET dropped = 1
WHERE id = 10387


INSERT INTO gemp_db.tournament_player
(tournament_id, player, deck_name, deck, dropped)
VALUES('2023-wc-towers-standard-format-championship', 'Pokec', 'Rohan/Uruk Towers standard', '4_302|4_1|4_325,4_336,4_339,4_344,4_347,4_353,4_357,6_119,4_361|1_50,1_89,4_265,6_95,4_267,4_270,2_114,4_281,4_285,1_127,1_127,1_127,4_160,4_160,4_160,4_173,4_173,3_69,3_69,4_176,4_176,4_176,4_181,4_181,4_181,4_181,4_188,4_193,4_193,4_193,1_231,4_263,4_268,4_274,4_287,4_288,4_288,5_88,5_116,4_142,4_142,4_196,4_196,4_196,4_174,4_174,3_67,4_282,4_282,4_289,4_289,4_289,4_289,1_136,5_80,5_80,5_80,4_276,4_276,5_94,5_94,5_94,6_97,4_213', '0');



SELECT *
FROM tournament_match tm 
ORDER BY id DESC


SELECT *
FROM game_history gh 
ORDER BY id DESC



SELECT *
FROM transfer t 
ORDER BY id DESC




