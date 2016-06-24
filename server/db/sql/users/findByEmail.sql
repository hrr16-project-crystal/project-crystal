/*
    Selects a particular user record by email.
    // MAYBE ADD INNER JOIN ??? 
*/

SELECT * FROM ${schema~}.Users 
WHERE email = $1
-- // Optimisation which may obscure failed UNIQUE constraints: 
-- LIMIT 1