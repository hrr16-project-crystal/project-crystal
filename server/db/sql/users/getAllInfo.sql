/*
  Returns all User related information, from a user_id 
*/

SELECT Users.*, Couples.*
FROM Users
INNER JOIN couples_users
ON couples_users.user_id = Users.user_id
INNER JOIN Couples
ON Couples.couple_id = couples_users.couple_id
WHERE Users.user_id = $1

