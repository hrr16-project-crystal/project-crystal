SELECT * FROM Couples
INNER JOIN Users
ON Couples.couple_id = Users.couple_id
WHERE Couples.couple_id = $1
