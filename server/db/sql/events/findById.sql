/*
    Selects a particular event record by event id.
*/

SELECT * FROM ${schema~}.Events 
WHERE couple_id = $1
