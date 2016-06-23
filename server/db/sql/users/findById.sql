/*
    Selects a particular user record with associated couple information by user id.
*/

SELECT Users.*, Couples.*
FROM Users
INNER JOIN couples_users
ON couples_users.user_id = Users.user_id
INNER JOIN Couples
ON Couples.couple_id = couples_users.couple_id
WHERE Users.user_id = $1

-- SELECT * FROM ${schema~}.Users 
-- WHERE user_id = $1
-- // Optimisation which may obscure failed UNIQUE constraints: 
-- LIMIT 1