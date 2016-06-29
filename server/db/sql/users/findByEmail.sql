/*
    Find User record by email
    RF: Potential optimization LIMIT 1 to prevent additional search, but may obscure UNIQUE CONSTRAINT failure
*/

SELECT * FROM Users
WHERE Users.email = $1
