/*
    Inserts and returns a new user record into Users table and 
    links to existing, corresponding Couples Table

    Previously working iteration, which returns only the new user_id and the 
    corresponding couple_id  
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

    Latest working iteration v2.0 (on old schema version)

WITH new_user AS (
  INSERT INTO Users (first_name, last_name, email, password)
  VALUES(INITCAP(${first_name}), INITCAP(${last_name}), LOWER(${email}), ${password})
  RETURNING *
),
matching_user AS (
  SELECT * FROM Users
  WHERE email = ${otherUserEmail}
),
matching_couple AS (
  SELECT * FROM couples_users, matching_user
  WHERE couples_users.user_id = matching_user.user_id
),
additional_couple_entry AS (
  INSERT INTO couples_users (couple_id, user_id)
  SELECT matching_couple.couple_id, new_user.user_id FROM matching_couple, new_user
  RETURNING *
),
partial_user_info AS (
  SELECT additional_couple_entry.couple_id, new_user.* 
  FROM additional_couple_entry, new_user
)
SELECT * FROM partial_user_info
INNER JOIN Couples 
ON Couples.couple_id = partial_user_info.couple_id

other_user_email
*/
WITH new_user AS (
  INSERT INTO Users (first_name, last_name, email, password, couple_id) 
  VALUES (LOWER(${first_name}), LOWER(${last_name}), LOWER(${email}), ${password}, ${couple_id})
  RETURNING user_id, first_name, last_name, email, password, couple_id 
)
SELECT * from new_user
INNER JOIN Couples
ON Couples.couple_id = new_user.couple_id; 
-- // add inner join to couples on couple_id

-- WITH other_user AS (
--   SELECT * FROM Users
--   WHERE Users.email = ${other_user_email}
-- ),
-- existing_couple AS (
--   UPDATE Couples SET Couples.have_both_users_joined = TRUE
--   WHERE Couples.couple_id = other_user.couple_id AND 
--   Couples.have_both_users_joined = FALSE
--   RETURNING * 
-- )
-- INSERT INTO Users (first_name, last_name, email, password, couple_id)
-- VALUES (LOWER(${first_name}), LOWER(${last_name}), LOWER(${email}), ${password}, (SELECT couple_id FROM existing_couple))
-- WHERE existing_couple.couple_id > 0
-- RETURNING *

-- // if existing_couple is empty 
--   // change flag on Couples to TRUE (update)
--   // create new user, linking to that existing couple couple_id
--   //return new user/couple join 


-- WITH new_user AS (
--   INSERT INTO Users (first_name, last_name, email, password)
--   VALUES(INITCAP(${first_name}), INITCAP(${last_name}), LOWER(${email}), ${password})
--   RETURNING *
-- ),
-- matching_user AS (
--   SELECT * FROM Users
--   WHERE email = ${otherUserEmail}
-- ),
-- matching_couple AS (
--   SELECT * FROM couples_users, matching_user
--   WHERE couples_users.user_id = matching_user.user_id
-- ),
-- additional_couple_entry AS (
--   INSERT INTO couples_users (couple_id, user_id)
--   SELECT matching_couple.couple_id, new_user.user_id FROM matching_couple, new_user
--   RETURNING *
-- ),
-- partial_user_info AS (
--   SELECT additional_couple_entry.couple_id, new_user.* 
--   FROM additional_couple_entry, new_user
-- )
-- SELECT * FROM partial_user_info
-- INNER JOIN Couples 
-- ON Couples.couple_id = partial_user_info.couple_id