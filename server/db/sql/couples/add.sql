/*
    Inserts a new couple record.
*/
INSERT INTO ${schema~}.Couples(score)
VALUES ($1)
RETURNING *
