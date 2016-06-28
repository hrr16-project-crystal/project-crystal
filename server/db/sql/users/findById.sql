/*
    Selects a particular user record with associated couple information by user id.
*/

SELECT * FROM Users
INNER JOIN Couples
ON Couples.couple_id = Users.couple_id
WHERE Users.user_id = $1

-- SELECT * from Users
-- INNER JOIN Couples
-- ON Users.couple_id 
-- INNER JOIN couples_users
-- ON couples_users.user_id = Users.user_id
-- INNER JOIN Couples
-- ON Couples.couple_id = couples_users.couple_id
-- WHERE Users.user_id = $1

-- SELECT Users.*, Couples.*
-- FROM Users
-- INNER JOIN couples_users
-- ON couples_users.user_id = Users.user_id
-- INNER JOIN Couples
-- ON Couples.couple_id = couples_users.couple_id
-- WHERE Users.user_id = $1