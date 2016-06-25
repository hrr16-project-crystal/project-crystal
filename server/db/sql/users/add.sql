/*
    Creates a new Couples record and new related Users record with injected couple_id foreign key
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