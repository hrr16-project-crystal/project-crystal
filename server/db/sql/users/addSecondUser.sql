/*
    Inserts and returns a new user record into Users table and 
    links to existing, corresponding Couples Table
*/

WITH new_user AS (
  INSERT INTO Users (first_name, last_name, email, password)
  VALUES(${first_name}, ${last_name}, ${email}, ${password})
  RETURNING *
),
matching_user AS (
  SELECT * FROM Users
  WHERE email = ${otherUserEmail}
),
matching_couple AS (
  SELECT * FROM couples_users, matching_user
  WHERE couples_users.user_id = matching_user.user_id
)
INSERT INTO couples_users (couple_id, user_id)
SELECT matching_couple.couple_id, new_user.user_id FROM matching_couple, new_user
RETURNING *