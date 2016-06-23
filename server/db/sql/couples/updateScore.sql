/*
    Updates a couple's relationship score
*/

UPDATE $(schema~).Couples
SET score = (score + $2),
respect_score = (respect_score + $3) / 2,
communication_score = (communication_score + $4) / 2,
intimacy_score = (intimacy_score + $5) / 2 ,
generosity_score = (generosity_score + $6) / 2 ,
spontaneity_score = (spontaneity_score + $7) / 2
WHERE couple_id=$1
RETURNING *

-- SET score= (score + $2) / 2
-- score = CASE WHEN score === 0 THEN (score + $2) ELSE (score + $2) / 2 END,
