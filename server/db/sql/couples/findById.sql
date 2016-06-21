/*
    Selects a particular couple record by couple id.
*/

SELECT * FROM ${schema~}.Couples as Couples
INNER JOIN ${schema~}.couples_users as couples_users
ON Couples.couple_id = couples_users.couple_id
AND Couples.couple_id = $1 
INNER JOIN ${schema~}.Users as Users
ON Users.user_id = couples_users.user_id;

-- SELF-NOTES: 
-- WHERE ${schema~}.Couples.couple_id = $1
-- INNER JOIN ${schema~}.Users
-- ON ${schema~}.couples_users.user_id = ${schema~}.Users.user_id

-- // Optimisation which may obscure failed UNIQUE constraints: 
-- LIMIT 1
-- WHERE (condition)