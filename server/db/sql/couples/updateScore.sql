/*
    Updates a couple's relationship score
*/

UPDATE $(schema~).Couples
SET 
score = CASE WHEN score=0 THEN (score + $2) ELSE ((score + $2) / 2) END,
respect_score = CASE WHEN respect_score=0 THEN (respect_score + $3) ELSE ((respect_score + $3) / 2) END,
communication_score = CASE WHEN communication_score=0 THEN (communication_score + $4) ELSE ((communication_score + $4) / 2) END,
intimacy_score = CASE WHEN intimacy_score=0 THEN (intimacy_score + $5) ELSE ((intimacy_score + $5) / 2) END,
generosity_score = CASE WHEN generosity_score=0 THEN (generosity_score + $6) ELSE ((generosity_score + $6) / 2) END,
spontaneity_score = CASE WHEN spontaneity_score=0 THEN (spontaneity_score + $7) ELSE ((spontaneity_score + $7) / 2) END
WHERE couple_id=$1
RETURNING *


