/*
    Inserts a new user record into Users, Couples and couples_users tables.
*/

WITH new_couple AS (
  INSERT INTO Couples
  VALUES (DEFAULT)
  RETURNING *
),
new_user AS (
  INSERT INTO Users (first_name, last_name, email, password, couple_id)
  VALUES (LOWER(${first_name}), LOWER(${last_name}), LOWER(${email}), ${password}, (SELECT couple_id FROM new_couple))
  RETURNING user_id, first_name, last_name, email, password
)
SELECT * FROM new_user, new_couple

-- WITH new_couple AS (
--   INSERT INTO Couples
--   VALUES (DEFAULT)
--   RETURNING *
-- ),
-- new_user AS (
--   INSERT INTO Users (first_name, last_name, email, password, couple_id)
--   VALUES (INITCAP(${first_name}), INITCAP(${last_name}), LOWER(${email}), ${password}, new_couple.couple_id)
--   RETURNING *
-- )
-- SELECT * FROM new_user, new_couple

-- select only one instance of couple couple_id
-- also ,refactor so that rename add to addFirstUser, explcit