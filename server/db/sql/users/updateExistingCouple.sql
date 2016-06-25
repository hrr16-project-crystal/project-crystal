/*
  Update existing Couple have_both_users_joined column if possible. 
  If update successful, return Couple record that was target of update
*/

WITH other_user AS (
  SELECT * FROM Users
  WHERE Users.email=$1
)
UPDATE Couples SET have_both_users_joined = TRUE
FROM other_user
WHERE Couples.couple_id = other_user.couple_id AND 
Couples.have_both_users_joined = FALSE
RETURNING Couples.*