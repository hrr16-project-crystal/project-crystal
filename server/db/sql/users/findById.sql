/*
    Selects a particular user record with associated couple information by user id.
*/

SELECT * FROM Users
INNER JOIN Couples
ON Couples.couple_id = Users.couple_id
WHERE Users.user_id = $1
