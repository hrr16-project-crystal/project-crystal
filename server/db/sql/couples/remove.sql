/*
    Remove couples record from Couples.
*/

DELETE from ${schema~}.Couples 
WHERE couple_id = $1
RETURNING *