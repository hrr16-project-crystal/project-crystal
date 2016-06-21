/*
    Inserts a new user record.
*/
INSERT INTO ${schema~}.Users(first_name, last_name, email, password)
VALUES(${first_name}, ${last_name}, ${email}, ${password})
-- RETURNING id   // CHANGED
RETURNING *
