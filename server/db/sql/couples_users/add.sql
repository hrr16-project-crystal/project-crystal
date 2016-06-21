/*
    Inserts a new couple-user combination.
*/
INSERT INTO ${schema~}.couples_users(couple_id, user_id)
VALUES($1, $2)
RETURNING *
