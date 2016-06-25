/*
    Update have_both_users_joined flag column in a Couple record to false, by couple ID
    Returns updated Couple record
*/

UPDATE Couples
SET have_both_users_joined = FALSE
WHERE Couples.couple_id = $1
RETURNING *