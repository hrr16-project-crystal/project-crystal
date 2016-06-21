/*
    Selects a particular couple record by couple id.
*/

SELECT * FROM ${schema~}.Couples 
WHERE couple_id = $1
-- // Optimisation which may obscure failed UNIQUE constraints: 
-- LIMIT 1