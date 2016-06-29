/*
    Check if both_users_have_joined flag is true in the corresponding Couple record using user id
    Returns entire Couple record if true
*/

SELECT * FROM Couples
WHERE Couples.couple_id = (SELECT couple_id FROM Users WHERE Users.user_id = $1) AND Couples.have_both_users_joined = TRUE
