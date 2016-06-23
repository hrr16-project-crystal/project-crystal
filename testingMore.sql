/*
    Inserts a new user record.
*/
-- INSERT INTO ${schema~}.Users(first_name, last_name, email, password)
-- VALUES(${first_name}, ${last_name}, ${email}, ${password})
-- -- RETURNING id   // CHANGED
-- RETURNING *

SELECT * FROM Users; 

-- WITH new_user AS (
--   INSERT INTO ${schema~}.Users(first_name, last_name, email, password)
--   VALUES(${first_name}, ${last_name}, ${email}, ${password})
--   -- RETURNING id   // CHANGED
--   RETURNING *
-- )
-- INSERT INTO log_table
-- SELECT * FROM new_user
--  new_couple AS (
--   INSERT INTO ${schema~}.Couples
--   VALUES (DEFAULT)
--   RETURNING *
-- )
-- INSERT INTO ${schema~}.couples_users(couple_id, user_id)
-- SELECT * FROM new_user
-- FROM (new_user, new_couple)
-- INSERT INTO ${schema~}.couples_users(couple_id, user_id)
-- RETURNING *   
-- INNER JOIN new_couple
-- INNER JOIN new_user 
-- RETURNING *    Required?? 
