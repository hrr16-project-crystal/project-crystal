/*
    Return all existing User records
*/

SELECT * FROM Users
INNER JOIN Couples
ON Couples.couple_id = Users.couple_id

