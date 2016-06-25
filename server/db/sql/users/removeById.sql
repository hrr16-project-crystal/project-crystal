/*
    Remove User record by id
    Return User record with corresponding Couple record
*/


WITH deleted_user AS (
  DELETE FROM Users
  WHERE Users.user_id = $1
  RETURNING *
)
SELECT * FROM deleted_user
INNER JOIN Couples
ON Couples.couple_id = deleted_user.couple_id;

-- Below is archived removeById method for working with previous Schema design. 
-- -- WITH matching_couple_user AS (
-- --   SELECT * FROM couples_users
-- --   WHERE couples_users.user_id = $1
-- -- ),
-- -- matching_couple AS (
-- --   SELECT * FROM Couples
-- --   INNER JOIN matching_couple_user AS MCU
-- --   ON MCU.couple_id = Couples.couple_id
-- -- ),
-- -- deleted_user AS (
-- --   DELETE FROM Users
-- --   WHERE user_id = $1
-- --   RETURNING *
-- -- )
-- -- SELECT * FROM deleted_user, matching_couple
