/*
    Updates a couple's relationship score
*/

UPDATE $(schema~).Couples
SET score= (score + $2) / 2
WHERE couple_id=$1
RETURNING *

