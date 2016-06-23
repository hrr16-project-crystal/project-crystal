/*
    Inserts a new user record into Users, Couples and couples_users tables.
*/

WITH new_user AS (
  INSERT INTO Users(first_name, last_name, email, password)
  VALUES(${first_name}, ${last_name}, ${email}, ${password})
  RETURNING *
),
new_couple AS (
  INSERT INTO Couples
  VALUES (DEFAULT)
  RETURNING *
)
INSERT INTO couples_users (couple_id, user_id)
SELECT new_couple.couple_id, new_user.user_id FROM new_couple, new_user
RETURNING * 