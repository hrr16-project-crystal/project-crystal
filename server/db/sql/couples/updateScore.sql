/*
    Updates a couple's relationship score
*/

UPDATE $(schema~).Couples
SET "score"=${score} 
WHERE "couple_id"=${couple_id}
RETURNING *

