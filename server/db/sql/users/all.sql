/*
    Selects all existing user records.
*/

SELECT * FROM Users
INNER JOIN couples_users ON
Users.user_id = couples_users.user_id
INNER JOIN Couples ON
Couples.couple_id = couples_users.couple_id
