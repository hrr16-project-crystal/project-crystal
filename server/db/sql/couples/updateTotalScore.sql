UPDATE $(schema~).Couples
SET 
score = (score + $1)
WHERE couple_id=$2
RETURNING *
