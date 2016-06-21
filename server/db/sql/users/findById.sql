/*
    Selects a particular user record by user id.
*/

SELECT * FROM ${schema~}.Users 
WHERE user_id = $1
-- // Optimisation which may obscure failed UNIQUE constraints: 
-- LIMIT 1