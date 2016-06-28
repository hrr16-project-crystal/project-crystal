/*
    Selects a particular event record by event id.
*/

SELECT * FROM ${schema~}.Events 
WHERE event_id = $1
